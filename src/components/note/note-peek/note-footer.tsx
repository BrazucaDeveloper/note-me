import { Badge } from '@/components/ui/badge'
import { For } from '@/components/utils'
import { useLiveQueryTag } from '@/hooks/use-live-query/tag'
import Hash from 'lucide-react/dist/esm/icons/hash'

const RECENT_TIME_DIFF = import.meta.env.VITE_RECENT_TIME_UPDATE_AT

interface NotePeekFooterProps {
	noteCreatedAt: number
}

export function NotePeekFooter({ noteCreatedAt }: NotePeekFooterProps) {
	const { tagsByNote } = useLiveQueryTag()

	const createdAt = new Date(noteCreatedAt)
	const isRecent = Date.now() - createdAt.getTime() < RECENT_TIME_DIFF

	return (
		<footer className='flex items-center justify-between w-full mt-1'>
			<div className='flex gap-2'>
				{isRecent && <Badge>New note</Badge>}
				<For each={tagsByNote}>
					{tagByNote => (
						<Badge variant={'secondary'}>
							<Hash className='-mr-1.5' />
							{tagByNote?.title}
						</Badge>
					)}
				</For>
			</div>
			<span className='text-xs opacity-80'>{createdAt.toLocaleString()}</span>
		</footer>
	)
}
