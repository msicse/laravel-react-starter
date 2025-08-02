import BaseLayout from "@/layouts/base-layout"
import { Head } from "@inertiajs/react"

function Products() {
  return (
    <BaseLayout>
        <Head title="Products" />
        <PageHeader
            title="Products"
            description="Manage your inventory"
            action={{
                label: 'Add Product',
                icon: <Plus className="h-4 w-4" />,
                href: route('products.create'),
                size: 'sm',
            }}
        />
    </BaseLayout>
  )
}

export default Products
