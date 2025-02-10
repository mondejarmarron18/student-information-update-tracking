import { ChangeEvent, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toDateTimeNumeric } from "@/utils/fomatter";
import { Button } from "@/components/ui/button";
import useAuditLogs from "@/hooks/useAuditLogs";
import AnimatedSpinner from "@/components/common/AnimatedSpinner";
import { Link } from "react-router";
import { routePaths } from "@/routes";

type Props = {
  onExport: () => void;
  isExporting?: boolean;
};

const AuditLogTable = ({ onExport, isExporting }: Props) => {
  const { data } = useAuditLogs();
  const auditLogs = data?.data || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const totalPages = Math.ceil(auditLogs.length / pageSize);

  // Filter and paginate data based on search query and current page
  const filteredLogs = auditLogs?.filter(
    (log) =>
      log.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlerSeacrhQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search by action or user..."
          value={searchQuery}
          onChange={handlerSeacrhQuery}
          className="w-1/3 mr-4"
        />
        <Button onClick={onExport}>
          {isExporting ? (
            <>
              <AnimatedSpinner /> Exporting...
            </>
          ) : (
            "Export Audit Logs"
          )}
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Entity</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLogs.length > 0 ? (
              currentLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {toDateTimeNumeric(new Date(log.timestamp))}
                  </TableCell>
                  <TableCell>{log.action.toUpperCase()}</TableCell>
                  <TableCell>{log.entity}</TableCell>
                  <TableCell>
                    {!log.userId ? (
                      "Unknown"
                    ) : (
                      <Link
                        to={routePaths.userAccount.path.replace(
                          ":userAccountId",
                          log.userId
                        )}
                        className="text-primary"
                      >
                        {log.userEmail}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>
                    <Link
                      to={routePaths.auditLog.path.replace(
                        ":auditLogId",
                        log._id
                      )}
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
                  No audit logs found.
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

export default AuditLogTable;
