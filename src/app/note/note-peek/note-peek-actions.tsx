import {
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
} from '@/components/ui/context-menu'
import { For, Show } from '@/components/utils'
import type { Note, Tag } from '@/data/interfaces'
import { isEmpty } from '@/lib/utils'
import Pin from 'lucide-react/dist/esm/icons/pin'
import PinOff from 'lucide-react/dist/esm/icons/pin-off'
import Tags from 'lucide-react/dist/esm/icons/tags'
import Trash from 'lucide-react/dist/esm/icons/trash'

interface NoteActionsProps {
	note: Note
	tags?: Tag[]
	tagsByNote?: (Tag | undefined)[]
	onTogglePin: (id: number) => void
	onToggleTrash: (id: number) => void
}

export function NotePeekActions({
	note,
	tags,
	tagsByNote,
	onTogglePin,
	onToggleTrash,
}: NoteActionsProps) {
	return (
		<ContextMenuContent>
			<ContextMenuItem onClick={() => onTogglePin(note.id)}>
				<Show
					condition={note.isPinned}
					fallback={
						<>
							<Pin /> Pin
						</>
					}
				>
					<PinOff /> Pin off
				</Show>
			</ContextMenuItem>

			<ContextMenuItem>
				<ContextMenuSub>
					<ContextMenuSubTrigger>
						<Tags /> Tags
					</ContextMenuSubTrigger>
					<ContextMenuSubContent>
						<Show
							condition={!isEmpty(tags)}
							fallback={
								<span className='p-2 text-sm opacity-50'>No tags...</span>
							}
						>
							<For each={tags}>
								{tag => (
									<ContextMenuCheckboxItem
										key={tag?.id}
										checked={!!tagsByNote?.find(t => t?.id === tag.id)}
										onClick={() => console.log('Tag toggle:', tag.id)}
									>
										#{tag?.title}
									</ContextMenuCheckboxItem>
								)}
							</For>
						</Show>
					</ContextMenuSubContent>
				</ContextMenuSub>
			</ContextMenuItem>

			<ContextMenuItem
				variant='destructive'
				onClick={() => onToggleTrash(note.id)}
			>
				<Trash /> Trash
			</ContextMenuItem>
		</ContextMenuContent>
	)
}
