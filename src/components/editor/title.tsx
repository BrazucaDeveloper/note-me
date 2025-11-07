import { useDebounce } from '@/hooks/use-debounce'
import { useNote } from '@/hooks/use-note'
import { type ChangeEvent } from 'react'
import { getNoteContext } from '../note/note-context'

export function Title() {
    const { selectedNote } = getNoteContext()
    const { updateNote } = useNote()

    const handleTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        await updateNote({
            id: selectedNote?.id!,
            title: e.target.value,
        })
    }

    const handleTitleChangeDebounced = useDebounce(
        handleTitleChange,
        import.meta.env.VITE_NOTE_LOCAL_AUTOSAVE_DELAY,
    )

    return (
        <input
            type="text"
            defaultValue={selectedNote?.title}
            onChange={handleTitleChangeDebounced}
            className="text-xl border-none outline-0"
            placeholder="Give a title to your note :p"
        />
    )
}
