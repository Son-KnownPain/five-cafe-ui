import { object, string, number } from 'yup';

export const createProCateValidationScheme = object({
    name: string().required('Tên danh mục là bắt buộc'),
    description: string().required('Mô tả là bắt buộc'),
})

export const updateProCateValidationScheme = object({
    productCategoryID: number().required('ID là bắt buộc'),
    name: string().required('Tên danh mục là bắt buộc'),
    description: string().required('Mô tả là bắt buộc'),
})

export const createMatCateValidationScheme = object({
    name: string().required('Tên danh mục là bắt buộc'),
    description: string().required('Mô tả là bắt buộc'),
})

export const updateMatCateValidationScheme = object({
    materialCategoryID: number().required('ID là bắt buộc'),
    name: string().required('Tên danh mục là bắt buộc'),
    description: string().required('Mô tả là bắt buộc'),
})