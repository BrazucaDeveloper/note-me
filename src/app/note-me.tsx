import { useEffect } from 'react'
import { Aside } from './aside'
import { Editor } from './editor'
import { useAuth } from '@clerk/clerk-react'
import { useSyncData } from '@/hooks/use-sync-data'

export default function NoteMe() {
	const sync = useSyncData()
	const { isLoaded, isSignedIn } = useAuth()

	useEffect(() => {
		if (!isLoaded || !isSignedIn) return
		sync()
	}, [isLoaded, isSignedIn])

	return (
		<div className='flex h-dvh max-h-screen w-dvw subpixel-antialiased'>
			<Aside />
			<Editor />
		</div>
	)
}
