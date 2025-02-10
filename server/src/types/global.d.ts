import { AuditLog } from "../domains/auditLog/auditLogModel";
import { IRole } from "../domains/role/roleModel";
import { IUser } from "../domains/user/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<IUser, "password"> & {
        roleId: IRole;
      };
      auditLog?: Pick<
        AuditLog,
        "userAgent" | "ipAddress" | "requestedUrl" | "requestedFilter"
      >;
    }
  }
}
