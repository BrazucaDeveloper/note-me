import { Contrast } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export function ToggleTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

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
        Change to {theme} theme
      </TooltipContent>
    </Tooltip>
  )
}
