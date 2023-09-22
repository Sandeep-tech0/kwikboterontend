import { apiRequest } from "./apiRequest";

export const  sendotp = async (email) => {
    const api = await apiRequest({
        url: "/auth/reset/password",
        method: "post",
        body: email,
    });
    console.log({ api })
    return api.data;
};
  
 export const verifyotp = async (newData) => {
    const api = await apiRequest({
        url: "/auth/verify/otp",
        method: "post",
        body: newData,
    });
    console.log({ api })
    return api.data;
};

export const resetpassword = async (newData) => {
    const api = await apiRequest({
        url: "/auth/change/resetPassword",
        method: "post",
        body: newData,
    });
    console.log({ api })
    return api.data;
}
