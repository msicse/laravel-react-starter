
import BasePagination from "@/base/base-pagination";
import { BaseTableFilters } from '@/base/base-table-filter';
import { PageHeader } from '@/base/page-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BaseLayout from '@/layouts/base-layout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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
    pageRoute: string;
    meta: any[];
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
    const [isFilterExpanded, setIsFilterExpanded] = useState(filters.isFilterExpanded || false);

    console.log('Products:', products);
    const pageRoute = route('products.index');

    const handleFilter = () => {
        router.get(
            route('products.index'),
            {
                search,
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
        // setPerPage('10');
        router.get(
            route('products.index'),
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSort = (column) => {
        const isAsc = sort === column && direction === 'asc';
        router.get(route('users.index'), { sort: column, direction: isAsc ? 'desc' : 'asc', perPage }, { preserveScroll: true });
        setSort(column);
        setDirection(isAsc ? 'desc' : 'asc');
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

            </BaseTableFilters>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead onClick={() => handleSort('id')} className="cursor-pointer">
                            ID
                        </TableHead>
                        <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                            Name
                        </TableHead>
                        <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
                            Description
                        </TableHead>
                        <TableHead onClick={() => handleSort('created_at')} className="cursor-pointer">
                            Price
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.data.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <BasePagination meta={products} pageRoute={pageRoute} />
        </BaseLayout>
    );
}

export default Products;
