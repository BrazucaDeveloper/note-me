import type { Note } from '@/db'
import { useNote } from '@/hooks/use-note'
import { Ellipsis, Pin, PinOff, Tag, Tags, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SidebarMenuButton } from '../ui/sidebar'
import { getNoteContext } from './note-context'

interface NotePeekProps {
  note: Note
}

const TWO_MINUTES = 120000

export function NotePeek({ note }: NotePeekProps) {
  const { deleteNote, togglePin } = useNote()
  const { selectedNote, handleNoteSelect } = getNoteContext()

  const createdAt = new Date(Number(note.createdAt))
  const timeDiff = Date.now() - createdAt.getTime()
  const shouldShowBadge = timeDiff <= TWO_MINUTES

  const [isNear, setIsNear] = useState<boolean>(shouldShowBadge)

  useEffect(() => {
    const currentTimeDiff = Date.now() - createdAt.getTime()
    const timeRemaining = TWO_MINUTES - currentTimeDiff

    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setIsNear(false)
      }, timeRemaining)

      return () => clearTimeout(timerId)
    } else {
      // Se a nota já passou de 2 minutos, garante que isNear seja false
      setIsNear(false)
    }
  }, [createdAt.getTime])

  return (
    <SidebarMenuButton
      onClick={() => handleNoteSelect(note)}
      className={`${selectedNote?.id === note.id ? 'bg-card' : ''} flex flex-col items-start h-fit p-4 border border-border transition-all duration-300 ease-in-out`}
    >
      <header className="flex justify-between w-full">
        <div className="space-x-1.5 font-semibold text-lg line-clamp-1">
          {note.isPined && (
            <Pin className="size-4.5 inline -rotate-20 fill-foreground" />
          )}
          <span>{note.title}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="dark:bg-background h-7 w-7 rounded-sm"
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => togglePin(note.id)}>
                {note.isPined ? <PinOff /> : <Pin />}
                {note.isPined ? 'Unpin' : 'Pin'}
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Tags className="size-4.5 mr-1.5 text-foreground/50" /> Tags
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>#tag_0</DropdownMenuItem>
                    <DropdownMenuItem>#tag_1</DropdownMenuItem>
                    <DropdownMenuItem>#tag_2</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem onClick={() => deleteNote(note.id)}>
                <Trash className="text-rose-400" />
                <span className="text-rose-400">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <span className="line-clamp-2 my-2">{note.content}</span>

      <footer className="flex items-center justify-between w-full mt-1">
        <div className="flex gap-2">{isNear && <Badge>New note</Badge>}</div>
        <span className="text-xs opacity-80">{createdAt.toDateString()}</span>
      </footer>
    </SidebarMenuButton>
  )
}
