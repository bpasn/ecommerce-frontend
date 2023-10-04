'use client';
import React, { ReactNode, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Store } from '@prisma/client';
import { useStoreModal } from '@/hooks/use-store-modal';
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
    CommandSeparator
} from '@/components/ui/command';
type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
interface StoreSwitcherProps extends PopoverTriggerProps {
    items?: Store[];
    renderCustom?: () => React.JSX.Element;
    footerShow?: boolean;
    onSelected?: (value?: string) => void;
    noResult?: string;
    commandInputPlaceholder?: string;
    heading: string;
    placeholderSearch?: string;
    onInputChanged?: (search: string) => void;
};

const StoreSwitcherApi: React.FC<StoreSwitcherProps> = ({
    className,
    items = [],
    renderCustom,
    footerShow = false,
    onSelected,
    noResult,
    commandInputPlaceholder,
    heading,
    placeholderSearch = "Search",
    onInputChanged
}) => {
    const storeModal = useStoreModal();
    const params = useParams();
    const route = useRouter();
    const formattedItems = items.map((item: Store) => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formattedItems.find(i => i.value === params.storeId);
    const [open, setOpen] = useState(false);
    const generateFooterSwitcher = () => {
        if (renderCustom) {
            return renderCustom();
        }
        if (footerShow) {
            return (
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                            onSelect={onSelected}>
                            <PlusCircle className='mr-2 w-4 h-4' />
                            Create
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            );
        }
        return null;
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"sm"}
                    role='combobox'
                    aria-expanded={open}
                    aria-label='Select a store'
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className='mr-2 h-4 w-4' />
                    <code className='text-sm text-foreground'>{placeholderSearch}</code>
                    <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandList>
                        <CommandInput placeholder={commandInputPlaceholder ?? "Search Input..."} onValueChange={onInputChanged}/>
                        <CommandEmpty>{noResult ?? "Result not found"}</CommandEmpty>
                        <CommandGroup heading={heading}>
                            {formattedItems.map(store => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => { }}
                                    className='text-sm cursor-pointer'
                                >
                                    <StoreIcon className='mr-2 h-4 w-4' />
                                    {store.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.value === store.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>

                    {generateFooterSwitcher()
                        ? (
                            <>
                                <CommandSeparator />
                                {generateFooterSwitcher()}
                            </>
                        )
                        : null}
                </Command>
            </PopoverContent>
        </Popover >
    )
}

export default StoreSwitcherApi