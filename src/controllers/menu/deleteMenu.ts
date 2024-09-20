import { Request, Response } from "express";
import responseHelper from "../../libs/helpers/responseHelper";
import MenuModel from "../../models/MenuModel";

const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;

    const deletedMenu = await MenuModel.findByIdAndDelete(menuId);

    if (!deletedMenu) {
      return responseHelper.throwNotFound(res, "Menu not found");
    }

    return responseHelper.returnOkResponse(res, "Menu deleted successfuly", deletedMenu);
  } catch (error) {
    return responseHelper.throwInternalError(res, error);
  }
};

export default deleteMenu;
