import type { Note } from '@/data/interfaces'
import { getNoteContext } from '@/global/note-context'
import { useLiveQueryTag } from '@/hooks/use-live-query/tag'
import { useNote } from '@/hooks/use-note'
import { NotePeekActions } from './note-peek-actions'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import { NoteFooter, NoteHeader } from './note-peek-info'
import { NoteSpoiler } from './note-peek-spoiler'
import { SidebarMenuButton } from '@/components/ui/sidebar'

const RECENT_TIME_DIFF = import.meta.env.VITE_RECENT_TIME_UPDATE_AT

export function NotePeek({ note }: { note: Note }) {
	const { selectedNote, handleNoteSelect } = getNoteContext()
	const { toggleIsPinned, toggleIsTrashed } = useNote()
	const { tags, tagsByNote } = useLiveQueryTag()

	const createdAt = new Date(note.createdAt)
	const isRecent = Date.now() - createdAt.getTime() < Number(RECENT_TIME_DIFF)

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<SidebarMenuButton
					onClick={() => handleNoteSelect(note)}
					aria-selected={selectedNote?.id === note.id}
					className='aria-[selected=true]:bg-card flex flex-col items-start h-fit p-4 border border-border transition-all duration-300'
				>
					<NoteHeader title={note.title} isPinned={note.isPinned} />
					<NoteSpoiler content={note.content} />
					<NoteFooter
						isRecent={isRecent}
						tagsByNote={tagsByNote}
						createdAt={createdAt}
					/>
				</SidebarMenuButton>
			</ContextMenuTrigger>

			<NotePeekActions
				note={note}
				tags={tags}
				tagsByNote={tagsByNote}
				onTogglePin={toggleIsPinned}
				onToggleTrash={toggleIsTrashed}
			/>
		</ContextMenu>
	)
}
