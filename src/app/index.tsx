import { SidebarProvider } from '@/components/ui/sidebar'
import { NoteProvider } from '@/global/note-context'
import { ClerkProvider } from '@clerk/clerk-react'
import NoteMe from './note-me'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function App() {
	return (
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			appearance={{ cssLayerName: 'clerk' }}
		>
			<SidebarProvider>
				<NoteProvider>
					<NoteMe />
				</NoteProvider>
			</SidebarProvider>
		</ClerkProvider>
	)
}
