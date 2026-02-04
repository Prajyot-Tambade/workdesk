import React, { useEffect, useState } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import * as Icons from "lucide-react";
import { Field, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const toKebabCase = (str: string) =>
  str
    .replace(/Icon$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

interface IconSelectorProps {
  selectedIcon?: IconName;
  onChange: (icon: IconName) => void;
}

const IconSelector = ({ selectedIcon, onChange }: IconSelectorProps) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [allIcons, setAllIcons] = useState<IconName[]>([]);
  const [iconNames, setIconNames] = useState<IconName[]>([]);
  const LIMIT = 100;

  useEffect(() => {
    const icons = Object.keys(Icons)
      .filter((key) => key !== "createLucideIcon" && !key.endsWith("Icon"))
      .map(toKebabCase) as IconName[];

    setAllIcons(icons);
    setIconNames(icons);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIconNames(
        allIcons.filter((icon) =>
          icon.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [search, allIcons]);

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
            {iconNames.slice(0, LIMIT).map((icon, index) => (
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
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default IconSelector;
