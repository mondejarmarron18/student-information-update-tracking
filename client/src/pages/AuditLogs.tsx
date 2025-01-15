import { ChangeEvent, useEffect, useState } from "react";
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
import useExportAuditLogs from "@/hooks/useExportAuditLogs";
import AnimatedSpinner from "@/components/common/AnimatedSpinner";
import FileSaver from "file-saver";

const AuditLogTable = () => {
  const { data } = useAuditLogs();
  const exportAuditLogs = useExportAuditLogs();
  const auditLogsCSV = exportAuditLogs?.data?.data;
  const auditLogs = data?.data || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const totalPages = Math.ceil(auditLogs.length / pageSize);

  // Filter and paginate data based on search query and current page
  const filteredLogs = auditLogs.filter(
    (log) =>
      log.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    if (auditLogsCSV) {
      const blob = new Blob([auditLogsCSV], { type: "text/csv" });

      FileSaver.saveAs(blob, "audit_logs.csv");
    }
  }, [auditLogsCSV]);

  const handleExportAuditLogs = () => {
    exportAuditLogs.mutate();
  };

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
        <Button onClick={handleExportAuditLogs}>
          {exportAuditLogs.isPending ? (
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
              <TableHead>Action</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>User Agent</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.userId}</TableCell>
                <TableCell>
                  {toDateTimeNumeric(new Date(log.timestamp))}
                </TableCell>
                <TableCell>{log.userAgent}</TableCell>
                <TableCell>{log.ipAddress}</TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
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
