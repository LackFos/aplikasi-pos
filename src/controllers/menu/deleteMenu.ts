import fs from "fs";
import { Request, Response } from "express";

import MenuModel from "../../models/MenuModel";

import responseHelper from "../../libs/helpers/responseHelper";
import { ImageDocument } from "../../interfaces/image";
import ImageModel from "../../models/ImageModel";

const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;

    const deletedMenu = await MenuModel.findByIdAndDelete(menuId).populate<{ image: ImageDocument }>("image");

    if (!deletedMenu) {
      return responseHelper.throwNotFound(res, "Menu not found");
    }

    // Delete image if exists
    if (deletedMenu.image) {
      if (fs.existsSync(`./public${deletedMenu.image.url}`)) {
        fs.unlinkSync(`./public${deletedMenu.image.url}`);
      }

      await ImageModel.findByIdAndDelete(deletedMenu.image.id);
    }

    return responseHelper.returnOkResponse(res, "Menu deleted successfuly", deletedMenu);
  } catch (error) {
    return responseHelper.throwInternalError(res, error);
  }
};

export default deleteMenu;
