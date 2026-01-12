import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/clerk-react'
import User from 'lucide-react/dist/esm/icons/user'
import { Logo } from '../components/logo'
import { MyNotes } from './note'
import { NoteSearch } from './note/note-search'
import { Button } from '../components/ui/button'
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '../components/ui/sidebar'

export function Aside() {
	return (
		<Sidebar className='p-2 *:bg-background bg-background'>
			<SidebarHeader>
				<div className='flex items-center justify-between p-3 bg-card rounded-md ring ring-foreground/15'>
					<Logo />

					<SignedOut>
						<SignInButton mode='modal'>
							<Button variant='secondary' size='icon'>
								<User />
							</Button>
						</SignInButton>
					</SignedOut>

					<SignedIn>
						<UserButton
							appearance={{
								elements: {
									userButtonBox: 'p-0.5 rounded-full border border-primary',
								},
							}}
						/>
					</SignedIn>
				</div>

				<NoteSearch />
			</SidebarHeader>

			<SidebarContent>
				<MyNotes />
			</SidebarContent>
		</Sidebar>
	)
}
