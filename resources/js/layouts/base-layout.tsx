import { BaseContent } from "@/base/base-content";
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { type PropsWithChildren } from 'react';

function BaseLayout({ children }: PropsWithChildren) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <BaseContent>{children}</BaseContent>
        </AppShell>
    );
}

export default BaseLayout;
