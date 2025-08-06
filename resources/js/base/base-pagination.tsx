import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState } from "react";

interface LinkType {
    url: string | null;
    label: string;
    active: boolean;
}

type PerPageOption = '10' | '20' | '50' | '100';

interface PaginationProps {
    meta: {
        from: number | null;
        to: number | null;
        total: number;
        links: LinkType[];
        current_page: number;
        first_page_url: string;
        last_page_url: string;
        prev_page_url: string;
        next_page_url: string;
        last_page: number;
    };
    perPage?: number;
    pageRoute: string;
}

export default function BasePagination({ meta, perPage = 10, pageRoute }: PaginationProps) {
    const { links, from, to, total } = meta;

    // Remove first and last link if they're "Previous" and "Next"
    const numberedLinks = links.slice(1, -1);

    // Get first and last page URLs
    const firstPageUrl = meta.first_page_url;
    const lastPageUrl = meta.last_page_url;
    const currentPerPage = perPage ?? 10;
    const [selectedValue, setSelectedValue] = useState<PerPageOption>(perPage.toString() as PerPageOption)



    const handlePerPageChange = (value: PerPageOption) => {
        setSelectedValue(value);
        console.log(pageRoute);
        console.log(value);
        // Use Inertia's router to make a GET request with the new perPage value
        router.get(
            pageRoute,
            {
                per_page: value,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="mt-6 flex flex-col items-center justify-between gap-2 rounded-md bg-white p-4 text-sm shadow-sm lg:flex-row dark:bg-transparent">
            {/* Info: Showing X to Y of Z */}
            <div className="mb-4 flex w-full flex-col items-center gap-4 sm:flex-row lg:mb-0">
                {from !== null && to !== null && (
                    <span>
                        Showing <span className="font-semibold text-gray-800 dark:text-gray-200">{from || 0}</span> to{' '}
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{to || 0}</span> of{' '}
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{total || 0}</span> results
                    </span>
                )}
            </div>

            <div className="">
                <Select value={selectedValue} onValueChange={handlePerPageChange}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Per page" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Pagination links */}
            <Pagination className="flex items-center">
                <PaginationContent className="flex items-center gap-0">
                    <PaginationItem>
                        <Link
                            preserveScroll
                            href={firstPageUrl || '#'}
                            className={`relative inline-flex h-8 w-8 items-center justify-center rounded-l-md border-y border-l ${
                                meta?.current_page === 1
                                    ? 'cursor-not-allowed border-gray-300 bg-gray-100 opacity-50 dark:border-gray-600 dark:bg-gray-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                            disabled={meta?.current_page === 1}
                            title="First page"
                        >
                            <ChevronsLeft className="h-3.5 w-3.5" />
                        </Link>
                    </PaginationItem>
                    {/* Previous Button */}
                    <PaginationItem>
                        <Link
                            preserveScroll
                            href={meta.prev_page_url || '#'}
                            className={`relative inline-flex h-8 w-8 items-center justify-center border-y ${
                                !meta.prev_page_url
                                    ? 'cursor-not-allowed border-gray-300 bg-gray-100 opacity-50 dark:border-gray-600 dark:bg-gray-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                            disabled={!meta.prev_page_url}
                            title="Previous page"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" />
                        </Link>
                    </PaginationItem>

                    {/* Numbered Page Buttons */}
                    {numberedLinks.map((link, i) => (
                        <PaginationItem key={i}>
                            <Link
                                preserveScroll
                                href={link.url || '#'}
                                key={i}
                                className={`relative inline-flex h-8 w-8 items-center justify-center border-y ${
                                    link.active
                                        ? 'z-10 border-indigo-500 bg-indigo-50 font-medium text-indigo-600 dark:border-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                title={`Page ${link.label}`}
                            ></Link>
                        </PaginationItem>
                    ))}

                    {/* Next Button */}
                    <PaginationItem>
                        <Link
                            preserveScroll
                            href={meta.next_page_url || '#'}
                            className={`relative inline-flex h-8 w-8 items-center justify-center border-y ${
                                !meta.next_page_url
                                    ? 'cursor-not-allowed border-gray-300 bg-gray-100 opacity-50 dark:border-gray-600 dark:bg-gray-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                            disabled={!meta.next_page_url}
                            title="Next page"
                        >
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </PaginationItem>
                    <PaginationItem>
                        <Link
                            preserveScroll
                            href={lastPageUrl || '#'}
                            className={`relative inline-flex h-8 w-8 items-center justify-center rounded-r-md border-y border-r ${
                                meta?.current_page === meta?.last_page
                                    ? 'cursor-not-allowed border-gray-300 bg-gray-100 opacity-50 dark:border-gray-600 dark:bg-gray-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                            disabled={meta?.current_page === meta?.last_page}
                            title="Last page"
                        >
                            <ChevronsRight className="h-3.5 w-3.5" />
                        </Link>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
