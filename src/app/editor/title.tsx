import { useDebounce } from '@/hooks/use-debounce'
import { useNote } from '@/hooks/use-note'
import { type ChangeEvent } from 'react'
import { getNoteContext } from '@/global/note-context.tsx'

export function Title() {
	const { selectedNote } = getNoteContext()
	const { updateNote } = useNote()

	const handleTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!selectedNote) return

		await updateNote({
			cid: selectedNote.cid,
			title: e.target.value,
		})
	}

	const handleTitleChangeDebounced = useDebounce(
		handleTitleChange,
		import.meta.env.VITE_NOTE_LOCAL_AUTOSAVE_DELAY
	)

	return (
		<input
			type='text'
			defaultValue={selectedNote?.title}
			onChange={handleTitleChangeDebounced}
			placeholder='Give a title to your note :p'
			className='text-2xl border-none outline-0 flex-1 ml-2 mr-8 w-max min-w-96 font-semibold'
		/>
	)
}
