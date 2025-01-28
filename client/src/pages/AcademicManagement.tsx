import CoursesTable from "@/components/tables/CoursesTable";
import YearLevelsTable from "@/components/tables/YearLevelsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
];

const AcademicManagement = () => {
  return (
    <Tabs defaultValue="courses">
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
