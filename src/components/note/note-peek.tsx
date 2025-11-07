import Ellipsis from 'lucide-react/dist/esm/icons/ellipsis'
import Pin from 'lucide-react/dist/esm/icons/pin'
import PinOff from 'lucide-react/dist/esm/icons/pin-off'
import Tags from 'lucide-react/dist/esm/icons/tags'
import Trash from 'lucide-react/dist/esm/icons/trash'
import type { Note } from '@/services/db.client'
import { useNote } from '@/hooks/use-note'
import { Badge } from '../ui/badge'
import { SidebarMenuButton } from '../ui/sidebar'
import { getNoteContext } from './note-context'

interface NotePeekProps {
    note: Note
}

export function NotePeek({ note }: NotePeekProps) {
    const { deleteNote, togglePin } = useNote()
    const { selectedNote, handleNoteSelect } = getNoteContext()
    
    const createdAt = new Date(note.createdAt)
    const isRecent = Date.now() - createdAt.getTime() < 1000 * 120
    
    return (
        <SidebarMenuButton
            onClick={() => handleNoteSelect(note)}
            aria-selected={selectedNote?.cid === note.cid}
            className="aria-[selected=true]:bg-card flex flex-col items-start h-fit p-4 border border-border transition-all duration-300 ease-in-out"
        >
            <header className="flex justify-between w-full">
                <div className="space-x-1.5 font-semibold text-lg line-clamp-1">
                    {note.isPined && (
                        <Pin className="size-4.5 inline -rotate-20 fill-foreground" />
                    )}
                    <span>{note.title}</span>
                </div>
            </header>

            <span className="line-clamp-2 my-2">{note.content}</span>

            <footer className="flex items-center justify-between w-full mt-1">
                <div className="flex gap-2">
                    {isRecent && <Badge>New note</Badge>}
                </div>
                <span className="text-xs opacity-80">{createdAt.toLocaleString()}</span>
            </footer>
        </SidebarMenuButton>
    )
}
