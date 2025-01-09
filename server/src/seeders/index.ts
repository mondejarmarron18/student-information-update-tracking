import { IControllerFunction } from "../types/controller";
import RoleSeeder from "./roleSeeder";

const seed:IControllerFunction = async (req, res) => {
    

  await RoleSeeder();

  console.log("Seeders completed");
};

export default seed;
