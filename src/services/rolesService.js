import { get, post, put, remove } from '~/util/fiveCafeHttpRequest'

export const allRoles = async () => {
    return await get("api/role/all")
}

export const createRole = async (data) => {
    return await post("api/role/store", data)
}

export const updateRole = async (data) => {
    return await put("api/role/update", data)
}

export const deleteRoles = async (ids) => {
    return await remove(`api/role/delete?ids=${ids.join(',')}`)
}