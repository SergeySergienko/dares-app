import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { format, subMonths } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { CalendarIcon } from 'lucide-react';

interface Props {
  handleDates: (range: DateRange) => void;
}
type Presets =
  | 'all'
  | 'last-month'
  | 'last-3-months'
  | 'last-6-months'
  | 'last-12-months';

const getDateRange = (months?: number): DateRange => {
  const endDate = new Date();
  if (!months) {
    return {
      from: new Date(0),
      to: endDate,
    };
  }
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - months);
  return {
    from: startDate,
    to: endDate,
  };
};

const valueRangeMapper: { [key: string]: DateRange } = {
  all: getDateRange(),
  'last-month': getDateRange(1),
  'last-3-months': getDateRange(3),
  'last-6-months': getDateRange(6),
  'last-12-months': getDateRange(12),
};

export function DataTableSelectDates({ handleDates }: Props) {
  const [dates, setDates] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSelect = (value: Presets) => {
    setDates(valueRangeMapper[value]);
  };

  const handleConfirm = () => {
    handleDates({
      from: dates.from,
      to: dates.to,
    });
    setPopoverOpen(false);
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className='w-56 justify-start text-left font-normal'
        >
          <CalendarIcon />
          {dates.from ? (
            dates.to ? (
              <>
                {format(dates.from, 'LLL dd, y')} -{' '}
                {format(dates.to, 'LLL dd, y')}
              </>
            ) : (
              format(dates.from, 'LLL dd, y')
            )
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='flex w-auto flex-col space-y-2 p-2'
      >
        <Select onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue placeholder='Presets' />
          </SelectTrigger>
          <SelectContent position='item-aligned'>
            <SelectItem value='all'>All time</SelectItem>
            <SelectItem value='last-month'>Last Month</SelectItem>
            <SelectItem value='last-3-months'>Last 3 Months</SelectItem>
            <SelectItem value='last-6-months'>Last 6 Months</SelectItem>
            <SelectItem value='last-12-months'>Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar
            mode='range'
            defaultMonth={subMonths(new Date(), 1)}
            selected={dates}
            onSelect={(range) => {
              if (range) {
                setDates(range);
              }
            }}
            numberOfMonths={2}
            weekStartsOn={1}
          />
          <div className='flex justify-end p-4'>
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
