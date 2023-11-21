import { get, post, put, remove } from '~/util/fiveCafeHttpRequest'

export const allEmps = async () => {
    return await get("api/employee/all")
}
export const createEmp = async (data) => {
    return await post("api/employee/store", data)
}
export const updateEmp = async (data) => {
    return await put("api/employee/update", data)
}
export const deleteEmps = async (ids) => {
    return await remove(`api/employee/delete?ids=${ids.join(',')}`)
}