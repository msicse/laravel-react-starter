import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

export default function Pagination({ meta, links }: any) {
  const gotoPage = (url: string) => {
    if (!url) return;
    router.visit(url, { preserveState: true });
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Showing {meta.from} to {meta.to} of {meta.total}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => gotoPage(links.prev)}
          disabled={!links.prev}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => gotoPage(links.next)}
          disabled={!links.next}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
