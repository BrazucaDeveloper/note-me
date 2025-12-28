import { SidebarProvider } from '@/components/ui/sidebar'
import { NoteProvider } from '@/global/note-context'
import { ClerkProvider } from '@clerk/clerk-react'
import { Editor } from './editor'
import { Aside } from './aside'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function App() {
	return (
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			appearance={{ cssLayerName: 'clerk' }}
		>
			<SidebarProvider>
				<NoteProvider>
					<div className='flex h-dvh max-h-screen w-dvw subpixel-antialiased'>
						<Aside />
						<Editor />
					</div>
				</NoteProvider>
			</SidebarProvider>
		</ClerkProvider>
	)
}
