import { EditorContent, type EditorEvents, useEditor } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Bold from 'lucide-react/dist/esm/icons/bold'
import Italic from 'lucide-react/dist/esm/icons/italic'
import Underline from 'lucide-react/dist/esm/icons/underline'
import { useDebounce } from '@/hooks/use-debounce'
import { useNote } from '@/hooks/use-note'
import { getNoteContext } from '../note/note-context'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

export default function Tiptap() {
    const { selectedNote } = getNoteContext()
    const { updateNote } = useNote()

    const saveFunctionDebounced = useDebounce(
        async ({ editor }: EditorEvents['update']) => {
            await updateNote({
                id: selectedNote.id,
                title: selectedNote.title,
                content: editor.getHTML(),
                isPined: selectedNote.isPined,
            })
        },
        import.meta.env.VITE_NOTE_LOCAL_AUTOSAVE_DELAY
    )

    const editor = useEditor({
        extensions: [StarterKit], // define your extension array
        content: selectedNote?.content, // initial content
        onUpdate: saveFunctionDebounced,
        editorProps: {
            attributes: { class: 'outline-none' },
        },
    })

    return (
        <>
            <EditorContent editor={editor} />

            <FloatingMenu
                editor={editor}
                className="bg-background shadow-xl rounded-lg border border-foreground/30"
            >
                <ToggleGroup variant="outline" type="single">
                    <ToggleGroupItem
                        value="list"
                        aria-label="Toggle bold"
                    ></ToggleGroupItem>
                    <ToggleGroupItem
                        value="bullet"
                        aria-label="Toggle italic"
                    ></ToggleGroupItem>
                    <ToggleGroupItem
                        value="code"
                        aria-label="Toggle strikethrough"
                    ></ToggleGroupItem>
                </ToggleGroup>
            </FloatingMenu>

            <BubbleMenu editor={editor} className="bg-background">
                <ToggleGroup variant="outline" type="multiple">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="strikethrough"
                        aria-label="Toggle strikethrough"
                    >
                        <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </BubbleMenu>
        </>
    )
}
