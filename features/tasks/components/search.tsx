"use client";

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

interface SearchProps {
  placeholder: string;
}

export default function Search({ placeholder }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  return (
    <div className="flex flex-wrap gap-4 self-end">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-500" />
        <Input
          className="pl-10"
          placeholder={placeholder}
          onChange={(e) => handleSearch("name", e.target.value)}
          defaultValue={searchParams.get("name") ?? ""}
        />
      </div>
      <Select onValueChange={(value) => handleSearch("completed", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Completed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Completed</SelectItem>
          <SelectItem value="false">Pending</SelectItem>
        </SelectContent>
      </Select>
      {/* <Input */}
      {/*   type="date" */}
      {/*   placeholder="Due Date From" */}
      {/*   onChange={(e) => handleSearch("due_date_after", e.target.value)} */}
      {/* /> */}
      {/* <Input */}
      {/*   type="date" */}
      {/*   placeholder="Due Date To" */}
      {/*   onChange={(e) => handleSearch("due_date_before", e.target.value)} */}
      {/* /> */}
      <Select onValueChange={(value) => handleSearch("priority", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      {/* <Input */}
      {/*   type="number" */}
      {/*   placeholder="User ID" */}
      {/*   onChange={(e) => handleSearch("user", e.target.value)} */}
      {/* /> */}
    </div>
  );
}
