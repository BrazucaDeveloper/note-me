import { getNoteContext } from '@/context/note-context'
import { useNote } from '@/hooks/use-note'
import CloudOff from 'lucide-react/dist/esm/icons/cloud-off'
import Download from 'lucide-react/dist/esm/icons/download'
import LoaderCircle from 'lucide-react/dist/esm/icons/loader-circle'
import PenBox from 'lucide-react/dist/esm/icons/pen-box'
import Save from 'lucide-react/dist/esm/icons/save'
import Eye from 'lucide-react/dist/esm/icons/eye'
import { PinIcon } from '../icons/pin'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useAuth } from '@clerk/clerk-react'

export function Tools() {
	const { togglePin } = useNote()
	const { isSignedIn } = useAuth()
	const { selectedNote, isSaving, isSaved, handleToggleIsEditorEnabled, isEditorEnabled } = getNoteContext()

	return (
		<div className='ml-auto space-x-2'>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size='icon'
						variant='outline'
						onClick={() => togglePin(selectedNote!.cid)}
					>
						<PinIcon variant={selectedNote?.isPined ? 'filled' : 'outline'} />
					</Button>
				</TooltipTrigger>
				<TooltipContent className='font-semibold text-sm'>
					Pin your note
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant='outline' size='icon' onClick={handleToggleIsEditorEnabled}>
					  {isEditorEnabled ? <PenBox /> : <Eye />}
					</Button>
				</TooltipTrigger>
				<TooltipContent className='font-semibold text-sm'>
					Edit mode
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant='outline' size='icon'>
						<Download />
					</Button>
				</TooltipTrigger>
				<TooltipContent className='font-semibold text-sm'>
					Download it!
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size='icon'
						aria-label='local save'
						data-saving={isSaving}
						variant={isSaved.localSaved ? 'default' : 'secondary'}
						className='data-[saving=true]:animate-pulse duration-500 transition-all ml-4'
					>
						  {isSaving ? <LoaderCircle className='animate-spin' /> : <Save />}
					</Button>
				</TooltipTrigger>
				<TooltipContent className='font-semibold text-sm'>
					Notice when your note has saved locally
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant='secondary' data-isSignedIn={isSignedIn} className='data-[isSignedIn=false]:opacity-65' size='icon'>
						<CloudOff />
					</Button>
				</TooltipTrigger>
				<TooltipContent className='font-semibold text-sm'>
					{!isSignedIn && 'Can\'t sync within cloud :/'}
					{isSignedIn && 'Notice when your note has saved remotely'}
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
