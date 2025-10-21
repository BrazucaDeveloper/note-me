import type { VariantProps } from 'class-variance-authority'
import Plus from 'lucide-react/dist/esm/icons/plus'
import type { ComponentProps } from 'react'
import { useNote } from '@/hooks/use-note'
import { Button, type buttonVariants } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { getNoteContext } from './note-context'

interface NewNoteProps
    extends ComponentProps<'button'>,
        VariantProps<typeof buttonVariants> {
    withTitle?: boolean
}

export function NewNote({
    withTitle = false,
    variant = 'secondary',
    ...props
}: NewNoteProps) {
    const { createNote, findNoteById } = useNote()
    const { handleNoteSelect } = getNoteContext()

    const handleClick = async () => {
        const id = await createNote()
        console.log('New note created with id:', id)
        const noteCreated = await findNoteById(id)

        if (noteCreated) handleNoteSelect(noteCreated)
    }

    if (withTitle)
        return (
            <Button variant={variant} onClick={handleClick} {...props}>
                <Plus /> Create a new note
            </Button>
        )

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    size="icon"
                    variant={variant}
                    onClick={handleClick}
                    {...props}
                >
                    <Plus />
                </Button>
            </TooltipTrigger>
            <TooltipContent className="font-semibold text-sm">
                Create a note
            </TooltipContent>
        </Tooltip>
    )
}
