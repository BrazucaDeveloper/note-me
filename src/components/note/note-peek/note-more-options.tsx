import {
	ContextMenuItem,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
} from '@/components/ui/context-menu'
import { Show } from '@/components/utils'
import { useLiveQueryTag } from '@/hooks/use-live-query/tag'
import { useNote } from '@/hooks/use-note'
import { isEmpty } from '@/lib/utils'
import Pin from 'lucide-react/dist/esm/icons/pin'
import PinOff from 'lucide-react/dist/esm/icons/pin-off'
import Tags from 'lucide-react/dist/esm/icons/tags'
import Trash from 'lucide-react/dist/esm/icons/trash'
import { TagSelector } from './tag-selector'

interface NotePeekMoreOptionsProps {
	noteIsPined: boolean
}

export function NotePeekMoreOptions({ noteIsPined }: NotePeekMoreOptionsProps) {
	const { toggleIsPinned, toggleIsTrashed } = useNote()
	const { tags, tagsByNote } = useLiveQueryTag()

	return (
		<>
			<ContextMenuItem onClick={() => toggleIsPinned()}>
				{noteIsPined ? <PinOff /> : <Pin />}
				{noteIsPined ? 'Pin off' : 'Pin'}
			</ContextMenuItem>
			<ContextMenuItem>
				<ContextMenuSubTrigger>
					<Tags /> Tags
				</ContextMenuSubTrigger>
				<ContextMenuSubContent>
					<Show
						condition={isEmpty(tags)}
						fallback={
							<span className='text-gray-500 p-2 text-sm'>
								<Tags className='inline size-4' /> No tags...
							</span>
						}
					>
						<TagSelector tags={tags!} tagsByNote={tagsByNote!} />
					</Show>
				</ContextMenuSubContent>
			</ContextMenuItem>
			<ContextMenuItem variant='destructive' onClick={() => toggleIsTrashed()}>
				<Trash /> Trash
			</ContextMenuItem>
		</>
	)
}
