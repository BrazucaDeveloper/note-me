import { EditorContent, useEditor, type EditorEvents } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Bold from 'lucide-react/dist/esm/icons/bold'
import Italic from 'lucide-react/dist/esm/icons/italic'
import Underline from 'lucide-react/dist/esm/icons/underline'
import { getNoteContext } from '@context/note-context'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { useDebounce } from '@/hooks/use-debounce'
import { useNote } from '@/hooks/use-note'
import { useSyncCloud } from '@/hooks/use-sync-cloud'

export default function Tiptap() {
    const { updateNote } = useNote()
    const { upload } = useSyncCloud()
    const { selectedNote } = getNoteContext()

    const localSave = useDebounce(
        async (htmlContent: string) => {
            console.log('Local save triggered')
            await updateNote({ ...selectedNote!, content: htmlContent })
        },
        import.meta.env.VITE_NOTE_LOCAL_AUTOSAVE_DELAY
    )

    const remoteSave = useDebounce(
        async (htmlContent: string) => {
            console.log('Remote save triggered')
            await upload.note({ ...selectedNote!, content: htmlContent })
        },
        import.meta.env.VITE_NOTE_CLOUD_AUTOSAVE_DELAY
    )

    const autosave = ({ editor }: EditorEvents['update']) => {
        try {
            if (!selectedNote) return;
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
        <>
            <EditorContent editor={editor} />

            <FloatingMenu editor={editor} className='bg-background'>
                <ToggleGroup variant='outline' type='single'>
                    <ToggleGroupItem
                        value='list'
                        aria-label='Toggle bold'
                    ></ToggleGroupItem>
                    <ToggleGroupItem
                        value='bullet'
                        aria-label='Toggle italic'
                    ></ToggleGroupItem>
                    <ToggleGroupItem
                        value='code'
                        aria-label='Toggle strikethrough'
                    ></ToggleGroupItem>
                </ToggleGroup>
            </FloatingMenu>

            <BubbleMenu editor={editor} className='bg-background'>
                <ToggleGroup variant='outline' type='multiple'>
                    <ToggleGroupItem value='bold' aria-label='Toggle bold'>
                        <Bold className='h-4 w-4' />
                    </ToggleGroupItem>
                    <ToggleGroupItem value='italic' aria-label='Toggle italic'>
                        <Italic className='h-4 w-4' />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='strikethrough'
                        aria-label='Toggle strikethrough'
                    >
                        <Underline className='h-4 w-4' />
                    </ToggleGroupItem>
                </ToggleGroup>
            </BubbleMenu>
        </>
    )
}
