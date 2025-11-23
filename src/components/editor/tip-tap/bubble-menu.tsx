import { Editor } from '@tiptap/react'
import { BubbleMenu as BubbleMenuTipTap } from '@tiptap/react/menus'
import Bold from 'lucide-react/dist/esm/icons/bold'
import Italic from 'lucide-react/dist/esm/icons/italic'
import Underline from 'lucide-react/dist/esm/icons/underline'
import Strikethrough from 'lucide-react/dist/esm/icons/strikethrough'
import { Button } from '@/components/ui/button'

export function BubbleMenu({ editor }: { editor: Editor }) {
    return (
        <BubbleMenuTipTap
            editor={editor}
            className='bg-border rounded-sm p-0.5 *:rounded-none *:first:rounded-l-md *:last:rounded-r-md'
        >
            <Button
                variant='secondary'
                aria-label='Toggle bold'
                data-active={editor.isActive('bold')}
                className='data-[active=true]:text-foreground text-foreground/50'
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className='h-4 w-4' />
            </Button>
            <Button
                variant='secondary'
                aria-label='Toggle italic'
                data-active={editor.isActive('italic')}
                className='data-[active=true]:text-foreground text-foreground/50'
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className='h-4 w-4' />
            </Button>
            <Button
                variant='secondary'
                aria-label='Toggle strike'
                data-active={editor.isActive('strike')}
                className='data-[active=true]:text-foreground text-foreground/50'
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className='h-4 w-4' />
            </Button>
            <Button
                variant='secondary'
                aria-label='Toggle underline'
                data-active={editor.isActive('underline')}
                className='data-[active=true]:text-foreground text-foreground/50'
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <Underline className='h-4 w-4' />
            </Button>
        </BubbleMenuTipTap>
    )
}
