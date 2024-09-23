import fs from "fs";
import { ulid } from "ulid";
import { Request, Response } from "express";

import MenuModel from "../../models/MenuModel";

import responseHelper from "../../libs/helpers/responseHelper";
import ImageModel from "../../models/ImageModel";

interface CreateMenuPayload {
  name?: string;
  description?: string;
  basePrice?: number;
}

const createMenu = async (req: Request, res: Response) => {
  try {
    const payload: CreateMenuPayload = req.body;
    const file = req.file;

    // Validation logic start here
    const validationErrors: Partial<Record<keyof CreateMenuPayload | "image", string>> = {};

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        validationErrors.image = `field "image" size must be less than 5MB`;
      }

      if (!file.mimetype.startsWith("image/")) {
        validationErrors.image = `field "image" must be an image`;
      }
    }

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

    let menuImage = null;

    if (file) {
      const fileExtension = file.mimetype.split("/")[1];
      const filename = `${ulid()}.${fileExtension}`;
      const directoryPath = "/images";

      menuImage = await ImageModel.create({
        url: `${directoryPath}/${filename}`,
      });

      fs.writeFileSync(`./public${directoryPath}/${filename}`, file.buffer);
    }

    const menu = await MenuModel.create({
      name: payload.name,
      basePrice: payload.basePrice,
      image: menuImage?.id,
    });

    return responseHelper.returnOkResponse(res, "Menu created successfuly", menu);
  } catch (error) {
    return responseHelper.throwInternalError(res, error);
  }
};

export default createMenu;
