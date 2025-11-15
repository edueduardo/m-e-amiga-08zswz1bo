import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { countries, Country } from '@/lib/countries'
import { ChevronsUpDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PhoneNumberInputProps {
  value: string
  onChange: (value: string) => void
  defaultCountryCode?: string
}

export const PhoneNumberInput = ({
  value,
  onChange,
  defaultCountryCode = 'BR',
}: PhoneNumberInputProps) => {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    countries.find((c) => c.code === defaultCountryCode),
  )

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    onChange(`${country.dial_code} `)
    setOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (selectedCountry && !inputValue.startsWith(selectedCountry.dial_code)) {
      onChange(
        `${selectedCountry.dial_code} ${inputValue.replace(/[^0-9]/g, '')}`,
      )
    } else {
      onChange(inputValue)
    }
  }

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[150px] justify-between rounded-r-none"
          >
            {selectedCountry
              ? `${selectedCountry.code} (${selectedCountry.dial_code})`
              : 'Select country'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.code} ${country.dial_code}`}
                    onSelect={() => handleCountrySelect(country)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedCountry?.code === country.code
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    <span>{country.name}</span>
                    <span className="ml-auto text-muted-foreground">
                      {country.dial_code}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        placeholder="Phone number"
        value={value}
        onChange={handleInputChange}
        className="rounded-l-none"
      />
    </div>
  )
}
