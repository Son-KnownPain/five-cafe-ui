import { object, string } from 'yup';

export const roleSchemeValidation = object({
    roleID: string().required("Mã vai trò là bắt buộc").matches(/^[a-z-]+$/, 'Chỉ chấp nhận ký tự từ a-z và dấu gạch ngang.'),
    roleName: string().required("Tên vai trò là bắt buộc"),
})