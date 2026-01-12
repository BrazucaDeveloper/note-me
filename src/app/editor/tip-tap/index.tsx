import { EditorContent, useEditor, type EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getNoteContext } from '@/global/note-context'
import { BubbleMenu } from './bubble-menu'
import { Fragment } from 'react/jsx-runtime'
import { useNote } from '@/hooks/use-note'
import { useEffect } from 'react'

export default function Tiptap() {
	const { updateNote } = useNote()
	const { selectedNote } = getNoteContext()

	const autosave = ({ editor }: EditorEvents['update']) => {
		if (!selectedNote) return
		updateNote({
			id: selectedNote.id,
			content: editor.getHTML(),
		})
	}

	const editor = useEditor({
		extensions: [StarterKit],
		content: selectedNote?.content,
		onUpdate: autosave,
		editable: true,
	})

	useEffect(() => {
		editor.commands.setContent(selectedNote?.content || '')
	}, [selectedNote!.id])

	return (
		<Fragment>
			<EditorContent editor={editor} className='pb-8' />
			<BubbleMenu editor={editor} />
		</Fragment>
	)
}
