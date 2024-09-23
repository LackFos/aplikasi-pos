import fs from "fs";
import { ulid } from "ulid";
import { Request, Response } from "express";

import MenuModel from "../../models/MenuModel";
import ImageModel from "../../models/ImageModel";

import { ImageDocument } from "../../interfaces/image";
import responseHelper from "../../libs/helpers/responseHelper";

interface UpdateMenuPayload {
  name?: string;
  description?: string;
  basePrice?: number;
}

const updateMenu = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;
    const payload: UpdateMenuPayload = req.body;
    const file = req.file;

    // Validation logic start here
    const validationErrors: Partial<Record<keyof UpdateMenuPayload | "image", string>> = {};

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        validationErrors.image = `field "image" size must be less than 5MB`;
      }

      if (!file.mimetype.startsWith("image/")) {
        validationErrors.image = `field "image" must be an image`;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      return responseHelper.throwBadRequest(res, "Invalid request body", validationErrors);
    }
    // Validation logic end here

    const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, payload, { new: true }).populate<{ image: ImageDocument }>("image");

    if (!updatedMenu) {
      return responseHelper.throwNotFound(res, "Menu not found");
    }

    if (file) {
      const fileExtension = file.mimetype.split("/")[1];
      const filename = `${ulid()}.${fileExtension}`;
      const directoryPath = "/images";

      fs.writeFileSync(`./public${directoryPath}/${filename}`, file.buffer);

      if (updatedMenu.image) {
        // Delete old image
        if (fs.existsSync(`./public${updatedMenu.image.url}`)) {
          fs.unlinkSync(`./public${updatedMenu.image.url}`);
        }

        await ImageModel.findByIdAndUpdate(updatedMenu.image.id, { url: `${directoryPath}/${filename}` });
      } else {
        const newImage = await ImageModel.create({ url: `${directoryPath}/${filename}` });
        updatedMenu.image = newImage.id;
        await updatedMenu.save();
      }
    }

    return responseHelper.returnOkResponse(res, "Menu updated successfuly", updatedMenu);
  } catch (error) {
    return responseHelper.throwInternalError(res, error);
  }
};

export default updateMenu;
