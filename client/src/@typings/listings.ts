interface ListingPartial {
    type?: string
    title?: string;
    rating?: {
        average?: number,
        count?: number
    };
    host?: any;
    photos?: string[];
    price?: number;
    bedrooms?: number;
    beds?: number;
    amenities?: string[];
    guests?: number;
    baths?: number;
    listingType?: 'entire place' | 'hotel room' | 'private room' | 'shared room';
    _id?: string;
}

interface Listing extends ListingPartial {
    bestSeller?: true;
    createdAt?: Date;
    updatedAt?: Date;
    description?: string;
    location?: {
        unit?: string,
        street?: string,
        city?: string,
        province?: string,
        country?: string,
        _id?: string,
    };
    host?: {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        countryCode: string;
        id: string;
    }
    rules?: string[];
}

interface ListingFormData extends Listing {
    photosToAdd: File[] | undefined;
    photosToRemove: string[];
}

const EmptyListing: ListingFormData = {
    type: undefined,
    title: undefined,
    photos: undefined,
    price: 0,
    bedrooms: 0,
    baths: 0,
    description: undefined,
    amenities: [],
    location: {
        unit: undefined,
        street: undefined,
        city: undefined,
        province: undefined,
        country: undefined,
    },
    rules: [],
    beds: 1,
    guests: 1,
    listingType: undefined,
    photosToAdd: [],
    photosToRemove: [],
}


interface ReservedDates {
    [year: string]: {
        [month: string]: Date[];
    }
}

export {EmptyListing}
export type {
    ListingFormData,
    ListingPartial,
    Listing,
    ReservedDates,
}