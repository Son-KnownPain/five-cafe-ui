import { get, post, remove } from '~/util/fiveCafeHttpRequest'

export const allEmps = async () => {
    return await get("api/employee/all")
}
export const createEmp = async (body) => {
    const { image, ...data } = body;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("data", new Blob(
        [
            JSON.stringify(data)
        ],
        {
            type: "application/json"
        }
    ))
    const requestHeader = {
        method: "POST",
        credentials: "include",
    }
    return await post("api/employee/store", formData, requestHeader)
}
export const updateEmp = async (body) => {
    const { image, ...data } = body;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("data", new Blob(
        [
            JSON.stringify(data)
        ],
        {
            type: "application/json"
        }
    ))
    const requestHeader = {
        method: "POST",
        credentials: "include",
    }
    return await post("api/employee/update", formData, requestHeader)
}
export const deleteEmps = async (ids) => {
    return await remove(`api/employee/delete?ids=${ids.join(',')}`)
}