import { apiRequest } from "./apiRequestSuperAdmin";


export const superAdminlogin = async (post) => {

    const api = await apiRequest({
        url: "/auth/superAdmin/login",
        method: "post",
        body: post,
    });
    console.log({ api })
    return api.data;
};