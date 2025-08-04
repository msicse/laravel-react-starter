type Header = {
  label: string;
  key: string;
};

type Props = {
  data: any[];
  headers: Header[];
  onSort?: (key: string) => void;
  sortBy?: string;
  sortDir?: string;
};

export default function ServerTable({ data, headers, onSort, sortBy, sortDir }: Props) {
  return (
    <div className="rounded border overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                className="cursor-pointer p-2"
                onClick={() => onSort?.(header.key)}
              >
                {header.label}
                {sortBy === header.key && (sortDir === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="p-4 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="border-t">
                {headers.map((header) => (
                  <td key={header.key} className="p-2">{row[header.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
