import { x8tAsync } from "x8t";
import RoleService from "../roleService";
import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { convertToObjectId } from "../../../utils/mongooseUtil";

export default class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  createRole = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(
      this.roleService.createRole(req.body)
    );

    if (error !== null || result === null) {
      console.error("Error creating role:", error);

      if (error instanceof MongooseError) {
        res.status(400).send({ error: error.message });
        return;
      }

      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(201).send({ data: result });
  };

  updateRole = async (req: Request, res: Response) => {
    const { id, error: idError } = convertToObjectId(req.params.id);

    if (idError !== null) {
      res.status(400).send({ error: "Invalid Role ID" });
      return;
    }

    const { result, error } = await x8tAsync(
      this.roleService.updateRole(id, req.body)
    );

    if (error !== null || result === null) {
      console.error("Error updating role:", error);
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(201).send({ data: result });
  };

  deleteRole = async (req: Request, res: Response) => {
    const { id, error: idError } = convertToObjectId(req.params.id);

    if (idError !== null) {
      res.status(400).send({ error: "Invalid Role ID" });
      return;
    }

    const { result, error } = await x8tAsync(this.roleService.deleteRole(id));

    if (error !== null || result === null) {
      console.error("Error deleting role:", error);
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(201).send({ data: result });
  };

  getRoles = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(this.roleService.getRoles());

    if (error !== null || result === null) {
      console.error("Error getting roles:", error);
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(201).send({ data: result });
  };

  getRoleById = async (req: Request, res: Response) => {
    const { id, error: idError } = convertToObjectId(req.params.id);

    if (idError !== null) {
      res.status(400).send({ error: "Invalid Role ID" });
      return;
    }

    const { result, error } = await x8tAsync(this.roleService.getRoleById(id));

    if (error !== null || result === null) {
      console.error("Error getting role:", error);
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(201).send({ data: result });
  };
}
