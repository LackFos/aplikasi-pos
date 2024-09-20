import { Request, Response } from "express";
import responseHelper from "../../libs/helpers/responseHelper";
import MenuModel from "../../models/MenuModel";

interface UpdateMenuPayload {
  name?: string;
  description?: string;
  basePrice?: number;
}

const updateMenu = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;
    const payload: UpdateMenuPayload = req.body;

    const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, payload, { new: true });

    if (!updatedMenu) {
      return responseHelper.throwNotFound(res, "Menu not found");
    }

    return responseHelper.returnOkResponse(res, "Menu updated successfuly", updatedMenu);
  } catch (error) {
    return responseHelper.throwInternalError(res, error);
  }
};

export default updateMenu;
