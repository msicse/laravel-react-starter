import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';
import BaseNavbar from "@/base/base-navbar";

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function BaseContent({ children, ...props }: AppContentProps) {

    return (
        <SidebarInset {...props}>
            <BaseNavbar/>
            <div className="h-full p-4">{children}</div>
        </SidebarInset>
    );

}
