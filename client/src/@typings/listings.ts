interface ListingPartial {
    type: string
    title: string;
    rating: {
        average: number,
        count: number
    };
    photos: string[];
    price: number;
    bedrooms: number;
    beds: number;
    amenities: string[];
    guests: number;
    baths: number;
    listingType: 'entire place' | 'hotel room' | 'private room' | 'shared room';
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

interface ReservedDates {
    [year: string]: {
        [month: string]: Date[];
    }
}

export type {
    ListingPartial,
    Listing,
    ReservedDates
}