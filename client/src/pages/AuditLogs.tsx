import AuditLogTable from "@/components/tables/AuditLogsTable";
import useExportAuditLogs from "@/hooks/useExportAuditLogs";
import FileSaver from "file-saver";
import { useEffect } from "react";

const AuditLogs = () => {
  const exportAuditLogs = useExportAuditLogs();
  const auditLogsCSV = exportAuditLogs?.data?.data;

  useEffect(() => {
    if (auditLogsCSV) {
      const blob = new Blob([auditLogsCSV], { type: "text/csv" });

      FileSaver.saveAs(blob, "audit_logs.csv");
    }
  }, [auditLogsCSV]);

  const handleExportAuditLogs = () => {
    exportAuditLogs.mutate();
  };

  return (
    <AuditLogTable
      onExport={handleExportAuditLogs}
      isExporting={exportAuditLogs.isPending}
    />
  );
};

export default AuditLogs;
