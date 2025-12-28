import { EditorContent, useEditor, type EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getNoteContext } from '@/global/note-context'
import { BubbleMenu } from './bubble-menu'
import { Fragment } from 'react/jsx-runtime'
import { useNote } from '@/hooks/use-note'

export default function Tiptap() {
	const { updateNote } = useNote()
	const { selectedNote, isEditorEnabled } = getNoteContext()

	const autosave = ({ editor }: EditorEvents['update']) => {
		if (!selectedNote) return
		updateNote({
			cid: selectedNote.cid,
			content: editor.getHTML(),
		})
	}

	const editor = useEditor(
		{
			extensions: [StarterKit],
			content: selectedNote?.content,
			onUpdate: autosave,
			editable: isEditorEnabled,
		},
		[isEditorEnabled]
	)

	return (
		<Fragment>
			<EditorContent editor={editor} className='pb-8' />
			<BubbleMenu editor={editor} />
		</Fragment>
	)
}
