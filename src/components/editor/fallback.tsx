import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import Cloud from 'lucide-react/dist/esm/icons/cloud'
import Sprout from 'lucide-react/dist/esm/icons/sprout'
import { NewNote } from '../note/new-note'
import { Button } from '../ui/button'

export function Fallback() {
	return (
		<div className='flex flex-col items-center justify-center gap-6 size-full'>
			<div className='opacity-80'>
				<div className='flex flex-col items-center'>
					<Sprout className='size-32 stroke-1' />
					<h1>Note.me</h1>
				</div>
				<p className='opacity-85 text-center'>
					A place to sprout, grow and share your knowledge.
					<br />
					<SignedIn>Continue creating a new note or sign out.</SignedIn>
					<SignedOut>
						Continue creating a new note or sign in to sync with cloud.
					</SignedOut>
				</p>
			</div>

			<div className='flex items-center gap-4'>
				<NewNote withTitle={true} variant='outline' size='lg' />
				<SignedIn>
					<SignOutButton>
						<Button variant='destructive'>
							<LogOut /> Sign out
						</Button>
					</SignOutButton>
				</SignedIn>
				<SignedOut>
					<SignInButton mode='modal'>
						<Button>
							<Cloud /> Sign in/up to sync with cloud
						</Button>
					</SignInButton>
				</SignedOut>
			</div>
		</div>
	)
}
