import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import useUpdateRequests from "@/hooks/useUpdateRequests";
import { IUpdateRequest } from "@/types/updateRequest.type";
import { Link } from "react-router";
import { routePaths } from "@/routes";
import { toDateTimeNumeric } from "@/utils/fomatter";
import UpdateRequestStatus from "@/components/common/UpdateRequestStatus";
import UpdateRequestType from "@/components/common/UpdateRequestType";

const UpdateRequests = () => {
  const { data } = useUpdateRequests();
  const updateRequests = data?.data || ([] as IUpdateRequest[]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set how many items you want to display per page

  // Filter the data based on search query

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = updateRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(updateRequests.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-8 mt-4 p-1">
      <div className="flex items-center">
        <Input
          placeholder="Search by requester, reviewer, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 mr-4"
        />
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reviewer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Date Reviewed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>
                  {request.reviewerProfile.firstName}{" "}
                  {request.reviewerProfile.lastName}
                </TableCell>
                <TableCell>
                  <UpdateRequestType contentType={request.contentType} />
                </TableCell>
                <TableCell>
                  <UpdateRequestStatus status={request.reviewStatus} />
                </TableCell>
                <TableCell>{toDateTimeNumeric(request.requestedAt)}</TableCell>
                <TableCell>
                  {toDateTimeNumeric(request.reviewedAt) || "-"}
                </TableCell>
                <TableCell>
                  <Link
                    to={routePaths.updateRequest.path.replace(
                      ":updateRequestId",
                      request._id
                    )}
                    className="hover:text-primary"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            />
          </PaginationItem>

          {/* Render page numbers */}
          {[...Array(totalPages).keys()].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UpdateRequests;
