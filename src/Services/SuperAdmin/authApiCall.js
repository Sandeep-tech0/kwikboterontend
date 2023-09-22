import { apiRequest } from "../../Services/Admin/apiRequest";


export const superAdminlogin = async (post) => {

    const api = await apiRequest({
        url: "/auth/superAdmin/login",
        method: "post",
        body: post,
    });
    console.log({ api })
    return api.data;
};