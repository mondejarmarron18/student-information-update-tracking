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
import useUserAccounts from "@/hooks/useUserAccounts";
import _ from "lodash";
import { routePaths } from "@/routes";
import { Link } from "react-router";
import UserAccountDialog from "@/components/common/UserAccountDialog";

const UserAccountsTable = () => {
  const userAccounts = useUserAccounts();
  const userAccountsData = userAccounts.data?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const totalPages = Math.ceil(userAccountsData.length / pageSize);

  const filteredUserAccounts = userAccountsData?.filter((uc) => {
    const fieldsToSearch = [
      uc.email,
      uc.profile?.firstName,
      uc.profile?.middleName,
      uc.profile?.lastName,
      uc.role?.name,
    ];
    return fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentUserAccounts = filteredUserAccounts.slice(
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
          placeholder="Search by name, email, role"
          value={searchQuery}
          onChange={handlerSeacrhQuery}
          className="w-1/3 mr-4"
        />
        <UserAccountDialog trigger={<Button>Create User Account</Button>} />
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUserAccounts.length > 0 ? (
              currentUserAccounts.map((useAccount) => (
                <TableRow key={useAccount._id}>
                  <TableCell>
                    {!useAccount.profile
                      ? "-"
                      : `${useAccount.profile.firstName} ${useAccount.profile.middleName} ${useAccount.profile.lastName}`}
                  </TableCell>
                  <TableCell>{useAccount.email}</TableCell>
                  <TableCell>
                    {useAccount.role?.name
                      ? _.startCase(_.toLower(useAccount.role.name))
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {toDateTimeNumeric(useAccount.createdAt)}
                  </TableCell>
                  <TableCell>
                    {useAccount.verifiedAt
                      ? toDateTimeNumeric(useAccount.verifiedAt)
                      : "Unverified"}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`${routePaths.userAccounts.path}/${useAccount._id}`}
                      className="text-primary"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-gray-500"
                >
                  No user accounts found.
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

export default UserAccountsTable;
