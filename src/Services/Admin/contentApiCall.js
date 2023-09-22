import { apiRequest } from "./apiRequest";

export const addContentapi = async ({addContent}) => {
    const api = await apiRequest({
        url: `/contents`,
        method: "post",
        body: addContent,
        header: true,
    });
    return api;
}

export const getContent = async (userId) => {
    const api = await apiRequest({
        url: `/contents?userId=${userId}`,
        method: "get",
        header: true,
    });
    return api;
}

export const UpdateContent = async ({contentId ,updateContent}) => {
    const api = await apiRequest({
        url: `/contents/${contentId}`,
        method: "put",
        body: updateContent,
        header: true,
    });
    return api;
};
export const deleteContent = async (contentId) => {
    const api = await apiRequest({
        url: `/contents/${contentId}`,
        method: "delete",
        header: true,
    });
    return api;
}
