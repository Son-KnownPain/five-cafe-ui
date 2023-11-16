import { get, post } from '~/util/fiveCafeHttpRequest'

export const allRoles = async () => {
    return await get("api/role/all")
}

export const createRole = async (data) => {
    return await post("api/role/store", data)
}