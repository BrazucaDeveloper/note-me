import Sprout from 'lucide-react/dist/esm/icons/sprout'
import Cloud from 'lucide-react/dist/esm/icons/cloud'
import { NewNote } from '../note/new-note'
import { Button } from '../ui/button'

export function Fallback() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 size-full">
            <div className="opacity-80">
                <div className="flex flex-col items-center">
                    <Sprout className="size-32 stroke-1" />
                    <h1>Note.me</h1>
                </div>
                <p className="opacity-85 text-center">
                    A place to sprout, grow and share your knowledge.
                    <br />
                    Continue creating a new note or sign in to sync with cloud.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <NewNote withTitle={true} variant="outline" size="lg" />
                <Button size="lg">
                    <Cloud /> Sign in/up to sync with cloud
                </Button>
            </div>
        </div>
    )
}
