"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredFields = void 0;
function validateRequiredFields(req, res, next) {
    const { name, phone, reg, email, department, year, user_event } = req.body;
    // Define the list of required fields
    const requiredFields = [
        "name",
        "phone",
        "reg",
        "email",
        "department",
        "year",
        // "user_club",
        "user_event",
    ];
    // Check if any required field is missing or empty
    const missingOrEmptyFields = requiredFields.filter((field) => {
        const fieldValue = req.body[field];
        return ((typeof fieldValue !== "string" || fieldValue.trim() === "") &&
            isNaN(fieldValue));
    });
    if (missingOrEmptyFields.length > 0) {
        return res.status(400).json({
            message: `Missing or empty required fields`,
            missing: missingOrEmptyFields.join(", "),
        });
    }
    // Check registration number pattern
    if (!/^RA23\d{11}$/.test(reg)) {
        return res.status(400).json({
            message: "Event is only for first year students, Check Reg.No and resubmit !",
        });
    }
    // Check email pattern
    if (!/^[a-zA-Z0-9]+@srmist\.edu\.in$/.test(email)) {
        return res.status(400).json({
            message: "Event is only for SRM Students, Check Mail.id and resubmit !",
        });
    }
    // If all required fields are present and not empty, continue to the next middleware or route handler
    next();
}
exports.validateRequiredFields = validateRequiredFields;
