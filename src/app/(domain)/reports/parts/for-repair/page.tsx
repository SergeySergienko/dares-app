'use client';

import { useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { partsUsageReport } from '@/actions/part-actions';
import { DataTable } from '@/components/ui/data-table';
import { PartsUsageReportOutputDTO } from '@/models/PartModel';
import { columns } from './columns';
import Loading from './loading';

export default function PartsForRepair() {
  const [parts, setParts] = useState<PartsUsageReportOutputDTO[]>([]);
  const [dates, setDates] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const parts = await partsUsageReport({
        startDate: dates.from,
        endDate: dates.to,
      });
      setParts(parts);
      setIsLoading(false);
    })();
  }, [dates.from, dates.to]);

  const handleDates = useCallback((range: DateRange) => {
    setDates(range);
  }, []);

  return (
    <div className='w-full px-4 pb-4'>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          data={parts}
          title='Parts for Repair'
          initialSorting={{ id: 'itemNumber', desc: false }}
          handleDates={handleDates}
        />
      )}
    </div>
  );
}
