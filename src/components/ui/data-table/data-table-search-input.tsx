import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props<TData> {
  table: Table<TData>;
  inputValue: string;
  onChange: (value: string) => void;
  searchBy?: string;
}

export function DataTableSearchInput<TData>({
  table,
  inputValue,
  onChange,
  searchBy,
}: Props<TData>) {
  const getCanSearch = (searchValue: string) =>
    table.getAllColumns().some((column) => column.id === searchValue);

  if (!searchBy || !getCanSearch(searchBy)) {
    return;
  }
  return (
    <div>
      <Input
        placeholder='I/N' // TODO: implement flexible placeholder depending on searchBy value
        value={inputValue}
        onChange={(event) => onChange(event.target.value)}
        className='h-8 w-16'
      />
      <Button
        size='sm'
        className='mr-4'
        onClick={() => table.getColumn(searchBy)?.setFilterValue(inputValue)}
      >
        Search
      </Button>
    </div>
  );
}
