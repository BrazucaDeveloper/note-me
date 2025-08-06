import { useNote } from '@/hooks/use-note'
import { ScrollArea } from '../ui/scroll-area'
import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar'
import { NotePeek } from './note-peek'

export function MyNotes() {
  const { notes } = useNote()

  return (
    <div className="flex flex-col flex-1 gap-2 min-h-0 mt-3 px-2">
      <h4>You have {notes?.length} notes</h4>
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
