import CoursesTable from "@/components/tables/CoursesTable";
import SpecializationsTable from "@/components/tables/SpecializationsTable";
import YearLevelsTable from "@/components/tables/YearLevelsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

const tabs: {
  label: string;
  key: string;
  content: ReactNode;
}[] = [
  {
    label: "Courses",
    key: "courses",
    content: <CoursesTable />,
  },
  {
    label: "Specializations",
    key: "specializations",
    content: <SpecializationsTable />,
  },
  {
    label: "Year Levels",
    key: "yearLevels",
    content: <YearLevelsTable />,
  },
];

const AcademicInfoMgmt = () => {
  return (
    <div>
      <Tabs defaultValue={tabs[0].key}>
        <TabsList className="mb-2">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Year Level</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Course 1</TableCell>
            <TableCell>Specialization 1</TableCell>
            <TableCell>Year Level 1</TableCell>
            <TableCell>
              <Link to={"#"}>Edit</Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Course 2</TableCell>
            <TableCell>Specialization 2</TableCell>
            <TableCell>Year Level 2</TableCell>
            <TableCell>
              <Link to={"#"}>Edit</Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </div>
  );
};

export default AcademicInfoMgmt;
