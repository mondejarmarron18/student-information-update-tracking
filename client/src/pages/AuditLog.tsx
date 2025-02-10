import CourseDialog from "@/components/common/CourseDialog";
import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import { role } from "@/constants/role";
import useAccessToken from "@/hooks/useAccessToken";
import useAuditLog from "@/hooks/useAuditLog";
import useSpecialization from "@/hooks/useSpecialization";
import { routePaths } from "@/routes";
import { toDateTimeNumeric } from "@/utils/fomatter";
import _ from "lodash";
import { Link, useParams } from "react-router";

const AuditLog = () => {
  const { specializationId, auditLogId } = useParams();
  const auditLog = useAuditLog({
    auditLogId: auditLogId as string,
  });
  const auditLogData = auditLog?.data?.data;

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
            {
              name: routePaths.auditLogs.name,
              href: routePaths.auditLogs.path,
            },
            {
              name: routePaths.auditLog.name,
              href: "",
            },
          ]}
        />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Action</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {_.toUpper(auditLogData?.action) || "-"}
          </div>
        </div>

        <div className="min-w-[200px]">
          <div className="font-semibold">Target Entity</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {auditLogData?.entity || "-"}
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">User Email</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {!auditLogData?.userId ? (
              auditLogData?.userEmail
            ) : (
              <Link
                to={routePaths.userAccount.path.replace(
                  ":userId",
                  auditLogData?.userId
                )}
              >
                {auditLogData?.userEmail || "-"}
              </Link>
            )}
          </div>
        </div>

        <div className="min-w-[200px]">
          <div className="font-semibold">Timestamp</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {toDateTimeNumeric(auditLogData?.timestamp) || "-"}
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">IP Address</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {auditLogData?.ipAddress || "-"}
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">User Agent</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {auditLogData?.userAgent || "-"}
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Requested URL</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {auditLogData?.requestedUrl || "-"}
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Requested Filter</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {JSON.stringify(auditLogData?.requestedFilter) || "-"}
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Details</div>
          <div className="flex flex-col gap-2 text-gray-500">
            {auditLogData?.details || "-"}
          </div>
        </div>
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

export default AuditLog;
