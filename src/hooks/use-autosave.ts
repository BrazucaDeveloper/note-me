import { useDebounce } from '@/hooks/use-debounce'
import { useNote } from '@/hooks/use-note'
import { useSyncCloud } from '@/hooks/use-sync-cloud'
import { useAuth } from '@clerk/clerk-react'
import { getNoteContext } from '@context/note-context'
import type { EditorEvents } from '@tiptap/react'

export function useAutoSave() {
	const { isSignedIn } = useAuth()
	const { updateNote } = useNote()
	const { upload } = useSyncCloud()
	const { selectedNote, startSaving, handleIsSaved } = getNoteContext()

	const localSave = useDebounce(
		async (htmlContent: string) => {
			const id = await updateNote({
				...selectedNote!,
				content: htmlContent,
			})
			const hasUpdated = id > 0
			handleIsSaved(hasUpdated, 'local')
		},
		import.meta.env.VITE_NOTE_LOCAL_AUTOSAVE_DELAY
	)

	const remoteSave = useDebounce(
		(htmlContent: string) => {
			startSaving(async () => {
				await upload.note({ ...selectedNote!, content: htmlContent })
				handleIsSaved(true, 'remote')
			})
		},
		import.meta.env.VITE_NOTE_CLOUD_AUTOSAVE_DELAY
	)

	return ({ editor }: EditorEvents['update']) => {
		try {
			if (!selectedNote) return
			localSave(editor.getHTML())
			if (isSignedIn) remoteSave(editor.getHTML())
		} catch (error) {
			console.error('Error during autosave:', error)
		}
	}
}
