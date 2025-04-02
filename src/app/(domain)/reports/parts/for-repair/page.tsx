'use client';

import { useCallback, useEffect, useState } from 'react';
import { partsUsageReport } from '@/actions/part-actions';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { PartsUsageReportOutputDTO } from '@/models/PartModel';
import { DateRange } from 'react-day-picker';

export default function PartsForRepair() {
  const [parts, setParts] = useState<PartsUsageReportOutputDTO[]>([]);
  const [dates, setDates] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    (async () => {
      const parts = await partsUsageReport({
        startDate: dates.from,
        endDate: dates.to,
      });
      setParts(parts);
    })();
  }, [dates.from, dates.to]);

  const handleDates = useCallback((range: DateRange) => {
    setDates(range);
  }, []);

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={parts}
        title='Parts for Repair'
        initialSorting={{ id: 'itemNumber', desc: false }}
        handleDates={handleDates}
      />
    </div>
  );
}
