import CourseDialog from "@/components/common/CourseDialog";
import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import RichTextValue from "@/components/common/RichTextValue";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { role } from "@/constants/role";
import useAccessToken from "@/hooks/useAccessToken";
import useSpecialization from "@/hooks/useSpecialization";
import { routePaths } from "@/routes";
import { toDateString } from "@/utils/fomatter";
import { useParams } from "react-router";

const Specialization = () => {
  const { specializationId } = useParams();
  const { data } = useSpecialization({
    specializationId: specializationId as string,
  });
  const specialization = data?.data;
  const { decodedAccessToken } = useAccessToken();
  const roleName = decodedAccessToken()?.roleId?.name;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 flex-wrap items-center">
        <CustomBreadcrumb
          links={[
            { name: "Courses", href: routePaths.courses.path },
            {
              name: specialization?.course?.name as string,
              href: routePaths.course.path.replace(
                ":courseId",
                specialization?.course?._id as string
              ),
            },
            {
              name: "Specializations",
              href: routePaths.specializations.path.replace(
                ":courseId",
                specialization?.course?._id as string
              ),
            },
            {
              name: specialization?.name as string,
              href: "",
            },
          ]}
        />
      </div>

      <div>
        <div className="font-semibold">Name</div>
        <p className="text-gray-500">{specialization?.name || "-"}</p>
      </div>

      <div>
        <div className="font-semibold">Description</div>
        <p className="text-gray-500">{specialization?.description || "-"}</p>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Created By</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {specialization?.creatorProfile?.firstName || "-"}{" "}
            {specialization?.creatorProfile?.lastName || "-"}
          </div>
        </div>

        <div>
          <div className="font-semibold">Date Created</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {toDateString(specialization?.createdAt) || "-"}
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Updated By</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {specialization?.updaterProfile?.firstName || "-"}{" "}
            {specialization?.updaterProfile?.lastName || "-"}
          </div>
        </div>

        <div>
          <div className="font-semibold">Date Updated</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {toDateString(specialization?.updatedAt) || "-"}
          </div>
        </div>
      </div>

      <div>
        <div className="font-semibold">Details</div>
        <Card className="p-4 mt-2 min-h-[150px]">
          {specialization?.details ? (
            <RichTextValue value={specialization.details} />
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
          {!!specialization?._id && (
            <CourseDialog
              courseId={specialization._id}
              trigger={<Button>Update</Button>}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Specialization;
