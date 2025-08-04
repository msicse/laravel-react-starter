import { User } from '@/lib/data';
import { HeaderContext } from '@tanstack/react-table';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { ContextMenu, ContextMenuContent, ContextMenuTrigger, ContextMenuCheckboxItem } from '../ui/context-menu';


interface DefaultHeaderProps<T> {
    info: HeaderContext<User, T>;
    name: string;
}

export function DefaultHeader<T>({ info, name }: DefaultHeaderProps<T>) {
    const sorted = info.column.getIsSorted();
    const table = info.table;
    return (
        <ContextMenu>
            <ContextMenuTrigger
                onPointerDown={(e) => {
                    e.preventDefault();
                    if(e.button == 2) return; // Ignore right-click
                    info.column.toggleSorting(info.column.getIsSorted() === 'asc');
                }}
                className="flex h-full w-full cursor-pointer items-center justify-start gap-4 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
                {name}
                {sorted === 'asc' && <FaSortAlphaUp />}
                {sorted === 'desc' && <FaSortAlphaDown />}
            </ContextMenuTrigger>
            <ContextMenuContent>
                {table.getAllColumns()
                    .filter((col) => col.getCanHide())
                    .map((column) => (
                        <ContextMenuCheckboxItem
                            key={column.id}
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => {
                                column.toggleVisibility(!!value);
                            }}
                            className="capitalize"
                        >
                            {column.id}
                        </ContextMenuCheckboxItem>
                    ))}
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default DefaultHeader;
