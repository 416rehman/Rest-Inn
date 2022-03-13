import axios from "axios";
import {apiURL, securedDELETE} from "./helper.service";
import store from "../redux/store";
import {Listing, ReservedDates} from "../@typings/listings";

function getReservedDates(listingId: string): Promise<ReservedDates>{
    return new Promise<ReservedDates>((resolve, reject) => {
        axios.get(apiURL(`/properties/${listingId}/reserved-dates`))
            .then(res => {
                resolve(res.data.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

const getListingById = (listingId: string): Promise<Listing> => {
    return new Promise<Listing>((resolve, reject) => {
        if (!listingId) {
            reject("No listing id provided");
        }
        axios.get(apiURL(`/properties/${listingId}`))
            .then(res => {
                resolve(res.data.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const getLocations = () => {
    return new Promise<any[]>((resolve, reject) => {
        axios.get(apiURL('/properties/locations', )).then(res => {
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

const deleteListing = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        securedDELETE(apiURL(`/properties/${id}`)).then(res => {
            resolve(res.data);
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
    getLocations().then((data) => {
        store.dispatch({type: "SET_LOCATIONS", payload: data})
    });
}

export {refreshMetaData, getAllListings, getBestSellingListings, getReservedDates, getListingById, deleteListing};