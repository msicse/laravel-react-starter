import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Link } from '@inertiajs/react';

interface PageLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatorData {
    links: PageLink[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface PaginatorProps {
    data: PaginatorData;
}

const BasePagination = ({ data }: PaginatorProps) => {
    return (
        <div className="mt-8 flex items-center justify-between px-6 py-4 border-t w-full">
            <p className="text-sm text-muted-foreground">
                Showing <strong>{data.from}</strong> to <strong>{data.to}</strong> of <strong>{data.total}</strong> results
            </p>
            <div>
            <Pagination>
                <PaginationContent>
                    {data.links.map((link, index) => {
                        // Render "Previous" link
                        if (index === 0) {
                            return (
                                <PaginationItem key="previous">
                                    <PaginationPrevious as={Link} href={link.url ?? '#'} preserveState preserveScroll disabled={!link.url} />
                                </PaginationItem>
                            );
                        }
                        // Render "Next" link
                        if (index === data.links.length - 1) {
                            return (
                                <PaginationItem key="next">
                                    <PaginationNext as={Link} href={link.url ?? '#'} preserveState preserveScroll disabled={!link.url} />
                                </PaginationItem>
                            );
                        }
                        // Render ellipsis
                        if (link.label.includes('...')) {
                            return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }
                        // Render numeric page link
                        return (
                            <PaginationItem key={link.label}>
                                <PaginationLink as={Link} href={link.url ?? '#'} isActive={link.active} preserveState preserveScroll>
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
        </div>
    );
};

export default BasePagination;
