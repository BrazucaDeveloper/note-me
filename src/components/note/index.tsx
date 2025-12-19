import NotebookText from 'lucide-react/dist/esm/icons/notebook-text'
import Tags from 'lucide-react/dist/esm/icons/tags'
import { useNote } from '@/hooks/use-note'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar'
import { NewNote } from './new-note'
import { NotePeek } from './note-peek'
import { For, Show } from '../utils'
import { MyTags } from '../tags'
import { isEmpty } from '@/lib/utils'

export function MyNotes() {
	const { notes } = useNote()

	return (
		<div className='flex flex-col flex-1 gap-2 min-h-0 mt-4 px-2 pl-4'>
			<h5>
				<Tags className='size-4.5 stroke-[1.5px] inline mr-1.5' /> Your tags
			</h5>
			<MyTags />

			<Separator className='my-3' />

			<div className='flex items-center justify-between mb-1 mx-1'>
				<h4 className='flex items-center gap-2'>
					<NotebookText className='size-5' />
					Your notes
				</h4>
				<NewNote size='sm' />
			</div>
			<Show
				condition={!isEmpty(notes)}
				fallback={
					<div className='flex flex-col items-center justify-center gap-2 h-full opacity-50'>
						<span className='font-semibold text-lg'>
							Nothing to here for now...
						</span>
					</div>
				}
			>
				<ScrollArea className='flex-1 min-h-0'>
					<SidebarMenu className='space-y-2 pr-3'>
						<For each={notes}>
							{note => (
								<SidebarMenuItem key={note.cid}>
									<NotePeek note={note} />
								</SidebarMenuItem>
							)}
						</For>
					</SidebarMenu>
				</ScrollArea>
			</Show>
		</div>
	)
}
