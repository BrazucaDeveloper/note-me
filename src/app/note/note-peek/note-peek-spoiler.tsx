interface NoteSpoilerProps {
	content: string | null
}

export function NoteSpoiler({ content }: NoteSpoilerProps) {
	const removeHTMLTags = (str: string | null): string => {
		if (str === null) return '...'

		const cleanedString = str.replaceAll(/<\/?[^>]+>/g, ' ').trim()
		return cleanedString.slice(0, 100)
	}
	return <span className='line-clamp-2 my-2'>{removeHTMLTags(content)}</span>
}
