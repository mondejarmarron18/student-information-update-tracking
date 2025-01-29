import CourseDialog from "@/components/common/CourseDialog";
import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import RichTextValue from "@/components/common/RichTextValue";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { role } from "@/constants/role";
import useAccessToken from "@/hooks/useAccessToken";
import useCourse from "@/hooks/useCourse";
import { routePaths } from "@/routes";
import { toDateString } from "@/utils/fomatter";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router";

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data } = useCourse({ courseId: courseId as string });
  const course = data?.data;
  const { decodedAccessToken } = useAccessToken();
  const roleName = decodedAccessToken()?.roleId?.name;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 flex-wrap items-center">
        <CustomBreadcrumb
          links={[
            { name: "Courses", href: routePaths.academicManagement.path },
            {
              name: course?.name as string,
              href: "",
            },
          ]}
        />
        {courseId && (
          <Button
            variant="outline"
            onClick={() =>
              navigate(
                routePaths.specializations.path.replace(":courseId", courseId)
              )
            }
          >
            Specializations <MdArrowBackIos size={10} className="rotate-180" />
          </Button>
        )}
      </div>
      <div>
        <div className="font-semibold">Name</div>
        <p className="text-gray-500">{course?.name || "-"}</p>
      </div>

      <div>
        <div className="font-semibold">Description</div>
        <p className="text-gray-500">{course?.description || "-"}</p>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Created By</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {course?.creatorProfile?.firstName || "-"}{" "}
            {course?.creatorProfile?.lastName || "-"}
          </div>
        </div>

        <div>
          <div className="font-semibold">Date Created</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {toDateString(course?.createdAt) || "-"}
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Updated By</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {course?.updaterProfile?.firstName || "-"}{" "}
            {course?.updaterProfile?.lastName || "-"}
          </div>
        </div>

        <div>
          <div className="font-semibold">Date Updated</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {toDateString(course?.updatedAt) || "-"}
          </div>
        </div>
      </div>

      <div>
        <div className="font-semibold">Details</div>
        <Card className="p-4 mt-2 min-h-[150px]">
          {course?.details ? (
            <RichTextValue value={course.details} />
          ) : (
            <span className="text-gray-500">No details</span>
          )}
        </Card>
      </div>

      {roleName !== role.STUDENT && (
        <div className="flex gap-4 justify-end">
          {/* {!!course?._id && (
            <DeleteConfirmationDialog
              onConfirm={() => setIsSuccess(true)}
              trigger={<Button variant="destructive">Delete</Button>}
              isCompleted={isSuccess}
              
              content={
                <div>
                  <div>
                    <b>Name:</b> {course?.name}
                  </div>
                  <div>
                    <b>Description:</b> {course?.description}
                  </div>
                </div>
              }
            />
          )} */}
          {!!course?._id && (
            <CourseDialog
              courseId={course._id}
              trigger={<Button>Update</Button>}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Course;
