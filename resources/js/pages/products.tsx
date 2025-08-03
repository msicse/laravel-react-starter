import { BaseTableFilters } from '@/base/base-table-filter';
import { PageHeader } from '@/base/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BaseLayout from '@/layouts/base-layout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    brand: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props extends PageProps {
    products: {
        current_page: number;
        data: Product[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: PaginationLink[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
    categories: {
        id: number;
        name: string;
    }[];

    filters: {
        search?: string;
        category?: string;
        perPage?: string;
        isFilterExpanded?: boolean;
    };
}

function Products({ products, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    // const [category, setCategory] = useState(filters.category || 'all');
    const [perPage, setPerPage] = useState(filters.perPage || '10');
    const [isFilterExpanded, setIsFilterExpanded] = useState(filters.isFilterExpanded || false);

    console.log('Products:', products);

    const handleFilter = () => {
        router.get(
            route('products.index'),
            {
                search,
                // category,
                perPage,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleReset = () => {
        setSearch('');
        // setCategory('all');
        setPerPage('10');
        router.get(
            route('products.index'),
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const toggleFilters = () => {
        setIsFilterExpanded(!isFilterExpanded);
    };

    return (
        <BaseLayout>
            <Head title="Products" />
            <PageHeader
                title="Products"
                description="Manage your inventory"
                action={{
                    label: 'Add Product',
                    icon: <Plus className="h-4 w-4" />,
                    href: route('products.index'),
                    size: 'sm',
                }}
            />

            <div className="mb-2">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* <h3 className="text-lg font-semibold">Filters</h3> */}
                        <button
                            onClick={toggleFilters}
                            className="cursor-pointer text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            {isFilterExpanded ? 'Hide filters' : 'Show filters'}
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-1 rounded-md border border-red-500 px-3 py-1.5 text-sm text-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                            Reset
                        </button>
                    </div>
                </div>

                {isFilterExpanded && (
                    <div className="mb-2 grid grid-cols-1 gap-4 rounded-md px-4 shadow-sm md:grid-cols-4">
                        <div>
                            <Label htmlFor="search">Search</Label>
                            <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
                        </div>
                        <div>
                            <Label htmlFor="search">Search</Label>
                            <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
                        </div>
                        <div>
                            <Label htmlFor="search">Search</Label>
                            <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
                        </div>
                        <div>
                            <Label htmlFor="search">Search</Label>
                            <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
                        </div>
                        <div>
                            <Label htmlFor="search">Search</Label>
                            <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
                        </div>

                        <div>
                            <Label htmlFor="perPage">Items Per Page</Label>
                            <Select value={perPage} onValueChange={setPerPage}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select per page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end gap-2">
                            <Button onClick={handleFilter}>Apply</Button>
                        </div>
                    </div>
                )}
                {!isFilterExpanded && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {/* <div className="flex-shrink-0">
                            <Input type="text" placeholder="Quick search..." value={search} className="w-64" />
                        </div> */}
                        <div>
                            <Input
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-80"
                            />
                        </div>
                        <button
                            onClick={handleFilter}
                            className="flex-shrink-0 rounded-md bg-indigo-600 px-3 py-1.5 text-white transition-colors duration-300 hover:bg-indigo-700"
                        >
                            Search
                        </button>
                    </div>
                )}
            </div>
            <BaseTableFilters
                onReset={handleReset}
                onApply={handleFilter}
                quickSearch={
                    <Input type="text" placeholder="Quick search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
                }
                defaultExpanded={isFilterExpanded}
            >
                <div>
                    <Label htmlFor="search">Search</Label>
                    <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
                </div>
                <div>
                    <Label htmlFor="perPage">Items Per Page</Label>
                    <Select value={perPage} onValueChange={setPerPage}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </BaseTableFilters>
        </BaseLayout>
    );
}

export default Products;
