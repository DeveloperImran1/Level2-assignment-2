"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const globalErrorHandler = (err, req, res, next) => {
    // default error handleer
    const errorResponse = {
        message: "Something went wrong!",
        success: false,
        error: {},
    };
    // if its mongoose validation error
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        errorResponse.message = "Validation failed";
        errorResponse.error = {
            name: err.name,
            errors: err.errors,
        };
    }
    else {
        // Any other type of error
        errorResponse.message = err.message || "Unknown error occurred";
        errorResponse.error = Object.assign({ name: err.name || "Error" }, err);
    }
    res.status(400).json(errorResponse);
};
exports.default = globalErrorHandler;
