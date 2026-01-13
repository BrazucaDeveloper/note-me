import {
	ContextMenuCheckboxItem,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
} from '@/components/ui/context-menu'
import { For, Show } from '@/components/utils'
import type { Tag } from '@/data/interfaces'
import { isEmpty } from '@/lib/utils'
import Tags from 'lucide-react/dist/esm/icons/tags'

interface TagsSubMenuProps {
	tags?: Tag[]
	tagsByNote?: (Tag | undefined)[]
}

export const TagsSubMenu = ({ tags, tagsByNote }: TagsSubMenuProps) => {
	const handleTagClick = (tagId: string) => console.log('Tag toggle:', tagId)

	return (
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
									onClick={() => handleTagClick(tag.id)}
								>
									#{tag?.title}
								</ContextMenuCheckboxItem>
							)}
						</For>
					</Show>
				</ContextMenuSubContent>
			</ContextMenuSub>
		</ContextMenuItem>
	)
}
