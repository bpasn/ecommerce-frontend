import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useStoreModal } from '@/hooks/useStoreModel';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandGroup,
  CommandList,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import axios from 'axios';
type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  itemsCommand?: { label: string, value: string; }[];
  onChangeSearch?: (v: string) => void;
  renderCustom?: () => React.JSX.Element;
  loading?: boolean;
};
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const StoreSwitcher: React.FC<StoreSwitcherProps> = ({
  itemsCommand = [],
  onChangeSearch,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  if (!isMounted) return null;
  const currentStore = itemsCommand.find(e => e.label === selected)
  const onStoreSelect = (store: { value: string, label: string; }) => {
    setOpen(false);
    setSelected(store.label);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild >
        <Button
          variant={"outline"}
          size={"sm"}
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className="w-full justify-between text-left font-normal px-2 py-5"
        >
          <StoreIcon className='mr-2 h-4 w-4' />
          {currentStore?.label ?? (
            <code className='text-sm text-foreground'>No Store result.</code>
          )}
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full min-w-[var(--radix-popover-trigger-width)]")} >
        <Command>
          <CommandList>
            <CommandInput
              className='focus:ring-0'
              placeholder="Enter a minimum 4 character product name."
              onValueChange={onChangeSearch} />
            <CommandEmpty className='flex justify-center'> {loading ? (
              <svg aria-hidden={true} className="w-4 h-4 mt-4 text-center mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            ) : "No Results"} </CommandEmpty>
            <CommandGroup heading="Result">
              {itemsCommand.map((store) => {
                return (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="text-sm"
                    value={store.label}
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",

                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  );
};

export default StoreSwitcher;