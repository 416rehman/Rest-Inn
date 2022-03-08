import {Fragment, useEffect, useState} from 'react';
import ListingCard from "../../components/ListingCard/ListingCard";
import './ListingsPage.scss';
import axios from 'axios'
import InvalidPage from "../../components/InvalidPage/InvalidPage";
import {Pagination, Skeleton, Stack} from "@mui/material";
import {ListingPartial} from "../../@typings/listings";
import {useSearchParams} from "react-router-dom";
import ListingsFilterBar from "../../components/Filters/ListingsFilterBar";


function ListingsPage() {
    const [searchParams] = useSearchParams();
    const [appliedFilters, setAppliedFilters] = useState<any>({});

    const [listings, setListings] = useState<ListingPartial[]>([]);
    const [counts, setCounts] = useState<{ count: number, pages: number }>({count: 0, pages: 0});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        setAppliedFilters(params);
    }, [])

    useEffect(() => {
        // Create a new URLSearchParams object from the applied filters, convert to query string, and update the URL
        const newFilter = new URLSearchParams(appliedFilters);
        window.history.pushState(null, '', `?${newFilter.toString()}`);

        // Fetch listings with the applied filters
        axios.get(apiURL('/properties', newFilter.toString()))
            .then(res => {
                setListings(res.data.data)
                setCounts({
                    count: res.data.pagination.count,
                    pages: res.data.pagination.totalPages
                })
            })
            .catch(() => {
                setListings([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [appliedFilters])

    return loading ? (
        <div className={'listings-page page-content'}>
            <ListingsFilterBar filters={appliedFilters} setFiltersHandler={setAppliedFilters}/>
            {Array(5).map((_, i) => (
                <Skeleton key={i} variant={'rectangular'} height={180} style={{
                    borderRadius: '25px',
                }}/>
            ))}
        </div>
    ) : (
        <div className={'listings-page page-content'}>
            <Stack><ListingsFilterBar filters={appliedFilters} setFiltersHandler={setAppliedFilters}/></Stack>
            {listings.length ?
                (<Fragment>
                    <div className={'listings-container'}>
                        {listings.map(listing => <ListingCard key={listing._id} listing={listing}/>)}
                    </div>
                    <Pagination count={counts.pages}
                                page={parseInt(appliedFilters.page) || 1}
                                shape="rounded"
                                onChange={(event, value) => {
                                    setAppliedFilters({...appliedFilters, page: value})
                                }}
                    />
                </Fragment>)
                :
                <InvalidPage/>
            }
        </div>
    )
}

export default ListingsPage;