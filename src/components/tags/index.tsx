import { getNoteContext } from '@/global/note-context.tsx'
import { useTag } from '@/hooks/use-tag'
import { For } from '../utils'
import { Tag } from './tag'
import { NewTag } from './new-tag'

export function MyTags() {
	const { tags } = useTag()
	const { handleTagsSelected, selectedTags } = getNoteContext()

	return (
		<div className='flex flex-wrap gap-2 pl-1 pt-2'>
			<Tag
				selected={selectedTags.has('0')}
				onChangeSelect={handleTagsSelected}
			/>
			<For each={tags}>
				{tag => (
					<Tag
						tag={tag}
						key={tag.cid}
						onChangeSelect={handleTagsSelected}
						selected={selectedTags.has(tag.cid.toString())}
					/>
				)}
			</For>
			<NewTag />
		</div>
	)
}
