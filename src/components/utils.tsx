interface ShowProps {
	fallback?: React.ReactNode
	children: React.ReactNode
	condition: boolean
}

export function Show({ condition, fallback = <></>, children }: ShowProps) {
	return condition ? children : fallback
}

interface ForProps<T> {
	each: T[] | undefined
	children: (item: T, index: number) => React.ReactNode
}

export function For<T>({ each, children }: ForProps<T>) {
	return <>{each?.map(children)}</>
}
