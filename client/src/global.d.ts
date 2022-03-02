declare global {
    var api:string
    function apiURL(path:string, query?:string):string

    interface ListingPartial {
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

    interface Listing extends ListingPartial {
        bestSeller: true;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        location: {
            unit: string,
            street: string,
            city: string,
            province: string,
            country: string,
            _id: string,
        };
        rules: string[];
    }
}

export {}