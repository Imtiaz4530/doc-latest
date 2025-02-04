import { body } from "express-validator";

export const createDoctorValidation = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("specialization")
    .isString()
    .notEmpty()
    .withMessage("Specialization is required"),
  body("availability").isArray().withMessage("Availability must be an array"),
];
