// import { NextFunction, Request, Response } from "express";
// import { IMiddleware } from "../types/middleware";

// const hasPermission = (permissions: string[]) => {
//     return (req: Request, res: Response, next:NextFunction) => {
//         if (req.user && req.user.permissions.some((permission) => permissions.includes(permission))) {
//             next();
//         } else {
//             next(new Error('Unauthorized'));
//         }
//     };
// }
