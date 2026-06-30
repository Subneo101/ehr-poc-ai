
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { Check, ChevronsUpDown, X, Zap } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface DataFieldProps {
  sourceField: string;
  sourceSystem: string;
  targetOptions: { value: string; label: string; match?: string[] }[];
  onMap: (targetField: string) => void;
  onUnmap: () => void;
  mapped?: string;
  pulseHighlight?: boolean;
  suggestedMatches?: string[];
}

export function DataField({ 
  sourceField, 
  sourceSystem, 
  targetOptions, 
  onMap, 
  onUnmap, 
  mapped,
  pulseHighlight = false,
  suggestedMatches = []
}: DataFieldProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(mapped || '');

  // Auto-open popover if field needs highlight
  useEffect(() => {
    if (pulseHighlight && !mapped) {
      setOpen(true);
    }
  }, [pulseHighlight, mapped]);

  // Get the best suggested match for quick mapping
  const bestSuggestedMatch = suggestedMatches.length > 0 ? suggestedMatches[0] : null;

  return (
    <div className={`flex items-center gap-2 p-4 rounded-lg border ${pulseHighlight ? 'border-primary pulse-highlight' : 'border-border'} bg-card`}>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-md ${pulseHighlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'} flex items-center justify-center`}>
            {sourceField.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{sourceField}</p>
            <span className="text-sm text-muted-foreground">{sourceSystem}</span>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center">
        <div className="h-0.5 w-16 bg-border"></div>
      </div>

      {/* Target field selection */}
      <div className="flex-1">
        {mapped ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-accent/50 flex items-center justify-center text-accent-foreground">
              {mapped.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-medium">{mapped}</p>
              <span className="text-sm text-muted-foreground">EyeMD</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onUnmap}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove mapping</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`justify-between ${pulseHighlight ? 'border-primary pulse-highlight' : ''}`}
                  style={{ flex: 1 }}
                >
                  {value ? targetOptions.find(option => option.value === value)?.label : "Select field..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0">
                <Command>
                  <CommandInput placeholder="Search fields..." />
                  <CommandEmpty>No field found.</CommandEmpty>
                  <CommandGroup>
                    {targetOptions.map(option => {
                      const isSuggested = suggestedMatches.includes(option.label);
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue);
                            onMap(option.label);
                            setOpen(false);
                          }}
                          className={`${option.label === 'Procedure Code' && pulseHighlight ? 'bg-primary/10' : ''} ${isSuggested ? 'border-l-2 border-primary' : ''}`}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${value === option.value ? "opacity-100" : "opacity-0"}`}
                          />
                          {option.label}
                          {isSuggested && (
                            <Badge className="ml-auto bg-primary/10 text-primary text-xs">
                              Match
                            </Badge>
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            
            {bestSuggestedMatch && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 text-primary"
                      onClick={() => {
                        onMap(bestSuggestedMatch);
                        const matchedOption = targetOptions.find(opt => opt.label === bestSuggestedMatch);
                        if (matchedOption) {
                          setValue(matchedOption.value);
                        }
                      }}
                    >
                      <Zap className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Auto-map to suggested match: {bestSuggestedMatch}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
