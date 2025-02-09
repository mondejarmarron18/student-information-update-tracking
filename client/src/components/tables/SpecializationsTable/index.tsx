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
import { toDateTimeNumeric } from "@/utils/fomatter";
import { Button } from "@/components/ui/button";
import useSpecializations from "@/hooks/useSpecializations";
import SpecializationDialog from "@/components/common/SpecializationDialog";
import { routePaths } from "@/routes";
import { useNavigate, useParams } from "react-router";
import PopupMenu from "@/components/common/PopupMenu";

const SpecializationsTable = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const specilizations = useSpecializations({
    courseId,
  });
  const specilizationsList = specilizations.data?.data || [];
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set how many items you want to display per page

  const totalPages = Math.ceil(specilizationsList.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-8 mt-4 p-1">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by requester, reviewer, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 mr-4"
        />
        <SpecializationDialog trigger={<Button>Add Specialization</Button>} />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              {!courseId && <TableHead>Course</TableHead>}
              <TableHead>Name</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Updated By</TableHead>
              <TableHead>Date Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specilizationsList.length > 0 ? (
              specilizationsList.map((specialization) => (
                <TableRow key={specialization._id}>
                  {!courseId && (
                    <TableCell>{specialization.course?.name}</TableCell>
                  )}
                  <TableCell>{specialization.studentsCount}</TableCell>
                  <TableCell>{specialization.name}</TableCell>
                  <TableCell>
                    {specialization.updaterProfile?.firstName}{" "}
                    {specialization.updaterProfile?.lastName}
                  </TableCell>
                  <TableCell>
                    {toDateTimeNumeric(specialization.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <PopupMenu
                      items={[
                        {
                          label: "View",
                          onClick: () =>
                            navigate(
                              routePaths.specialization.path
                                .replace(
                                  ":specializationId",
                                  specialization._id
                                )
                                .replace(":courseId", courseId as string)
                            ),
                        },
                        {
                          label: "Edit",
                          onClick: () => {},
                        },
                        {
                          label: "Delete",
                          onClick: () => {},
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={!courseId ? 6 : 5}
                  className="h-24 text-center text-gray-500"
                >
                  No courses found.
                </TableCell>
              </TableRow>
            )}
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

export default SpecializationsTable;
