import { ContextMenuCheckboxItem } from '@/components/ui/context-menu'
import { For } from '@/components/utils'
import type { Tag } from '@/data/interfaces'
import { useTag } from '@/hooks/use-tag'

interface TagSelectorProps {
	tags: Tag[]
	tagsByNote: (Tag | undefined)[]
}

export function TagSelector({ tags, tagsByNote }: TagSelectorProps) {
	const { toggleNoteTag } = useTag()

	return (
		<For each={tags}>
			{tag => (
				<ContextMenuCheckboxItem
					key={tag?.cid}
					checked={!!tagsByNote?.find(tagByNote => tagByNote?.cid === tag.cid)}
					onClick={() => toggleNoteTag()}
				>
					#{tag?.title}
				</ContextMenuCheckboxItem>
			)}
		</For>
	)
}
