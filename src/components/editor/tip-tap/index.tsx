import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getNoteContext } from '@/global/note-context'
import { BubbleMenu } from './bubble-menu'
import { Fragment } from 'react/jsx-runtime'
import { useAutoSave } from '@/hooks/use-autosave'

export default function Tiptap() {
	const autosave = useAutoSave()
	const { selectedNote, isEditorEnabled } = getNoteContext()

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
