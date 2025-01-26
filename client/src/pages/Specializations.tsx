import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import SpecializationsTable from "@/components/tables/SpecializationsTable";
import useCourse from "@/hooks/useCourse";
import { routePaths } from "@/routes";
import { useParams } from "react-router";

const Specializations = () => {
  const { courseId } = useParams();
  const { data } = useCourse({ courseId: courseId as string });
  const course = data?.data;

  return (
    <div>
      <div className="flex justify-between gap-2 flex-wrap items-center">
        <CustomBreadcrumb
          links={[
            { name: "Courses", href: routePaths.courses.path },
            {
              name: course?.name as string,
              href: routePaths.course.path.replace(
                ":courseId",
                course?._id as string
              ),
            },
            {
              name: "Specializations",
              href: "",
            },
          ]}
        />
      </div>
      <SpecializationsTable />
    </div>
  );
};

export default Specializations;
