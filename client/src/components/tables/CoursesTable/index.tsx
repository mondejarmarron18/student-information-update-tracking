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
import useCourses from "@/hooks/useCourses";
import { Button } from "@/components/ui/button";
import CourseDialog from "@/components/common/CourseDialog";
import { routePaths } from "@/routes";
import { useNavigate } from "react-router";
import PopupMenu from "@/components/common/PopupMenu";
import DeleteConfirmationDialog from "@/components/common/DeleteConfimationDialog";
import useDeleteCourse from "@/hooks/useDeleteCourse";

const CoursesTable = () => {
  const navigate = useNavigate();
  const courses = useCourses();
  const coursesList = courses.data?.data || [];
  const deleteCourse = useDeleteCourse();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const totalPages = Math.ceil(coursesList.length / pageSize);

  const filteredCourses = coursesList?.filter((course) => {
    const fieldsToSearch = [
      course.name,
      course.creatorProfile?.firstName,
      course.creatorProfile?.lastName,
    ];
    return fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentCourses = filteredCourses.slice(
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
          placeholder="Search by course name or creator name"
          value={searchQuery}
          onChange={handlerSeacrhQuery}
          className="w-1/3 mr-4"
        />
        <CourseDialog trigger={<Button>Add Course</Button>} />
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Specializations</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Date Updated</TableHead>
              <TableHead className="w-0"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.studentsCount}</TableCell>
                  <TableCell>{course.specializationsCount}</TableCell>
                  <TableCell>
                    {!course.creatorProfile
                      ? "-"
                      : `${course.creatorProfile?.firstName} 
                    ${course.creatorProfile?.lastName}`}
                  </TableCell>
                  <TableCell>{toDateTimeNumeric(course.updatedAt)}</TableCell>
                  <TableCell>
                    <PopupMenu
                      items={[
                        {
                          label: "View",
                          onClick: () => {
                            navigate(
                              routePaths.course.path.replace(
                                ":courseId",
                                course._id
                              )
                            );
                          },
                        },
                        {
                          label: "Specializations",
                          onClick: () =>
                            navigate(
                              routePaths.specializations.path.replace(
                                ":courseId",
                                course._id
                              )
                            ),
                        },
                        <CourseDialog
                          courseId={course._id}
                          trigger={
                            <Button
                              variant={"ghost"}
                              className="rounded-none w-full justify-start"
                            >
                              Update
                            </Button>
                          }
                        />,
                        <DeleteConfirmationDialog
                          title="Delete Course"
                          isCompleted={deleteCourse.isSuccess}
                          isLoading={deleteCourse.isPending}
                          onConfirm={() => deleteCourse.mutate(course._id)}
                          trigger={
                            <Button
                              variant={"ghost"}
                              className="rounded-none w-full justify-start"
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
                  colSpan={6}
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

export default CoursesTable;
