import X from 'lucide-react/dist/esm/icons/x'
import { lazy } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Show } from '@/components/utils'
import { Fallback } from './fallback'
import { Tools } from './tools'
import { Title } from './title'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip.tsx'
import { getNoteContext } from '@/global/note-context.tsx'

const TipTap = lazy(() => import('./tip-tap/index.tsx'))

export function Editor() {
	const { selectedNote, handleNoteSelect } = getNoteContext()

	return (
		<Card className='flex-grow size-full pl-4 pt-8 rounded-none overflow-hidden'>
			<Show condition={!!selectedNote?.id} fallback={<Fallback />}>
				<ScrollArea className='h-full w-full content-center'>
					<CardHeader className='flex items-center sticky top-0 bg-card pb-4'>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size='sm'
									variant='destructive'
									onClick={() => handleNoteSelect(null)}
								>
									<X />
								</Button>
							</TooltipTrigger>
							<TooltipContent className='font-semibold text-sm'>
								Close current note.
							</TooltipContent>
						</Tooltip>

						<Title />
						<Tools />
					</CardHeader>

					<CardContent className='pl-9 pr-20 pt-2'>
						<TipTap />
						<ScrollBar />
					</CardContent>

					<ScrollBar />
				</ScrollArea>
			</Show>
		</Card>
	)
}
