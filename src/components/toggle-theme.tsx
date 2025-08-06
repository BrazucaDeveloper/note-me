import { Contrast } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export function ToggleTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleChangeTheme} variant="secondary" size="icon">
          <Contrast />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="font-semibold text-sm">
        Change to {theme === 'light' ? 'dark' : 'light'} theme
      </TooltipContent>
    </Tooltip>
  )
}
