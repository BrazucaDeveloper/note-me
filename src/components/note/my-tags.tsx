import { useDebounce } from '@/hooks/use-debounce'
import { useTag } from '@/hooks/use-tag'
import { Hash, XIcon } from 'lucide-react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import { useRef } from 'react'
import { getNoteContext } from '../../context/note-context'
import { Button } from '../ui/button'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { For } from '../utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function MyTags() {
	const inputRef = useRef<HTMLInputElement>(null)
	const { handleTagsSelected, selectedTags } = getNoteContext()
	const { tags, createTag, updateTag, removeTag } = useTag()

	const handleTagDoubleClick = () => {
		if (!inputRef.current) return
		inputRef.current.disabled = false
		inputRef.current.focus()
	}

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

	const updateTitle = async () => {
		if (!inputRef.current) return
		const tagId = Number(inputRef.current.dataset.tag)
		await updateTag(tagId, inputRef.current.value)
		inputRef.current.disabled = true
		inputRef.current.blur()
	}

	const updateTitleDebounced = useDebounce(updateTitle, 2000)

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
				onValueChange={handleValueChange}
				value={selectedTags || undefined}
			>
				<ToggleGroupItem value='0' className='rounded-full'>
					#none
				</ToggleGroupItem>

				<ScrollArea className='w-96 whitespace-nowrap'>
					<div className='flex items-center space-x-2 *:rounded-full'>
						<For each={tags}>
							{tag => (
								<ToggleGroupItem
									key={tag.cid}
									value={tag.cid.toString()}
									className='last:mr-25'
								>
									<div onDoubleClick={handleTagDoubleClick}>
										<Hash className='inline' />
										<input
											disabled
											type='text'
											ref={inputRef}
											data-tag={tag.cid}
											aria-label='tag-name'
											defaultValue={tag.title}
											onChange={updateTitleDebounced}
											className='-ml-0.5 italic max-w-20 pointer-events-none outline-none focus:outline-none'
										/>
									</div>

									<Tooltip>
										<TooltipTrigger asChild>
											<button
												onClick={e => {
													removeTag(tag.cid)
													e.stopPropagation()
												}}
												className='hover:*:text-primary'
											>
												<XIcon className='text-destructive transition-colors duration-200' />
											</button>
										</TooltipTrigger>
										<TooltipContent className='font-semibold text-sm'>
											Remove this tag? This action cannot be undone.
										</TooltipContent>
									</Tooltip>
								</ToggleGroupItem>
							)}
						</For>
					</div>

					<ScrollBar orientation='horizontal' hidden />
				</ScrollArea>
			</ToggleGroup>
		</div>
	)
}
