import { Request, Response } from "express";
import responseHelper from "../../libs/helpers/responseHelper";
import MenuModel from "../../models/MenuModel";

interface CreateMenuPayload {
  name?: string;
  description?: string;
  basePrice?: number;
}

const createMenu = async (req: Request, res: Response) => {
  try {
    const payload: CreateMenuPayload = req.body;

    // Validation logic start here
    const validationErrors: Partial<Record<keyof CreateMenuPayload, string>> = {};

    if (!payload.name) {
      validationErrors.name = `field "name" is required`;
    }

    if (!payload.basePrice) {
      validationErrors.basePrice = `field "basePrice" is required`;
    }

    if (Object.keys(validationErrors).length > 0) {
      return responseHelper.throwBadRequest(res, "Invalid request body", validationErrors);
    }
    // Validation logic end here

    const menu = await MenuModel.create({
      name: payload.name,
      basePrice: payload.basePrice,
    });

    return responseHelper.returnOkResponse(res, "Menu created successfuly", menu);
  } catch (error) {
    return responseHelper.throwInternalError(res, error);
  }
};

export default createMenu;
