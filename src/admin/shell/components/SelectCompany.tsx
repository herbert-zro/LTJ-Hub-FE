import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COMPANY_OPTIONS = [
  { value: "ltj-el-salvador", label: "LTJ El Salvador" },
  { value: "nova-talent-mexico", label: "Nova Talent México" },
  { value: "andina-people-peru", label: "Andina People Perú" },
  { value: "blue-bridge-colombia", label: "Blue Bridge Colombia" },
  { value: "pacific-hr-panama", label: "Pacific HR Panamá" },
  { value: "orion-consulting-chile", label: "Orion Consulting Chile" },
  { value: "capital-humano-ecuador", label: "Capital Humano Ecuador" },
  { value: "talent-core-argentina", label: "Talent Core Argentina" },
];

export const SelectCompany = () => {
  return (
    <div className="mr-4">
      <Select defaultValue={COMPANY_OPTIONS[0].value}>
        <SelectTrigger
          aria-label="Seleccionar compañía"
          className="w-[220px] border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 focus-visible:border-brand-500 focus-visible:ring-brand-100/60"
        >
          <SelectValue placeholder="Selecciona una compañía" />
        </SelectTrigger>

        <SelectContent
          align="end"
          className="border-corp-gray-200 bg-surface-card"
        >
          <SelectGroup>
            {COMPANY_OPTIONS.map((company) => (
              <SelectItem
                key={company.value}
                value={company.value}
                className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
              >
                {company.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
