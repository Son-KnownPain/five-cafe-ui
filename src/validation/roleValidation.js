import { object, string } from 'yup';

export const roleSchemeValidation = object({
    roleID: string().required("Mã vai trò là bắt buộc"),
    roleName: string().required("Tên vai trò là bắt buộc"),
})
