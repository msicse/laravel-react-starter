import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface DataTableFiltersProps {
  children: ReactNode;
  onReset: () => void;
  onApply?: () => void;
  quickSearch?: ReactNode;
  defaultExpanded?: boolean;
}

export function BaseTableFilters({
  children,
  onReset,
  onApply,
  quickSearch,
  defaultExpanded = false,
}: DataTableFiltersProps) {
  const [isFilterExpanded, setIsFilterExpanded] = useState(defaultExpanded);

  const toggleFilters = () => setIsFilterExpanded(!isFilterExpanded);

  return (
    <div className="mb-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFilters}
            className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
          >
            {isFilterExpanded ? 'Hide filters' : 'Show filters'}
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-md border border-red-500 px-3 py-1.5 text-sm text-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {isFilterExpanded ? (
        <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-4 p-4 rounded-md shadow-sm">
          {children}
          {onApply && (
            <div className="flex items-end gap-2">
              <Button onClick={onApply}>Apply</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {quickSearch}
          {onApply && (
            <Button onClick={onApply} className="flex-shrink-0">
              Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
