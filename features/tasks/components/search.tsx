"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SearchProps {
  placeholder: string;
}

export default function Search({ placeholder }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // State to manage the input and select values
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") ?? "");
  const [completed, setCompleted] = useState(
    searchParams.get("completed") ?? "",
  );
  const [priority, setPriority] = useState(searchParams.get("priority") ?? "");

  const handleSearch = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const clearFilters = () => {
    // Reset all input and select states
    setSearchTerm("");
    setCompleted("");
    setPriority("");
    replace(pathname);
  };

  const hasFilters = Array.from(searchParams.keys()).some((key) =>
    [
      "name",
      "completed",
      "due_date_start",
      "due_date_end",
      "priority",
      "user",
    ].includes(key),
  );

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      <div>
        {hasFilters && (
          <Button variant="secondary" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      <div className="self-end flex flex-wrap gap-4">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-500" />
          <Input
            className="pl-10"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch("name", e.target.value);
            }}
          />
        </div>

        <Select
          value={completed}
          onValueChange={(value) => {
            setCompleted(value);
            handleSearch("completed", value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Completed" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Completed</SelectItem>
            <SelectItem value="false">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priority}
          onValueChange={(value) => {
            setPriority(value);
            handleSearch("priority", value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
