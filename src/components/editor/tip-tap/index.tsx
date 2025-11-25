import { EditorContent, useEditor, type EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getNoteContext } from '@context/note-context'
import { useDebounce } from '@/hooks/use-debounce'
import { useNote } from '@/hooks/use-note'
import { useSyncCloud } from '@/hooks/use-sync-cloud'
import { BubbleMenu } from './bubble-menu'
import { FloatingMenu } from './floating-menu'
import { Fragment } from 'react/jsx-runtime'
import { useAuth } from '@clerk/clerk-react'

export default function Tiptap() {
  const { isSignedIn } = useAuth()
	const { updateNote } = useNote()
	const { upload } = useSyncCloud()
	const { selectedNote, startSaving, handleIsSaved, isEditorEnabled } = getNoteContext()

	const localSave = useDebounce(
		async (htmlContent: string) => {
		  const id = await updateNote({ ...selectedNote!, content: htmlContent })
			const hasUpdated = id > 0
			handleIsSaved(hasUpdated, 'local')
		},
		import.meta.env.VITE_NOTE_LOCAL_AUTOSAVE_DELAY
	)

	const remoteSave = useDebounce(
		(htmlContent: string) => {
  		startSaving(async () => {
        await upload.note({ ...selectedNote!, content: htmlContent })
        handleIsSaved(true, 'local')
  		})
		},
		import.meta.env.VITE_NOTE_CLOUD_AUTOSAVE_DELAY
	)

	const autosave = ({ editor }: EditorEvents['update']) => {
		try {
			if (!selectedNote) return
			localSave(editor.getHTML())
			if (isSignedIn) remoteSave(editor.getHTML())
		} catch (error) {
			console.error('Error during autosave:', error)
		}
	}

	const editor = useEditor({
		extensions: [StarterKit],
		content: selectedNote?.content,
		onUpdate: autosave,
		editable: isEditorEnabled,
		editorProps: {
			attributes: { class: 'outline-none' },
		},
	}, [isEditorEnabled])
	
	return (
		<Fragment>
			<EditorContent editor={editor} />
			<FloatingMenu editor={editor} />
			<BubbleMenu editor={editor} />
		</Fragment>
	)
}
