import type { VariantProps } from 'class-variance-authority'
import Plus from 'lucide-react/dist/esm/icons/plus'
import type { ComponentProps } from 'react'
import { useNote } from '@/hooks/use-note'
import { Button, type buttonVariants } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Show } from '../utils'

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
    const { createNote } = useNote()

    return (
        <Show
            condition={!withTitle}
            fallback={
                <Button variant={variant} onClick={createNote} {...props}>
                    <Plus /> Create a new note
                </Button>
            }
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant={variant}
                        onClick={createNote}
                        {...props}
                    >
                        <Plus />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="font-semibold text-sm">
                    Create a note
                </TooltipContent>
            </Tooltip>
        </Show>
    )
}
