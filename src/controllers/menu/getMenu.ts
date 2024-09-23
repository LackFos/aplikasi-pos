import { Request, Response } from "express";

import MenuModel from "../../models/MenuModel";

import responseHelper from "../../libs/helpers/responseHelper";
import { ImageDocument } from "../../interfaces/image";

export const getAllMenu = async (req: Request, res: Response) => {
  try {
    const menus = await MenuModel.find();

    const hasMenus = menus.length > 0;

    const message = hasMenus ? "Menu found" : "Menu not found";

    return responseHelper.returnOkResponse(res, message, menus);
  } catch (error) {
    return responseHelper.throwInternalError(res);
  }
};

export const getSingleMenu = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;

    const menu = await MenuModel.findById(menuId)
      .populate<{ image: ImageDocument }>({
        path: "image",
        select: "url",
      })
      .select("-__v -createdAt -updatedAt");

    if (!menu) {
      return responseHelper.throwNotFound(res, "Menu not found");
    }

    return responseHelper.returnOkResponse(res, "Menu found", menu);
  } catch (error) {
    return responseHelper.throwInternalError(res, error);
  }
};
