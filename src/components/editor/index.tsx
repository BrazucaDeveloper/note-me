import X from 'lucide-react/dist/esm/icons/x'
import { lazy } from 'react'
import { getNoteContext } from '@context/note-context'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Show } from '../utils'
import { Fallback } from './fallback'
import { Tools } from './tools'
import { Title } from './title'

const TipTap = lazy(() => import('./tip-tap/index.tsx'))

export function Editor() {
	const { selectedNote, handleNoteSelect } = getNoteContext()

	return (
		<main className='flex-grow bg-background content-center'>
			<Card className='h-full w-full rounded-none'>
				<Show condition={!!selectedNote?.cid} fallback={<Fallback />}>
					<CardHeader className='flex items-center'>
						<Button
							size='sm'
							variant='destructive'
							onClick={() => handleNoteSelect(null)}
						>
							<X />
						</Button>

						<Title />
						<Tools />
					</CardHeader>

					<CardContent>
						<TipTap />
					</CardContent>
				</Show>
			</Card>
		</main>
	)
}
