import { ErrorRequestHandler, Request, Response } from "express";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response
) => {
  // default error handleer
  const errorResponse = {
    message: "Something went wrong!",
    success: false,
    error: {},
  };

  // if its mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    errorResponse.message = "Validation failed";
    errorResponse.error = {
      name: err.name,
      errors: err.errors,
    };
  } else {
    // Any other type of error
    errorResponse.message = err.message || "Unknown error occurred";
    errorResponse.error = {
      name: err.name || "Error",
      ...err,
    };
  }
  res.status(404).json(errorResponse);
};

export default globalErrorHandler;
