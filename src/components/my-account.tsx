import { ChevronsUpDown, File, LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function MyAccount() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="border border-border flex items-center justify-between p-3 rounded-md mt-3 bg-card">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarImage className="object-cover" src="" />
              <AvatarFallback className="rounded-lg">
                <User className="stroke-[1.5px]" />
              </AvatarFallback>
            </Avatar>

            <div className="text-left -space-y-2">
              <h5 className="font-semibold">Username</h5>
              <span className="text-sm">email@example.com</span>
            </div>
          </div>
          <ChevronsUpDown className="stroke-[1.5px] size-5" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="right" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <File /> Terms
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
