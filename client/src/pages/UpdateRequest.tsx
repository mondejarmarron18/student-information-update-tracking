import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // ShadCN Pagination components

// Sample Data for Update Requests
const updateRequests = [
  {
    id: 1,
    requester: "John Doe",
    reviewer: "Jane Smith",
    status: "Pending",
    contentType: "userProfileContent",
    requestedAt: "2025-01-08 10:00 AM",
    reviewedAt: "",
    fieldsChanged: 4,
  },
  {
    id: 2,
    requester: "Alice Johnson",
    reviewer: "Bob Brown",
    status: "Approved",
    contentType: "acadProfileContent",
    requestedAt: "2025-01-05 11:30 AM",
    reviewedAt: "2025-01-06 09:00 AM",
    fieldsChanged: 3,
  },
  {
    id: 3,
    requester: "Robert Lee",
    reviewer: "Emily White",
    status: "Rejected",
    contentType: "userProfileContent",
    requestedAt: "2025-01-02 08:15 AM",
    reviewedAt: "2025-01-02 10:00 AM",
    fieldsChanged: 2,
  },
  // Additional mock data can be added here for pagination
];

const UpdateRequest = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set how many items you want to display per page

  // Filter the data based on search query
  const filteredRequests = updateRequests.filter((request) => {
    return (
      request.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        <CardHeader>
          <CardTitle>Recent Update Requests</CardTitle>
        </CardHeader>
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
                <TableHead>Requester</TableHead>
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
                  <TableCell>{request.requester}</TableCell>
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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              </PaginationItem>

              {/* Render page numbers */}
              {[...Array(totalPages)].map((_, index) => (
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
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateRequest;
