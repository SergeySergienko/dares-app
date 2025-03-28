import { Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { Check } from 'lucide-react';
import { useState } from 'react';

interface Props<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
}: Props<TData, TValue>) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const options = facets ? Array.from(facets.keys()) : [];

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='link'
            className='px-1 underline hover:no-underline hover:text-primary text-muted-foreground print:no-underline'
          >
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-40 p-0'
          align='start'
          container={container}
        >
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((value, index) => {
                  const isSelected = selectedValues.has(value);
                  return (
                    <CommandItem
                      key={value + index}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(value);
                        } else {
                          selectedValues.add(value);
                        }
                        const filterValues = Array.from(selectedValues);
                        column?.setFilterValue(
                          filterValues.length ? filterValues : undefined
                        );
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <Check />
                      </div>
                      <span>{value}</span>
                      <span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
                        {facets?.get(value) || 0}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => column?.setFilterValue(undefined)}
                      className='justify-center text-center'
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='font-normal' ref={setContainer} />
    </div>
  );
}
