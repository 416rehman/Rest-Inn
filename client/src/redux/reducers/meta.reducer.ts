enum metaActionTypeEnum {
    SET_LISTING_TYPES = 'SET_LISTING_TYPES',
    SET_TYPES = 'SET_TYPES',
    SET_AMENITIES = 'SET_AMENITIES',
    SET_LOCATIONS = 'SET_LOCATIONS',
    CLEAR_LISTING_TYPES = 'CLEAR_LISTING_TYPES',
    CLEAR_TYPES = 'CLEAR_TYPES',
    CLEAR_AMENITIES = 'CLEAR_AMENITIES',
    CLEAR_LOCATIONS = 'CLEAR_LOCATIONS',
}

interface genericMetaItem {
    _id: string,
    count?: 0 | any,
}

interface Location {
    city?: string,
    province?: string,
    country?: string,
    startingFrom?: number,
}

interface LocationMetaItem extends genericMetaItem {
    count?: Location
}

interface metaAction {
    type: keyof typeof metaActionTypeEnum,
    payload: genericMetaItem[];
}

interface metaState {
    listingTypes: genericMetaItem[];
    types: genericMetaItem[];
    amenities: genericMetaItem[];
    locations: LocationMetaItem[];
}

const initialState: metaState = {
    listingTypes: [],
    types: [],
    amenities: [],
    locations: [],
}

const metaReducer = (state: metaState = initialState, action:metaAction) => {
    switch (action.type) {
        case 'SET_TYPES':
            return {
                ...state,
                types: action.payload
            };
        case 'SET_LISTING_TYPES':
            return {
                ...state,
                listingTypes: action.payload
            };
        case 'SET_AMENITIES':
            return {
                ...state,
                amenities: action.payload
            };
        case 'SET_LOCATIONS':
            return {
                ...state,
                locations: action.payload
            };

        case 'CLEAR_TYPES':
            return {
                ...state,
                types: []
            };
        case 'CLEAR_LISTING_TYPES':
            return {
                ...state,
                listingTypes: []
            };
        case 'CLEAR_AMENITIES':
            return {
                ...state,
                amenities: []
            };
        case 'CLEAR_LOCATIONS':
            return {
                ...state,
                locations: []
            };

        default:
            return state
    }
}
type MetaRootState = metaState;
export type {MetaRootState}
export { metaReducer  }