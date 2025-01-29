import ApproveUpdateRequestDialog from "@/components/common/ApproveUpdateRequestDialog";
import RejectUpdateRequestDialog from "@/components/common/RejectUpdateRequestDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { role } from "@/constants/role";
import { updateRequestStatus } from "@/constants/updateRequest";
import useAccessToken from "@/hooks/useAccessToken";
import useUpdateRequest from "@/hooks/useUpdateRequest";
import { cn } from "@/lib/utils";
import { routePaths } from "@/routes";
import { IUpdateRequest } from "@/types/updateRequest.type";
import { toDateString } from "@/utils/fomatter";
import getContentChanges from "@/utils/getContentChanges";
import { isArray } from "@/utils/validator";
import _ from "lodash";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router";

const UpdateRequest = () => {
  const navigate = useNavigate();
  const { updateRequestId } = useParams();
  const updateRequest = useUpdateRequest({ updateRequestId: updateRequestId! });
  const updateRequestData = updateRequest.data?.data;
  const { decodedAccessToken } = useAccessToken();
  const roleName = decodedAccessToken()?.roleId?.name;

  console.log(updateRequest);

  const renderChanges = (changes: Record<string, unknown>) => {
    return Object.entries(changes).map(([key, val]) => {
      if (!isArray(val)) {
        return (
          <Card key={key}>
            <CardHeader>
              <div className="font-semibold">{_.startCase(key)}</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {renderChanges(val as Record<string, unknown>)}
            </CardContent>
          </Card>
        );
      }

      if (isArray(val[1])) {
        return (
          <div key={key} className="flex flex-col gap-1">
            <div className="font-semibold text-sm">{_.startCase(key)}</div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                {(val as string[][])[0].map((v) => (
                  <div key={v as string} className="px-4 py-1 border rounded">
                    {v as string}
                  </div>
                ))}
              </div>
              <MdArrowBackIos className="rotate-180" />
              <div className="flex gap-2">
                {val[1].length > 0 ? (
                  val[1].map((v) => (
                    <div key={v as string} className="px-4 py-1 border rounded">
                      {v as string}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-1 text-sm text-gray-500">Empty</div>
                )}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div key={key} className="flex flex-col gap-1">
          <div className="font-semibold text-sm">{_.startCase(key)}</div>
          <div className="flex items-center gap-4">
            <div
              className={cn("opacity-60 px-4 py-1 border rounded", {
                "border-none text-sm text-gray-500": !val[0],
              })}
            >
              {(val[0] as string) || "Empty"}
            </div>
            <MdArrowBackIos className="rotate-180" size={10} />
            <div
              className={cn("px-4 py-1 border rounded", {
                "border-none text-sm text-gray-500": !val[1],
              })}
            >
              {(val[1] as string) || "Empty"}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderStatus = (status: IUpdateRequest["reviewStatus"]) => {
    switch (status) {
      case 2:
        return (
          <Badge variant={"outline"} className="text-green-500">
            Approved
          </Badge>
        );
      case 3:
        return (
          <Badge variant={"outline"} className="text-red-500">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant={"outline"} className="text-yellow-500">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => navigate(routePaths.updateRequests.path)}
        variant={"outline"}
        className="mb-2 self-start"
      >
        <MdArrowBackIos size={10} />
      </Button>
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Requester</div>
          <p className="text-gray-500">
            {!updateRequestData?.requesterProfile?.firstName && "-"}
            {updateRequestData?.requesterProfile?.firstName}{" "}
            {updateRequestData?.requesterProfile?.lastName}
          </p>
        </div>

        <div className="min-w-[200px]">
          <div className="font-semibold">Date Requested</div>
          <p className="text-gray-500">
            {toDateString(updateRequestData?.requestedAt) || "-"}
          </p>
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-semibold">Reviewer</div>
          <p className="text-gray-500">
            {!updateRequestData?.reviewerProfile?.firstName && "-"}
            {updateRequestData?.reviewerProfile?.firstName}{" "}
            {updateRequestData?.reviewerProfile?.lastName}
          </p>
        </div>

        <div className="min-w-[200px]">
          <div className="font-semibold">Date Reviewed</div>
          <p className="text-gray-500">
            {toDateString(updateRequestData?.reviewedAt) || "-"}
          </p>
        </div>
      </div>

      <div>
        <div className="font-semibold">Comment/Feedback</div>
        <p className="text-gray-500">
          {updateRequestData?.reviewComment || "-"}
        </p>
      </div>

      <Card className="min-h-[250px]">
        <CardHeader>
          <div className="font-semibold flex w-fit gap-2">
            Requested Changes
            {renderStatus(updateRequestData?.reviewStatus || 1)}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {updateRequestData?.content &&
          Object.keys(
            getContentChanges(
              updateRequestData.content.previous,
              updateRequestData.content.current
            )
          ).length ? (
            renderChanges(
              getContentChanges(
                updateRequestData.content.previous,
                updateRequestData.content.current
              )
            )
          ) : (
            <div className="text-gray-500 m-auto mt-[50px]">
              No changes found
            </div>
          )}
        </CardContent>
      </Card>

      {roleName !== role.STUDENT && (
        <div className="flex gap-4 justify-end">
          {!!updateRequestId && (
            <RejectUpdateRequestDialog
              updateRequestId={updateRequestId}
              trigger={
                <Button
                  disabled={
                    updateRequestData?.reviewStatus !==
                    updateRequestStatus.PENDING
                  }
                  variant="destructive"
                >
                  Reject
                </Button>
              }
            />
          )}
          {!!updateRequestId && (
            <ApproveUpdateRequestDialog
              updateRequestId={updateRequestId}
              trigger={
                <Button
                  disabled={
                    updateRequestData?.reviewStatus !==
                    updateRequestStatus.PENDING
                  }
                >
                  Approve
                </Button>
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateRequest;
