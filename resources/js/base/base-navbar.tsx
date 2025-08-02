import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppearance } from '@/hooks/use-appearance';
import { Link } from '@inertiajs/react';
import { LogOut, Moon, Settings, Sun, User } from 'lucide-react';

const BaseNavebar = () => {
    const { updateAppearance } = useAppearance();
    return (
        <nav className="sticky z-10 bg-background/95 supports-[backdrop-filter]:bg-background/60  backdrop-blur top-0 flex shrink-0 border-b items-center justify-between px-4 h-16">
            {/* Left  */}
            <SidebarTrigger className="mr-4"/>
            {/* Right */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="">
                    Dashboard
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateAppearance('light')}>Light</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAppearance('dark')}>Dark</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAppearance('system')}>System</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-[1.2rem] w-[1.2rem]" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-[1.2rem] w-[1.2rem]" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                            <LogOut className="mr-2 h-[1.2rem] w-[1.2rem]" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default BaseNavebar;
