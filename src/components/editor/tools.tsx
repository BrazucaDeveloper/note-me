import { getNoteContext } from '@/global/note-context.tsx'
import { useNote } from '@/hooks/use-note'
import { useDownloadNote } from '@/hooks/use-download-note'
import { useAuth } from '@clerk/clerk-react'
import CloudOff from 'lucide-react/dist/esm/icons/cloud-off'
import Download from 'lucide-react/dist/esm/icons/download'
import Eye from 'lucide-react/dist/esm/icons/eye'
import PenBox from 'lucide-react/dist/esm/icons/pen-box'
import Save from 'lucide-react/dist/esm/icons/save'
import Cloud from 'lucide-react/dist/esm/icons/cloud'
import { PinIcon } from '../icons/pin'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function Tools() {
	const {
		isSaved,
		selectedNote,
		isEditorEnabled,
		handleToggleIsEditorEnabled,
	} = getNoteContext()

	if (!selectedNote) return <></>

	const { isSignedIn } = useAuth()
	const { toggleIsPinned } = useNote()
	const { downloadNote, hasDownloaded } = useDownloadNote(selectedNote)

	return (
		<div className='ml-auto space-x-2 pr-4'>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size='icon'
						variant='outline'
						onClick={() => toggleIsPinned()}
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
					<Button
						size='icon'
						variant='outline'
						onClick={handleToggleIsEditorEnabled}
					>
						{isEditorEnabled ? <PenBox /> : <Eye />}
					</Button>
				</TooltipTrigger>
				<TooltipContent className='font-semibold text-sm'>
					Edit mode
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size='icon'
						variant='outline'
						onClick={downloadNote}
						data-downloaded={hasDownloaded || 'null'}
						className='data-[downloaded=true]:bg-primary data-[downloaded=true]:dark:bg-primary data-[downloaded=false]:bg-destructive data-[downloaded=false]:dark:bg-destructive data-[downloaded=null]:text-primary text-primary-foreground duration-400 transition-all'
					>
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
						variant='secondary'
						aria-label='local save'
						data-save={isSaved.localSaved}
						className='data-[save=true]:bg-primary data-[save=true]:text-primary-foreground data-[save=false]:bg-destructive data-[save=false]:text-primary-foreground transition-colors duration-400 ml-4'
					>
						<Save />
					</Button>
				</TooltipTrigger>
				<TooltipContent className='font-semibold text-sm'>
					Notice when your note has saved locally
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size='icon'
						variant='secondary'
						data-issignedin={isSignedIn}
						className='data-[issignedin=false]:opacity-65'
					>
						{isSignedIn ? <Cloud /> : <CloudOff />}
					</Button>
				</TooltipTrigger>
				<TooltipContent className='font-semibold text-sm'>
					{!isSignedIn && "Can't sync within cloud :/"}
					{isSignedIn && 'Notice when your note has saved remotely'}
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
