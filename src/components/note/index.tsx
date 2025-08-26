import { useNote } from '@/hooks/use-note'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'
import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar'
import { NotePeek } from './note-peek'
import { NotebookText, Plus, Tag, Tags } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { NewNote } from './new-note'

export function MyNotes() {
  const { notes } = useNote()

  return (
    <div className="flex flex-col flex-1 gap-2 min-h-0 mt-4 px-2 pl-4">
      <h5>
        <Tags className="size-4.5 stroke-[1.5px] inline mr-1.5" />
        Your tags
      </h5>
      <div className="flex gap-2.5 items-center">
        <Button
          size="sm"
          variant="outline"
          className="h-6.25 w-12 px-4 py-1 rounded-full mr-1"
        >
          <Plus />
        </Button>
        <ScrollArea>
          <ul className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-6.25 px-4 rounded-full"
            >
              #None
            </Button>
            {Array.from({ length: 3 }).map((_, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                className="h-6.25 px-4 rounded-full"
              >
                #tag_{index}
              </Button>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <Separator className="my-3" />

      <div className="flex items-center justify-between mb-1 mx-1">
        <h4 className="flex items-center gap-2">
          <NotebookText className="size-5" />
          Your notes
        </h4>
        <NewNote size="sm" />
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <SidebarMenu className="space-y-2 pr-3">
          {notes?.map((note) => (
            <SidebarMenuItem key={note.id}>
              <NotePeek note={note} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </ScrollArea>
    </div>
  )
}
