import React, { useEffect, useState } from "react";
import {
  DynamicIcon,
  type IconName,
  dynamicIconImports,
} from "lucide-react/dynamic";
import { Field, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const DYNAMIC_ICON_NAMES = Object.keys(dynamicIconImports) as IconName[];
const LIMIT = 100;

interface IconSelectorProps {
  selectedIcon?: IconName;
  onChange: (icon: IconName) => void;
}

const IconSelector = ({ selectedIcon, onChange }: IconSelectorProps) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [iconNames, setIconNames] = useState<IconName[]>([]);

  useEffect(() => {
    const q = search.toLowerCase();
    const timer = setTimeout(() => {
      setIconNames(
        DYNAMIC_ICON_NAMES.filter((icon) => icon.includes(q)),
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonGroup className="w-full">
          <ButtonGroup>
            {selectedIcon && (
              <Button variant="outline" className="flex items-center gap-2">
                <DynamicIcon name={selectedIcon} size={20} />
              </Button>
            )}
          </ButtonGroup>
          <ButtonGroup className="flex-1">
            <Button
              variant="outline"
              className="flex items-center gap-2 flex-1"
            >
              Select an icon
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] p-2">
        <div className="h-[500px] overflow-y-scroll">
          <Field className="sticky top-0 bg-neutral-900">
            <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
            <ButtonGroup>
              <Input
                id="input-button-group"
                placeholder="Type to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline">Search</Button>
            </ButtonGroup>
          </Field>

          <div className="mt-8 grid grid-cols-5 gap-2 gap-y-8">
            {iconNames.length === 0 ? (
              <h3 className="text-[#808080] col-span-3">No icons found</h3>
            ) : (
              iconNames.slice(0, LIMIT).map((icon, index) => (
                <DynamicIcon
                  key={`${icon}-${index}`}
                  name={icon}
                  color="#808080"
                  size={32}
                  onClick={() => {
                    onChange(icon);
                    setOpen(false);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default IconSelector;
