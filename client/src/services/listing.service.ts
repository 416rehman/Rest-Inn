import axios from "axios";
import {apiURL} from "./helper.service";
import store from "../redux/store";
import {Listing} from "../@typings/listings";

const getPropertyTypes = () => {
    return new Promise<any[]>((resolve, reject) => {
        axios.get(apiURL('/properties/types', 'all=true')).then(res => {
            if (res.data?.data?.length > 0) {
                resolve([...res.data.data]);
            } else {
                reject(res.data);
            }
        }).catch(error => {
            reject(error);
        });
    });
};

const getListingTypes = () => {
    return new Promise<any[]>((resolve, reject) => {
        axios.get(apiURL('/properties/listing-types', 'all=true')).then(res => {
            if (res.data?.data?.length > 0) {
                resolve([...res.data.data]);
            } else {
                reject(res.data);
            }
        }).catch(error => {
            reject(error);
        });
    });
};

const getAmenities = () => {
    return new Promise<any[]>((resolve, reject) => {
        axios.get(apiURL('/properties/amenities')).then(res => {
            if (res.data?.data?.length > 0) {
                resolve([...res.data.data]);
            } else {
                reject(res.data);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

function getAllListings(query: any) {
    return new Promise<{ data: Listing[], pagination: any }>((resolve, reject) => {
        axios.get(apiURL('/properties', query)).then(res => {
            if (res.data?.data?.length > 0) resolve(res.data);
            else reject(res.data);
        }).catch(error => {
            reject(error);
        });
    });
}

function getBestSellingListings(limit: number) {
    return new Promise<Listing[]>((resolve, reject) => {
        axios.get(apiURL('/properties/bestselling', 'limit=' + limit)).then(res => {
            if (res.data?.data?.length > 0) resolve(res.data.data);
            else reject(res.data);
        }).catch(err => {
            reject(err);
        })
    });
}

function refreshMetaData() {
    getPropertyTypes().then((data) => {
        store.dispatch({type: "SET_TYPES", payload: data})
    });
    getListingTypes().then((data) => {
        store.dispatch({type: "SET_LISTING_TYPES", payload: data})
    });
    getAmenities().then((data) => {
        store.dispatch({type: "SET_AMENITIES", payload: data})
    });
}

export {refreshMetaData, getAllListings, getBestSellingListings};