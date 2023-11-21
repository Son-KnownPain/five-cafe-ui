import { roleSchemeValidation } from "./roleValidation";
import { createEmpValidationScheme, updateEmpValidationScheme } from "./empValidation";
import cateSchemes from "./categoriesValidation";

const validations = {
    roleSchemeValidation,
    createEmpValidationScheme,
    updateEmpValidationScheme,
    ...cateSchemes,
};

export default validations;