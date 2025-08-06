import { CloudOffIcon, Download, Paperclip, PenBoxIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import Tiptap from './TipTap'
import { getNoteContext } from '../note/note-context'
import { Fallback } from './fallback'

export function Editor() {
  const { selectedNote } = getNoteContext()
  const [title, setTitle] = useState(
    selectedNote?.title ?? 'Give a title to your note :p',
  )

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    setTitle(e.currentTarget.textContent || '')
  }

  return (
    <main className="flex-grow bg-background content-center">
      <Card className="h-full w-full rounded-none">
        {selectedNote === null ? (
          <Fallback />
        ) : (
          <>
            <CardHeader className="flex items-center justify-between">
              <CardTitle
                contentEditable
                onChange={handleTitleChange}
                suppressContentEditableWarning
                className="flex items-center gap-2 text-2xl outline-none"
              >
                {title}
              </CardTitle>

              <div className="space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <PenBoxIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="font-semibold text-sm">
                    Edit mode
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Paperclip />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="font-semibold text-sm">
                    Add a media
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Download />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="font-semibold text-sm">
                    Download it!
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" className="ml-2">
                      <CloudOffIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="font-semibold text-sm">
                    Can't sync within cloud :/
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>

            <CardContent>
              <Tiptap />
            </CardContent>
          </>
        )}
      </Card>
    </main>
  )
}
