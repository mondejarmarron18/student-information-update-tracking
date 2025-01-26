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
import useYearLevels from "@/hooks/useYearLevels";
import PopupMenu from "@/components/common/PopupMenu";
import YearLevelDialog from "@/components/common/YearLevelDialog";

const YearLevelsTable = () => {
  const yearLevels = useYearLevels();
  const yearLevelsList = yearLevels.data?.data || [];

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set how many items you want to display per page

  const totalPages = Math.ceil(yearLevelsList.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-8 mt-4 p-1">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by requester, reviewer, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 mr-4"
        />
        <YearLevelDialog trigger={<Button>Add Year Level</Button>} />
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Updated By</TableHead>
              <TableHead>Date Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {yearLevelsList.length > 0 ? (
              yearLevelsList.map((yearLevel) => (
                <TableRow key={yearLevel._id}>
                  <TableCell>{yearLevel.name}</TableCell>
                  <TableCell>{yearLevel.studentsCount}</TableCell>
                  <TableCell>{yearLevel.description}</TableCell>
                  <TableCell>
                    {yearLevel.updaterProfile?.firstName}{" "}
                    {yearLevel.updaterProfile?.lastName}
                  </TableCell>
                  <TableCell>
                    {toDateTimeNumeric(yearLevel.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <PopupMenu
                      items={[
                        <YearLevelDialog
                          trigger={
                            <Button
                              variant={"ghost"}
                              className="w-full rounded-none"
                            >
                              Edit
                            </Button>
                          }
                          yearLevelId={yearLevel._id}
                        />,
                        {
                          label: "Delete",
                          onClick: () => {
                            // Handle delete action
                          },
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-gray-500"
                >
                  No year levels found.
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

export default YearLevelsTable;
