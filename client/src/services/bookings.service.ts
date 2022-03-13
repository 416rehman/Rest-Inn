import {apiURL, securedGET} from "./helper.service";

const getBookings = (query?:any) => {
    return new Promise<any>((resolve, reject) => {
        securedGET(apiURL('/bookings', query||'')).then((res: any) => {
            if (res.data.data) {
                resolve(res.data.data);
            } else {
                reject(res.data.error || res.data.message);
            }
        }).catch((err: any) => {
            reject(err);
        });
    });
};

export {
    getBookings
};