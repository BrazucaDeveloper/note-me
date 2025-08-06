import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, Underline } from 'lucide-react'
import { useEffect } from 'react'
import { getNoteContext } from '../note/note-context'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

const Tiptap = () => {
  const { selectedNote } = getNoteContext()

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: selectedNote?.content, // initial content
    editable: true,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

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
        This is the floating menu
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

export default Tiptap
