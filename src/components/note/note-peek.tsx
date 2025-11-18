import Pin from 'lucide-react/dist/esm/icons/pin'
import PinOff from 'lucide-react/dist/esm/icons/pin-off'
import Tags from 'lucide-react/dist/esm/icons/tags'
import Trash from 'lucide-react/dist/esm/icons/trash'
import type { Note } from '@/services/db.client'
import { useNote } from '@/hooks/use-note'
import { Badge } from '../ui/badge'
import { SidebarMenuButton } from '../ui/sidebar'
import { getNoteContext } from '../../context/note-context'
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '../ui/context-menu'
import { useTag } from '@/hooks/use-tag'
import { Show } from '../utils'

interface NotePeekProps {
    note: Note
}

export function NotePeek({ note }: NotePeekProps) {
    const { deleteNote, togglePin } = useNote()
    const { tags, tagsByNote, toggleTagNote } = useTag()
    const { selectedNote, handleNoteSelect } = getNoteContext()

    const createdAt = new Date(note.createdAt)
    const isRecent = Date.now() - createdAt.getTime() < 1000 * 120

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <SidebarMenuButton
                    onClick={() => handleNoteSelect(note)}
                    aria-selected={selectedNote?.cid === note.cid}
                    className='aria-[selected=true]:bg-card flex flex-col items-start h-fit p-4 border border-border transition-all duration-300 ease-in-out'
                >
                    <header className='flex justify-between w-full'>
                        <div className='space-x-1.5 font-semibold text-lg line-clamp-1'>
                            {note.isPined && (
                                <Pin className='size-4.5 inline -rotate-20 fill-foreground' />
                            )}
                            <span>{note.title}</span>
                        </div>
                    </header>

                    <span className='line-clamp-2 my-2'>{note.content}</span>

                    <footer className='flex items-center justify-between w-full mt-1'>
                        <div className='flex gap-2'>
                            {isRecent && <Badge>New note</Badge>}
                        </div>
                        <span className='text-xs opacity-80'>
                            {createdAt.toLocaleString()}
                        </span>
                    </footer>
                </SidebarMenuButton>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => togglePin(note.cid)}>
                    {note?.isPined ? <PinOff /> : <Pin />}
                    {note?.isPined ? 'Pin off' : 'Pin'}
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <Tags /> Tags
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <Show
                            condition={!!tags && tags.length > 0}
                            fallback={
                                <div className='text-gray-500'>No tags</div>
                            }
                        >
                            {tags?.map(tag => (
                                <ContextMenuCheckboxItem
                                    checked={
                                        tagsByNote?.find(
                                            tagByNote => tagByNote === tag.cid
                                        ) !== undefined
                                    }
                                    onClick={() =>
                                        toggleTagNote(note.cid, tag.cid)
                                    }
                                    key={tag?.cid}
                                >
                                    #{tag?.title}
                                </ContextMenuCheckboxItem>
                            ))}
                        </Show>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuItem
                    variant='destructive'
                    onClick={() => deleteNote(note.cid)}
                >
                    <Trash /> Trash
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
