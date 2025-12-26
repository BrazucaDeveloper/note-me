import type { Note } from '@/data/db.client'
import { getNoteContext } from '@/global/note-context.tsx'
import { NotePeekFooter } from './note-footer'
import { NotePeekMoreOptions } from './note-more-options'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Show } from '@/components/utils'
import { PinIcon } from '@/components/icons/pin'
import { NoteSpoiler } from './note-spoiler'

interface NotePeekProps {
	note: Note
}

export function NotePeek({ note }: NotePeekProps) {
	const { selectedNote, handleNoteSelect } = getNoteContext()

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<SidebarMenuButton
					onClick={() => handleNoteSelect(note)}
					aria-selected={selectedNote?.cid === note.cid}
					className='aria-[selected=true]:bg-card flex flex-col items-start h-fit p-4 border border-border transition-all duration-300 ease-in-out'
				>
					<header className='flex justify-between w-full'>
						<div className='space-x-1.5 font-semibold text-lg line-clamp-1'>
							<Show condition={note.isPined}>
								<PinIcon className='size-4.5 inline -rotate-20' />
							</Show>
							<span>{note.title}</span>
						</div>
					</header>

					<NoteSpoiler content={note.content} />
					<NotePeekFooter noteCreatedAt={note.createdAt} />
				</SidebarMenuButton>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<NotePeekMoreOptions noteIsPined={note.isPined} />
			</ContextMenuContent>
		</ContextMenu>
	)
}
