import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
} from '@/components/ui/command'
import { For } from '@/components/utils'
import { Editor } from '@tiptap/react'
import { FloatingMenu as FloatingMenuTipTap } from '@tiptap/react/menus'
import {
	CaseSensitive,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	List,
	ListOrdered,
} from 'lucide-react'

export function FloatingMenu({ editor }: { editor: Editor }) {
	const headings = [Heading1, Heading2, Heading3, Heading4]

	return (
		<FloatingMenuTipTap
			editor={editor}
			shouldShow={({ state }) => {
				const { $from } = state.selection
				const currentLineText = $from.nodeBefore?.textContent
				return currentLineText?.startsWith('/') || false
			}}
		>
			<Command>
				<CommandInput className='h-9' placeholder='Search framework...' />
				<CommandList>
					<CommandEmpty>No command found.</CommandEmpty>
					<CommandGroup>
						<For each={headings}>
							{(Heading, index) => (
								<CommandItem key={index} value={`heading-${index + 1}`}>
									<Heading className='size-5' />
									<span className='font-semibold'>Heading {index + 1}</span>
								</CommandItem>
							)}
						</For>
						<CommandSeparator />
						<CommandItem>
							<CaseSensitive className='size-5' />
							<span>Normal Text</span>
						</CommandItem>
						<CommandSeparator />
						<CommandItem>
							<List className='size-5' />
							<span>Unordered List</span>
						</CommandItem>
						<CommandItem>
							<ListOrdered className='size-5' />
							<span>Ordered List</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</FloatingMenuTipTap>
	)
}
