import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext
} from '@/components/ui/pagination';
import clsx from 'clsx';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
  if (!links || links.length <= 3) return null;

  return (
    <ShadPagination>
      <PaginationContent>
        {links.map((link, index) => {
          const isPrev = index === 0;
          const isNext = index === links.length - 1;

          if (isPrev) {
            return (
              <PaginationItem key="prev">
                <PaginationPrevious
                  as={Link}
                  href={link.url ?? ''}
                  preserveScroll
                  preserveState
                  disabled={!link.url}
                />
              </PaginationItem>
            );
          }

          if (isNext) {
            return (
              <PaginationItem key="next">
                <PaginationNext
                  as={Link}
                  href={link.url ?? ''}
                  preserveScroll
                  preserveState
                  disabled={!link.url}
                />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <Link
                href={link.url ?? ''}
                preserveScroll
                preserveState
                className={clsx(
                  'px-3 py-1 text-sm rounded',
                  link.active
                    ? 'bg-gray-300 text-white'
                    : 'hover:bg-muted hover:text-foreground'
                )}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </ShadPagination>
  );
};

export default Pagination;
