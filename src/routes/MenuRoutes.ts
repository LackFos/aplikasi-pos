import { Router } from "express";

import { getAllMenu, getSingleMenu } from "../controllers/menu/getMenu";
import createMenu from "../controllers/menu/createMenu";
import deleteMenu from "../controllers/menu/deleteMenu";
import updateMenu from "../controllers/menu/updateMenu";

const router = Router();

router.get("/", getAllMenu);
router.get("/:menuId", getSingleMenu);
router.post("/", createMenu);
router.put("/:menuId", updateMenu);
router.delete("/:menuId", deleteMenu);

export default router;
