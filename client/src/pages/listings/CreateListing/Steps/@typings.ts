import {Listing} from "../../../../@typings/listings";

export interface stepProps {
    listingData: Listing,
    handleChange: (name: any, value: any) => void,
}