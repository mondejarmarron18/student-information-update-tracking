import CoursesTable from "@/components/tables/CoursesTable";
// import SpecializationsTable from "@/components/tables/SpecializationsTable";
import YearLevelsTable from "@/components/tables/YearLevelsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router";

type Tabs = {
  value: string;
  name: string;
  element: () => JSX.Element;
};

const tabs: Tabs[] = [
  {
    value: "courses",
    name: "Courses",
    element: CoursesTable,
  },
  {
    value: "year-levels",
    name: "Year levels",
    element: YearLevelsTable,
  },
  // {
  //   value: "specializations",
  //   name: "Specializations",
  //   element: SpecializationsTable,
  // },
];

const AcademicManagement = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const activeTab = tabs.find((t) => t.value === tab)?.value;

  return (
    <Tabs defaultValue={activeTab || tabs[0].value}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <tab.element />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AcademicManagement;
