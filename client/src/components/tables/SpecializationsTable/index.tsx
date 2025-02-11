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
import useSpecializations from "@/hooks/useSpecializations";
import SpecializationDialog from "@/components/common/SpecializationDialog";
import { routePaths } from "@/routes";
import { useNavigate, useParams } from "react-router";
import PopupMenu from "@/components/common/PopupMenu";
import DeleteConfirmationDialog from "@/components/common/DeleteConfimationDialog";
import useDeleteSpecialization from "@/hooks/useDeleteSpecialization";

const SpecializationsTable = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const specilizations = useSpecializations({
    courseId,
  });
  const specilizationsList = specilizations.data?.data || [];
  const deleteSpecialization = useDeleteSpecialization();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const totalPages = Math.ceil(specilizationsList.length / pageSize);

  const filteredSpecializations = specilizationsList?.filter((yl) => {
    const fieldsToSearch = [
      yl.name,
      yl.creatorProfile?.firstName,
      yl.creatorProfile?.lastName,
    ];
    return fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentSpecializations = filteredSpecializations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlerSeacrhQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const viewSpecialization = (data: {
    specializationId: string;
    courseId: string;
  }) => {
    const specializationPath = routePaths.specialization.path
      .replace(":specializationId", data.specializationId)
      .replace(":courseId", data.courseId);

    navigate(specializationPath);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by specialization name, creator name"
          value={searchQuery}
          onChange={handlerSeacrhQuery}
          className="w-1/3 mr-4"
        />
        <SpecializationDialog
          courseId={courseId}
          trigger={<Button>Add Specialization</Button>}
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              {!courseId && <TableHead>Course</TableHead>}
              <TableHead>Name</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Date Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSpecializations.length > 0 ? (
              currentSpecializations.map((specialization) => (
                <TableRow key={specialization._id}>
                  {!courseId && (
                    <TableCell>{specialization.course?.name}</TableCell>
                  )}
                  <TableCell>{specialization.name}</TableCell>
                  <TableCell>{specialization.studentsCount}</TableCell>
                  <TableCell>
                    {specialization.creatorProfile?.firstName || "-"}{" "}
                    {specialization.creatorProfile?.lastName}
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
                            viewSpecialization({
                              specializationId: specialization._id,
                              courseId: specialization.courseId,
                            }),
                        },
                        <SpecializationDialog
                          specializationId={specialization._id}
                          courseId={specialization.courseId}
                          trigger={
                            <Button
                              variant={"ghost"}
                              className="w-full rounded-none justify-start"
                            >
                              Update
                            </Button>
                          }
                        />,
                        <DeleteConfirmationDialog
                          isCompleted={deleteSpecialization.isSuccess}
                          title="Delete Specialization"
                          onConfirm={() =>
                            deleteSpecialization.mutate(specialization._id)
                          }
                          trigger={
                            <Button
                              variant={"ghost"}
                              className="w-full rounded-none justify-start"
                            >
                              Delete
                            </Button>
                          }
                        />,
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
