import CloudOff from 'lucide-react/dist/esm/icons/cloud-off'
import Download from 'lucide-react/dist/esm/icons/download'
import Paperclip from 'lucide-react/dist/esm/icons/paperclip'
import PenBox from 'lucide-react/dist/esm/icons/pen-box'
import Pin from 'lucide-react/dist/esm/icons/pin'
import Save from 'lucide-react/dist/esm/icons/save'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function Tools() {
    return (
        <div className='space-x-2'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='outline' size='icon'>
                        <Pin />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='font-semibold text-sm'>
                    Pin your note
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='outline' size='icon'>
                        <PenBox />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='font-semibold text-sm'>
                    Edit mode
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='outline' size='icon'>
                        <Paperclip />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='font-semibold text-sm'>
                    Add a media
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
                    <Button variant='secondary' size='icon' className='ml-4'>
                        <Save />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='font-semibold text-sm'>
                    Can't save on your device :/
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='secondary' size='icon'>
                        <CloudOff />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='font-semibold text-sm'>
                    Can't sync within cloud :/
                </TooltipContent>
            </Tooltip>
        </div>
    )
}
