import { useDebounce } from '@/hooks/use-debounce'
import { useTag } from '@/hooks/use-tag'
import { Hash, Pencil, Trash } from 'lucide-react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import { getNoteContext } from '../../context/note-context'
import { Button } from '../ui/button'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { For } from '../utils'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '../ui/context-menu'

export function MyTags() {
	const { handleTagsSelected, selectedTags } = getNoteContext()
	const { tags, createTag, updateTag, removeTag } = useTag()

	const handleValueChange = (value: string[]) => {
		const isNoneFirstAndOnlyTagSelected =
			value.length === 1 && value[0] === 'none'
		const isNoneLastTagSelected =
			value.length > 1 && value[value.length - 1] === 'none'

		if (isNoneFirstAndOnlyTagSelected || isNoneLastTagSelected) {
			handleTagsSelected(['0']) // Zero represents the absence of tags
		} else {
			const indexOfNoneTag = value.indexOf('0')
			if (indexOfNoneTag !== -1) value.splice(indexOfNoneTag, 1)
			handleTagsSelected(value)
		}
	}

	return (
		<div className='flex gap-2.5 items-center overflow-hidden py-1'>
			<Button
				size='sm'
				className='mr-1'
				variant='outline'
				onClick={() => createTag('example')}
			>
				<Plus />
			</Button>

			<ToggleGroup
				size='sm'
				spacing={2}
				type='multiple'
				variant='outline'
				value={selectedTags}
				onValueChange={handleValueChange}
			>
				<ToggleGroupItem value='0' className='rounded-full'>
					<Hash className='size-3.5 -mr-2' />
					none
				</ToggleGroupItem>

				<ScrollArea className='w-96 whitespace-nowrap'>
					<div className='flex items-center space-x-2 *:rounded-full'>
						<For each={tags}>
							{tag => (
								<ToggleGroupItem
									key={tag.cid}
									className='last:mr-25'
									value={tag.cid.toString()}
								>
									<ContextMenu modal>
										<ContextMenuTrigger>
											<Hash className='size-3.5 inline' />
											<span>{tag.title}</span>
										</ContextMenuTrigger>
										<ContextMenuContent hideWhenDetached>
											<ContextMenuItem>
												<Pencil /> Edit
											</ContextMenuItem>
											<ContextMenuItem variant='destructive'>
												<Trash /> Delete
											</ContextMenuItem>
										</ContextMenuContent>
									</ContextMenu>
								</ToggleGroupItem>
							)}
						</For>
					</div>

					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</ToggleGroup>
		</div>
	)
}
