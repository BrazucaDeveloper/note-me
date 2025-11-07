import { ClerkProvider } from '@clerk/clerk-react'
import { Aside } from './components/aside'
import { Editor } from './components/editor'
import { NoteProvider } from './components/note/note-context'
import { SidebarProvider } from './components/ui/sidebar'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function App() {
    return (
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            appearance={{ cssLayerName: 'clerk' }}
        >
            <NoteProvider>
                <SidebarProvider>
                    <div className="flex h-dvh w-dvw subpixel-antialiased">
                        <Aside />
                        <Editor />
                    </div>
                </SidebarProvider>
            </NoteProvider>
        </ClerkProvider>
    )
}
