import {Stack} from "@mui/material";
import MinMaxFilterChoice from "./filterTypes/MinMaxFilterChoice";
import ToggleFilterChoice from "./filterTypes/ToggleFilterChoice";
import {
    AttachMoneyOutlined,
    BedOutlined,
    BedroomParentOutlined, EscalatorWarningOutlined,
    ShowerOutlined
} from "@mui/icons-material";

interface FilterBarProps {
    filters: { [key: string]: string };
    setFiltersHandler: (filters: { [key: string]: string }) => void;
}

export default function ListingsFilter({filters, setFiltersHandler}: FilterBarProps) {

    return (
        <Stack direction={'row'} gap={'1rem'} alignItems={'center'}>
            <MinMaxFilterChoice title={"Price"} minValue={0} icon={<AttachMoneyOutlined fontSize={'small'}/>} fields={[
                { name: 'priceMin', label: 'Minimum Price' },
                { name: 'priceMax', label: 'Maximum Price' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler} />

            <MinMaxFilterChoice title={"Beds"} minValue={0} maxValue={20} icon={<BedOutlined fontSize={'small'}/>} fields={[
                { name: 'bedsMin', label: 'Minimum Beds' },
                { name: 'bedsMax', label: 'Maximum Beds' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler}/>

            <MinMaxFilterChoice title={"Baths"} minValue={0} maxValue={20} icon={<ShowerOutlined fontSize={'small'}/>} fields={[
                { name: 'bathsMin', label: 'Minimum Baths' },
                { name: 'bathsMax', label: 'Maximum Baths' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler}/>

            <MinMaxFilterChoice title={"Bedrooms"} minValue={0} maxValue={20} icon={<BedroomParentOutlined fontSize={'small'}/>} fields={[
                { name: 'bedroomsMin', label: 'Minimum Bedrooms' },
                { name: 'bedroomsMax', label: 'Maximum Bedrooms' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler}/>

            <MinMaxFilterChoice title={"Guests"} minValue={0} maxValue={20} icon={<EscalatorWarningOutlined fontSize={'small'}/>} fields={[
                { name: 'guestsMin', label: 'Minimum Guests' },
                { name: 'guestsMax', label: 'Maximum Guests' }
            ]} filters={filters} setFiltersHandler={setFiltersHandler}/>

            <ToggleFilterChoice filters={filters} setFiltersHandler={setFiltersHandler} name={'bestSeller'} label={'Best Seller'}/>
            <ToggleFilterChoice filters={filters} setFiltersHandler={setFiltersHandler} name={'JoeMama'} label={'Test'} clearOnFalse={false}/>
        </Stack>
    )
}