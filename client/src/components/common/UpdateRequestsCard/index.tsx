import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { role } from "@/constants/role";
import useAccessToken from "@/hooks/useAccessToken";
import useUpdateRequests from "@/hooks/useUpdateRequests";
import { toDateNumeric } from "@/utils/fomatter";
import UpdateRequestStatus from "../UpdateRequestStatus";
import UpdateRequestType from "../UpdateRequestType";

const UpdateRequestsCard = () => {
  const updateRequests = useUpdateRequests();
  const updateRequestsList = updateRequests.data?.data || [];
  const { decodedAccessToken } = useAccessToken();
  const userRoleName = decodedAccessToken()?.roleId.name;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Update Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {updateRequestsList.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px] text-center text-sm text-gray-500">
            No recent update requests
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {userRoleName !== role.STUDENT && (
                  <TableHead>Requester</TableHead>
                )}
                {userRoleName === role.STUDENT && (
                  <TableHead>Reviewer</TableHead>
                )}
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Requested</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updateRequestsList.slice(0, 5).map((request) => (
                <TableRow key={request._id}>
                  {userRoleName !== role.STUDENT && (
                    <TableCell>
                      {!request.requesterProfile?.firstName && "-"}
                      {request.requesterProfile?.firstName}{" "}
                      {request.requesterProfile?.lastName}
                    </TableCell>
                  )}
                  {userRoleName === role.STUDENT && (
                    <TableCell>
                      {!request.reviewerProfile?.firstName && "-"}
                      {request.reviewerProfile?.firstName}{" "}
                      {request.reviewerProfile?.lastName}
                    </TableCell>
                  )}
                  <TableCell>
                    <UpdateRequestType contentType={request.contentType} />
                  </TableCell>
                  <TableCell>
                    <UpdateRequestStatus status={request.reviewStatus} />
                  </TableCell>
                  <TableCell>{toDateNumeric(request.requestedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateRequestsCard;
