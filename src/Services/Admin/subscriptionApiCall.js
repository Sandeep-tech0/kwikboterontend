import { apiRequest } from "./apiRequest";

export const invoicesdata = async (clientId) => {
    const api = await apiRequest({
        url: `/invoices?clientId=${clientId}`,
        method: "get",
        header: true,
    });
    return api.data;
}

export const cancelrenewalapi = async ({clientId,newdata}) => {
    const api = await apiRequest({
        url: `/subscription-plans/cancel/client?clientId=${clientId}`,
        method: "put",
        body: newdata,
        header: true,
    });
    return api.data;
}

export const mysubscribption = async (clientId) => {
    const api = await apiRequest({
        url: `/subscription-plans/client?clientId=${clientId}`,
        method: "get",
        header: true,
    });
    return api.data;
}


export const createOrder = async ( subId) => {
    const response = await apiRequest({
        url: `/payments/create-order`,
        method: "post",
        body: subId,
        header: true,
    });
    return response.data;
}



export const completeOrder = async ( order) => {
    const response = await apiRequest({
        url: `/payments/capture`,
        method: "post",
        body: order,
        header: true,
    });
    return response.data;
}


export const completeSubscription = async (subdata) => {
    const response = await apiRequest({
        url: `/pay-pal/complete-subscription`,
        method: "post",
        body: subdata,
        header: true,
      
    });
    return response.data;
}

export const createSubscription = async (clientId) => {
    const response = await apiRequest({
        url: `/pay-pal/paypal-action`,
        method: "post",
        body: clientId,
        header: true,
    });
    return response.data;
}
    
