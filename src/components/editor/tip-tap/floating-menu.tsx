import { Editor } from '@tiptap/react'
import { FloatingMenu as FloatingMenuTipTap } from '@tiptap/react/menus'

export function FloatingMenu({ editor }: { editor: Editor }) {
	return (
		<FloatingMenuTipTap
			editor={editor}
			shouldShow={({ state }) => {
				const { $from } = state.selection
				const currentLineText = $from.nodeBefore?.textContent
				return currentLineText === '/'
			}}
		>
			Something...
		</FloatingMenuTipTap>
	)
}
