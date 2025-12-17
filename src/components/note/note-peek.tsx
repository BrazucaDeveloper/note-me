import { useNote } from '@/hooks/use-note'
import { useTag } from '@/hooks/use-tag'
import { isEmpty } from '@/lib/utils'
import type { Note } from '@/services/db.client'
import Hash from 'lucide-react/dist/esm/icons/hash'
import Pin from 'lucide-react/dist/esm/icons/pin'
import PinOff from 'lucide-react/dist/esm/icons/pin-off'
import Tags from 'lucide-react/dist/esm/icons/tags'
import Trash from 'lucide-react/dist/esm/icons/trash'
import { getNoteContext } from '@/global/note-context.tsx'
import { PinIcon } from '../icons/pin'
import { Badge } from '../ui/badge'
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
import { SidebarMenuButton } from '../ui/sidebar'
import { For, Show } from '../utils'
import { NoteSpoiler } from './note-spoiler'

interface NotePeekProps {
	note: Note
}

const RECENT_TIME_DIFF = import.meta.env.VITE_RECENT_TIME_UPDATE_AT

export function NotePeek({ note }: NotePeekProps) {
	const { deleteNote, togglePin } = useNote()
	const { selectedNote, handleNoteSelect } = getNoteContext()
	const { tags, tagsByNote, toggleTagNote } = useTag(note.cid)

	const createdAt = new Date(note.createdAt)
	const isRecent = Date.now() - createdAt.getTime() < RECENT_TIME_DIFF

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
							<Show condition={note.isPined}>
								<PinIcon className='size-4.5 inline -rotate-20' />
							</Show>
							<span>{note.title}</span>
						</div>
					</header>

					<NoteSpoiler content={note.content} />

					<footer className='flex items-center justify-between w-full mt-1'>
						<div className='flex gap-2'>
							{isRecent && <Badge>New note</Badge>}
							<For each={tagsByNote}>
								{tagByNote => (
									<Badge variant={'secondary'}>
										<Hash className='-mr-1.5' />
										{tagByNote?.title}
									</Badge>
								)}
							</For>
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
							condition={isEmpty(tags)}
							fallback={
								<span className='text-gray-500 p-2 text-sm'>
									<Tags className='inline size-4' /> No tags...
								</span>
							}
						>
							<For each={tags}>
								{tag => (
									<ContextMenuCheckboxItem
										key={tag?.cid}
										checked={
											!!tagsByNote?.find(
												tagByNote => tagByNote?.cid === tag.cid
											)
										}
										onClick={() => toggleTagNote(note.cid, tag.cid)}
									>
										#{tag?.title}
									</ContextMenuCheckboxItem>
								)}
							</For>
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
