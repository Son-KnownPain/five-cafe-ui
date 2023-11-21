import { get, post, put, remove } from '~/util/fiveCafeHttpRequest'

export const allProCate = async () => {
    return await get("api/pro-category/all")
}
export const createProCate = async (data) => {
    return await post("api/pro-category/store", data)
}
export const updateProCate = async (data) => {
    return await put("api/pro-category/update", data)
}
export const deleteProCates = async (ids) => {
    return await remove(`api/pro-category/delete?ids=${ids.join(',')}`)
}
// -------------------------------------
export const allMatCate = async () => {
    return await get("api/mat-category/all")
}
export const createMatCate = async (data) => {
    return await post("api/mat-category/store", data)
}
export const updateMatCate = async (data) => {
    return await put("api/mat-category/update", data)
}
export const deleteMatCates = async (ids) => {
    return await remove(`api/mat-category/delete?ids=${ids.join(',')}`)
}