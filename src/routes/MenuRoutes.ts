import { Router } from "express";
import multer from "multer";

import { getAllMenu, getSingleMenu } from "../controllers/menu/getMenu";
import createMenu from "../controllers/menu/createMenu";
import deleteMenu from "../controllers/menu/deleteMenu";
import updateMenu from "../controllers/menu/updateMenu";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllMenu);
router.get("/:menuId", getSingleMenu);
router.post("/", upload.single("image"), createMenu);
router.put("/:menuId", upload.single("image"), updateMenu);
router.delete("/:menuId", deleteMenu);

export default router;
