declare global {
    var api:string
    function apiURL(path:string, query?:string):string

    interface Listing {
        title: string;
        rating: number;
        photos: string[];
        price: number;
        bedrooms: number;
        beds: number;
        amenities: string[];
        baths: number;
        listingType: string;
        _id: string;
    }
}

export {}