import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getNoteContext } from '@context/note-context'
import { BubbleMenu } from './bubble-menu'
import { FloatingMenu } from './floating-menu'
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
			<FloatingMenu editor={editor} />
			<BubbleMenu editor={editor} />
		</Fragment>
	)
}
