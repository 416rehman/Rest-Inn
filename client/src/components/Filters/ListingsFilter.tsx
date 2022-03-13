import {Stack} from "@mui/material";
import RangeFilterInput from "./filterInputs/RangeFilterInput";
import BooleanFilterInput from "./filterInputs/BooleanFilterInput";
import {
    AttachMoneyOutlined,
    BedOutlined,
    BedroomParentOutlined, EscalatorWarningOutlined,
    ShowerOutlined
} from "@mui/icons-material";
import ListFilterInput from "./filterInputs/ListFilterInput";
import {titleCase} from "../../services/helper.service";
import {useSelector} from "react-redux";

interface FilterBarProps {
    filters: { [key: string]: string };
    setFiltersHandler: (filters: { [key: string]: string }) => void;
}

export default function ListingsFilter({filters, setFiltersHandler}: FilterBarProps) {
    const {listingTypes, types, amenities} = useSelector((state: any ) => state.meta);

    return (
        <Stack direction={'row'} gap={'1rem'} width={'100%'} alignItems={'center'} justifyContent={'flex-start'} padding={'0.5rem 0'}>
            <RangeFilterInput title={"Price"} minValue={0} icon={<AttachMoneyOutlined fontSize={'small'}/>} fields={[
                { name: 'priceMin', label: 'Minimum Price' },
                { name: 'priceMax', label: 'Maximum Price' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler} />

            <RangeFilterInput title={"Beds"} minValue={0} maxValue={20} icon={<BedOutlined fontSize={'small'}/>} fields={[
                { name: 'bedsMin', label: 'Minimum Beds' },
                { name: 'bedsMax', label: 'Maximum Beds' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler}/>

            <RangeFilterInput title={"Baths"} minValue={0} maxValue={20} icon={<ShowerOutlined fontSize={'small'}/>} fields={[
                { name: 'bathsMin', label: 'Minimum Baths' },
                { name: 'bathsMax', label: 'Maximum Baths' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler}/>

            <RangeFilterInput title={"Bedrooms"} minValue={0} maxValue={20} icon={<BedroomParentOutlined fontSize={'small'}/>} fields={[
                { name: 'bedroomsMin', label: 'Minimum Bedrooms' },
                { name: 'bedroomsMax', label: 'Maximum Bedrooms' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler}/>

            <RangeFilterInput title={"Guests"} minValue={0} maxValue={20} icon={<EscalatorWarningOutlined fontSize={'small'}/>} fields={[
                { name: 'guestsMin', label: 'Minimum Guests' },
                { name: 'guestsMax', label: 'Maximum Guests' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler}/>

            <BooleanFilterInput filters={filters} setFiltersHandler={setFiltersHandler} name={'bestSeller'} label={'Hot'}/>

            <ListFilterInput title={'Type'} name={'type'}
                 options={ types.map((type: any) => {
                     return { label: titleCase(type._id), value: type._id }
                 })}
                 filters={filters} setFiltersHandler={setFiltersHandler}/>
            
            <ListFilterInput title={'Type of Place'} name={'listingType'} options={
                listingTypes.flatMap((type: any) => {
                    if (type._id) return [{
                        label: titleCase(type._id),
                        value: type._id
                    }]
                    else return []
                })}
                 filters={filters} setFiltersHandler={setFiltersHandler}/>

            <ListFilterInput title={'Amenities'} name={'amenities'} options={
                amenities.flatMap((amenity: any) => {
                    if (amenity._id) return [{
                        label: titleCase(amenity._id),
                        value: amenity._id
                    }]
                    else return []
                })}
                 filters={filters} setFiltersHandler={setFiltersHandler}/>

        </Stack>
    )
}