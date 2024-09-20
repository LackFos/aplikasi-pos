import { Response } from "express";

export const STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const responseHelper = {
  returnOkResponse: (res: Response, message: string, payload?: any) => {
    return res.status(STATUS_CODE.OK).send({
      success: true,
      message: message,
      payload: payload,
    });
  },

  throwNotFound: (res: Response, message: string) => {
    return res.status(STATUS_CODE.NOT_FOUND).send({
      success: false,
      message: message,
    });
  },

  throwBadRequest: (res: Response, message: string, errors?: any) => {
    return res.status(STATUS_CODE.BAD_REQUEST).send({
      success: false,
      message: message,
      errors: errors,
    });
  },

  throwInternalError: (res: Response, error?: any) => {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Something went wrong, please try again",
      stack: error.stack,
    });
  },
};

export default responseHelper;
