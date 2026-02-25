import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RowsPerPage = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel
          htmlFor="select-rows-per-page"
          className="text-sm font-semibold text-text-strong"
        >
          Rows per page
        </FieldLabel>
        <Select defaultValue="25">
          <SelectTrigger
            className="w-20 border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 focus-visible:border-brand-500 focus-visible:ring-brand-100/60"
            id="select-rows-per-page"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            align="start"
            className="border-corp-gray-200 bg-surface-card"
          >
            <SelectGroup>
              <SelectItem
                value="10"
                className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
              >
                10
              </SelectItem>
              <SelectItem
                value="25"
                className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
              >
                25
              </SelectItem>
              <SelectItem
                value="50"
                className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
              >
                50
              </SelectItem>
              <SelectItem
                value="100"
                className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
              >
                100
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
};
