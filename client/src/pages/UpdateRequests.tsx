import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { format } from "date-fns";
import { Link } from "react-router";
import { IUserProfile } from "@/hooks/useUserProfile";
import { routePaths } from "@/routes";

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

  const renderStatus = (status: IUpdateRequest["reviewStatus"]) => {
    switch (status) {
      case 2:
        return <span className="text-green-500">Approved</span>;
      case 3:
        return <span className="text-red-500">Rejected</span>;
      default:
        return <span className="text-yellow-500">Pending</span>;
    }
  };

  const renderDate = (date?: Date) => {
    if (!date) return "";

    return format(new Date(date), "yyyy-MM-dd");
  };

  const renderChangesCount = (changes: IUpdateRequest["content"]) => {
    let changesCount = 0;

    // Helper function to recursively check for changes in nested objects
    const compareValues = (
      prevValue: IUpdateRequest,
      currentValue: IUserProfile
    ): boolean => {
      if (
        typeof prevValue === "object" &&
        prevValue !== null &&
        typeof currentValue === "object" &&
        currentValue !== null
      ) {
        // If both are objects, recursively compare their properties
        return (
          renderChangesCount({
            previous: prevValue,
            current: currentValue,
          }) > 0
        ); // Return true if there are changes in the nested object
      }
      return prevValue !== currentValue; // Direct comparison for primitive values
    };

    Object.entries(changes.previous).forEach(([key, value]) => {
      const changedValue = changes.current[key as keyof IUserProfile];

      if (compareValues(value, changedValue)) {
        changesCount++;
      }
    });

    return changesCount;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Input
              placeholder="Search by requester, reviewer, or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/3 mr-4"
            />
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reviewer</TableHead>
                <TableHead>Update Type</TableHead>
                <TableHead>Updates Count</TableHead>
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
                    {request.contentType === "userProfileContent"
                      ? "Personal Profile"
                      : "Academic Profile"}
                  </TableCell>
                  <TableCell>{renderChangesCount(request.content)}</TableCell>
                  <TableCell>{renderStatus(request.reviewStatus)}</TableCell>
                  <TableCell>{renderDate(request.requestedAt)}</TableCell>
                  <TableCell>{renderDate(request.reviewedAt)}</TableCell>
                  <TableCell>
                    <Link
                      to={`${routePaths.updateRequests.path}/${request._id}`}
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ShadCN Pagination */}
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateRequests;
