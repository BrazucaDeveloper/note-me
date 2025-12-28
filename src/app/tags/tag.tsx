// import { useTag } from '@/hooks/use-tag'
import { X } from 'lucide-react'
import Hash from 'lucide-react/dist/esm/icons/hash'
import type { Tag } from '@/data/interfaces'
import { useRef, useState } from 'react'
import { UpdateTag } from './update-tag'
import { Badge } from '@/components/ui/badge'
import { Show } from '@/components/utils'

interface TagProps {
	tag?: Tag
	selected: boolean
	onChangeSelect?: (cid: string) => void
}

export function Tag({ tag, selected, onChangeSelect }: TagProps) {
	const lastClickTimestampRef = useRef<number>(0)
	const [isEditable, setIsEditable] = useState<boolean>(false)

	const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const isDoubleClick = e.timeStamp - lastClickTimestampRef.current < 700
		lastClickTimestampRef.current = e.timeStamp

		if (tag && isDoubleClick && !isEditable) {
			setIsEditable(true)
			onChangeSelect?.(tag.cid.toString())
			return
		} // else, is single click
		onChangeSelect?.(tag?.cid.toString() ?? '0')
		setIsEditable(false)
	}

	return (
		<Badge
			onClick={handleOnClick}
			className='gap-1 px-2 py-1.5'
			variant={selected ? 'secondary' : 'outline'}
		>
			<Hash className='-mr-2' />
			<Show condition={tag?.cid !== undefined} fallback={<span>none</span>}>
				<UpdateTag tag={tag!} isEditable={isEditable} />
				<button aria-label='remove tag' type='button'>
					<X
						className='size-3 hover:text-destructive'
						onClick={e => {
							e.stopPropagation()
							// toggle status to trashed
						}}
					/>
				</button>
			</Show>
		</Badge>
	)
}
