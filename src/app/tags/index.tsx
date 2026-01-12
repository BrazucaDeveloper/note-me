import { getNoteContext } from '@/global/note-context.tsx'
import { Tag } from './tag'
import { NewTag } from './new-tag'
import { useLiveQueryTag } from '@/hooks/use-live-query/tag'
import { For } from '@/components/utils'

export function MyTags() {
	const { tags } = useLiveQueryTag()
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
						key={tag.id}
						onChangeSelect={handleTagsSelected}
						selected={selectedTags.has(tag.id)}
					/>
				)}
			</For>
			<NewTag />
		</div>
	)
}
