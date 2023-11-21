import { object, string } from 'yup';

export const createEmpValidationScheme = object({
    roleID: string().required('Vui lòng chọn chức vụ'),
    name: string().required('Tên nhân viên là bắt buộc'),
    phone: string().required('Số điện thoại là bắt buộc').matches(/^[0-9]{10}$/, 'Số điện thoại bao gồm 10 số'),
    username: string().required('Username là bắt buộc').matches(/^[a-z0-9]+$/, 'Username chỉ bao gồm a-z và số'),
    password: string().required('Mật khẩu là bắt buộc').min(8, "Ít nhất 8 ký tự").max(100, "Tối đa 100 ký tự"),
})
export const updateEmpValidationScheme = object({
    roleID: string().required('Vui lòng chọn chức vụ'),
    name: string().required('Tên nhân viên là bắt buộc'),
    phone: string().required('Số điện thoại là bắt buộc').matches(/^[0-9]{10}$/, 'Số điện thoại bao gồm 10 số'),
    username: string().required('Username là bắt buộc').matches(/^[a-z0-9]+$/, 'Username chỉ bao gồm a-z và số'),
    password: string(),
})