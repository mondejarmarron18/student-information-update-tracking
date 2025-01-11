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
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";

const updateRequests: {
  id: string;
  reviewer: string;
  status: string;
  contentType: string;
  requestedAt: string;
  reviewedAt: string;
  fieldsChanged: number;
}[] = Array.from({ length: 100 }, () => {
  const status = faker.number.int({ min: 1, max: 3 });

  return {
    id: uuid(),
    reviewer: faker.person.fullName(),
    status: status === 1 ? "Pending" : status === 2 ? "Approved" : "Rejected",
    contentType: status === 3 ? "userProfileContent" : "acadProfileContent",
    requestedAt: faker.date.past().toLocaleDateString(),
    reviewedAt: status === 1 ? "" : faker.date.past().toLocaleDateString(),
    fieldsChanged: faker.number.int({ min: 1, max: 10 }),
  };
});

const UpdateRequest = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set how many items you want to display per page

  // Filter the data based on search query
  const filteredRequests = updateRequests.filter((request) => {
    return (
      request.reviewer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.contentType === "userProfileContent" &&
        "Personal Profile".includes(searchQuery)) ||
      (request.contentType === "acadProfileContent" &&
        "Academic Profile".includes(searchQuery))
    );
  });

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

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
                <TableHead>Status</TableHead>
                <TableHead>Content Type</TableHead>
                <TableHead>Fields Changed</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead>Reviewed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.reviewer || "Pending"}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.contentType === "userProfileContent"
                      ? "Personal Profile"
                      : "Academic Profile"}
                  </TableCell>
                  <TableCell>{request.fieldsChanged}</TableCell>
                  <TableCell>{request.requestedAt}</TableCell>
                  <TableCell>{request.reviewedAt || "Pending"}</TableCell>
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

export default UpdateRequest;
