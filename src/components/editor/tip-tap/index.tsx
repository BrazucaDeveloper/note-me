import { EditorContent, useEditor, type EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getNoteContext } from '@context/note-context'
import { useDebounce } from '@/hooks/use-debounce'
import { useNote } from '@/hooks/use-note'
import { useSyncCloud } from '@/hooks/use-sync-cloud'
import { BubbleMenu } from './bubble-menu'
import { FloatingMenu } from './floating-menu'
import { Fragment } from 'react/jsx-runtime'

export default function Tiptap() {
    const { updateNote } = useNote()
    const { upload } = useSyncCloud()
    const { selectedNote } = getNoteContext()

    const localSave = useDebounce(
        async (htmlContent: string) => {
            await updateNote({ ...selectedNote!, content: htmlContent })
        },
        import.meta.env.VITE_NOTE_LOCAL_AUTOSAVE_DELAY
    )

    const remoteSave = useDebounce(
        async (htmlContent: string) => {
            await upload.note({ ...selectedNote!, content: htmlContent })
        },
        import.meta.env.VITE_NOTE_CLOUD_AUTOSAVE_DELAY
    )

    const autosave = ({ editor }: EditorEvents['update']) => {
        try {
            if (!selectedNote) return
            localSave(editor.getHTML())
            remoteSave(editor.getHTML())
        } catch (error) {
            console.error('Error during autosave:', error)
        }
    }

    const editor = useEditor({
        extensions: [StarterKit],
        content: selectedNote?.content,
        onUpdate: autosave,
        editorProps: {
            attributes: { class: 'outline-none' },
        },
    })

    return (
        <Fragment>
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor} />
            <BubbleMenu editor={editor} />
        </Fragment>
    )
}
