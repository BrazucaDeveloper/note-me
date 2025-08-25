interface ShowProps {
  fallback: React.ReactNode
  children: React.ReactNode
  condition: boolean
}

export function Show({ condition, fallback, children }: ShowProps) {
  return condition ? children : fallback
}