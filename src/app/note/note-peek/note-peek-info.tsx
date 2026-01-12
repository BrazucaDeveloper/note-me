import { Show, For } from '@/components/utils'
import { Badge } from '@/components/ui/badge'
import { PinIcon } from '@/components/icons/pin'
import Hash from 'lucide-react/dist/esm/icons/hash'
import type { Tag } from '@/data/interfaces'
import { isEmpty } from '@/lib/utils'

export const NoteHeader = ({
	title,
	isPinned,
}: {
	title: string
	isPinned: boolean
}) => (
	<header className='flex justify-between w-full'>
		<div className='space-x-1.5 font-semibold text-lg line-clamp-1'>
			<Show condition={isPinned}>
				<PinIcon className='size-4.5 inline -rotate-20' />
			</Show>
			<span>{title}</span>
		</div>
	</header>
)

export const NoteFooter = ({
	isRecent,
	tagsByNote,
	createdAt,
}: {
	isRecent: boolean
	tagsByNote?: (Tag | undefined)[]
	createdAt: Date
}) => (
	<footer className='flex items-center justify-between w-full mt-1'>
		<div className='flex gap-2'>
			{isRecent && <Badge>New note</Badge>}
			<For each={tagsByNote}>
				{tag => (
					<Show condition={!isEmpty(tag)} fallback={<></>}>
						<Badge variant='secondary' key={tag?.id}>
							<Hash className='-mr-1.5' />
							{tag?.title}
						</Badge>
					</Show>
				)}
			</For>
		</div>
		<span className='text-xs opacity-80'>{createdAt.toLocaleString()}</span>
	</footer>
)
