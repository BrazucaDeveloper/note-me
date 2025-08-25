import { useDebounce } from '@/hooks/use-debounce'
import { EditorContent, useEditor, type EditorEvents } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, Underline } from 'lucide-react'
import { getNoteContext } from '../note/note-context'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { useNote } from '@/hooks/use-note'
import { useEffect } from 'react'

const INTERVAL = 1000 // 1 segundo

export default function Tiptap() {
  const { selectedNote } = getNoteContext()
  const { updateNote } = useNote()

  const saveNote = async ({ editor }: EditorEvents['update']) => {
    if (!selectedNote) return

    await updateNote({
      id: selectedNote.id,
      title: selectedNote.title,
      content: editor.getHTML(),
      isPined: selectedNote.isPined,
    })
  }

  const saveFunctionDebounced = useDebounce(saveNote, INTERVAL)

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: selectedNote?.content, // initial content
    onCreate: () => console.log(`Note ${selectedNote?.id} opened`),
    onDestroy: () => console.log(`Note ${selectedNote?.id} closed`),
    onUpdate: saveFunctionDebounced,
    autofocus: true,
    editorProps: {
      attributes: { class: 'outline-none' },
    },
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    if (!selectedNote?.id) return
    editor.commands.setContent(selectedNote?.content ?? '')
  }, [selectedNote?.id])

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
