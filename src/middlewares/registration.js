"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredFields = void 0;
function validateRequiredFields(req, res, next) {
    const { name, phone, reg, email, department, year, user_club, user_event } = req.body;
    // Define the list of required fields
    const requiredFields = [
        "name",
        "phone",
        "reg",
        "email",
        "department",
        "year",
        "user_club",
        "user_event",
    ];
    // Check if any required field is missing or empty
    const missingOrEmptyFields = requiredFields.filter((field) => {
        const fieldValue = req.body[field];
        return ((typeof fieldValue !== "string" || fieldValue.trim() === "") &&
            isNaN(fieldValue));
    });
    if (missingOrEmptyFields.length > 0) {
        return res
            .status(400)
            .json({
            message: `Missing or empty required fields: ${missingOrEmptyFields.join(", ")}`,
        });
    }
    // If all required fields are present and not empty, continue to the next middleware or route handler
    next();
}
exports.validateRequiredFields = validateRequiredFields;
