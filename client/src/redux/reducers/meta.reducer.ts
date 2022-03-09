enum metaActionTypeEnum {
    SET_LISTING_TYPES = 'SET_LISTING_TYPES',
    SET_TYPES = 'SET_TYPES',
    SET_AMENITIES = 'SET_AMENITIES',
    CLEAR_LISTING_TYPES = 'CLEAR_LISTING_TYPES',
    CLEAR_TYPES = 'CLEAR_TYPES',
    CLEAR_AMENITIES = 'CLEAR_AMENITIES',
}

interface metaItem {
    _id: string,
    count?: 0
}

interface metaAction {
    type: keyof typeof metaActionTypeEnum,
    payload: metaItem[];
}

interface metaState {
    listingTypes: metaItem[];
    types: metaItem[];
    amenities: metaItem[];
}

const initialState: metaState = {
    listingTypes: [],
    types: [],
    amenities: [],
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

        default:
            return state
    }
}
type MetaRootState = metaState;
export type {MetaRootState}
export { metaReducer  }