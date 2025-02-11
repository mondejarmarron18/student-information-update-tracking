import { ChangeEvent, useState } from "react";
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
import DeleteConfirmationDialog from "@/components/common/DeleteConfimationDialog";
import useDeleteYearLevel from "@/hooks/useDeleteYearLevel";

const YearLevelsTable = () => {
  const yearLevels = useYearLevels();
  const yearLevelsList = yearLevels.data?.data || [];
  const deleteYearLevel = useDeleteYearLevel();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const totalPages = Math.ceil(yearLevelsList.length / pageSize);

  const filteredYearLevels = yearLevelsList?.filter((yl) => {
    const fieldsToSearch = [
      yl.name,
      yl.creatorProfile?.firstName,
      yl.creatorProfile?.lastName,
      yl.description,
    ];
    return fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentYearLevels = filteredYearLevels.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlerSeacrhQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by year level name, description, or creator name"
          value={searchQuery}
          onChange={handlerSeacrhQuery}
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
              <TableHead>Created By</TableHead>
              <TableHead>Date Updated</TableHead>
              <TableHead className="w-0"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentYearLevels.length > 0 ? (
              currentYearLevels.map((yearLevel) => (
                <TableRow key={yearLevel._id}>
                  <TableCell>{yearLevel.name}</TableCell>
                  <TableCell>{yearLevel.studentsCount}</TableCell>
                  <TableCell>{yearLevel.description}</TableCell>
                  <TableCell>
                    {yearLevel.creatorProfile?.firstName || "-"}{" "}
                    {yearLevel.creatorProfile?.lastName}
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
                              className="w-full justify-start rounded-none"
                            >
                              Update
                            </Button>
                          }
                          yearLevelId={yearLevel._id}
                        />,

                        <DeleteConfirmationDialog
                          isCompleted={yearLevels.isSuccess}
                          isLoading={deleteYearLevel.isPending}
                          onConfirm={() =>
                            deleteYearLevel.mutate(yearLevel._id)
                          }
                          trigger={
                            <Button
                              variant={"ghost"}
                              className="w-full justify-start rounded-none"
                            >
                              Delete
                            </Button>
                          }
                          title="Delete Year Level"
                        />,
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
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
