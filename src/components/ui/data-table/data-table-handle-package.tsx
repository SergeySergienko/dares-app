import { useCallback } from 'react';
import { Table } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { ArrowsUpFromLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DataTableHandlePackage<TData>({
  table,
  packageEntity,
}: {
  table: Table<TData>;
  packageEntity?: 'inventories' | 'hydrotests';
}) {
  const router = useRouter();
  const rows = table.getRowModel().rows;

  const handleSelectedTanks = useCallback(
    (
      packageAction: 'create' | 'complete',
      packageEntity: 'inventories' | 'hydrotests'
    ) => {
      const selectedTanks: number[] = [];
      rows.forEach((row) => {
        if (row.getIsSelected()) {
          selectedTanks.push(row.getValue('internalNumber'));
        }
      });
      router.push(
        `/reports/tanks/${packageAction}-${packageEntity}-package?tanks=${selectedTanks.join(
          ','
        )}`
      );
    },
    [rows, router]
  );

  if (packageEntity === 'inventories')
    return (
      <Button
        size='sm'
        onClick={() => handleSelectedTanks('create', packageEntity)}
      >
        <ArrowsUpFromLine />
        <span className='hidden md:block'>Create</span>
      </Button>
    );
  if (packageEntity === 'hydrotests')
    return (
      <>
        <Button
          size='sm'
          onClick={() => handleSelectedTanks('create', packageEntity)}
        >
          <ArrowsUpFromLine />
          <span className='hidden md:block'>Start</span>
        </Button>
        <Button
          size='sm'
          onClick={() => handleSelectedTanks('complete', packageEntity)}
        >
          <ArrowsUpFromLine className='rotate-180' />
          <span className='hidden md:block'>Complete</span>
        </Button>
      </>
    );

  return null;
}
