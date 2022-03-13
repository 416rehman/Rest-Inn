import {Fragment, useEffect, useState} from 'react';
import ListingCard from "../../components/ListingCard/ListingCard";
import './ListingsPage.scss';
import ErrorGeneric from "../../components/Errors/ErrorGeneric";
import {CircularProgress, Pagination, Stack} from "@mui/material";
import {ListingPartial} from "../../@typings/listings";
import {useSearchParams} from "react-router-dom";
import ListingsFilter from "../../components/Filters/ListingsFilter";
import {getAllListings} from "../../services/listing.service";


function ListingsPage({host, hideOnEmpty, hideFilter}: { host?: string, hideOnEmpty?: boolean, hideFilter?: boolean }) {

    const [searchParams] = useSearchParams();
    const [appliedFilters, setAppliedFilters] = useState<any>(Object.fromEntries(searchParams));

    const [listings, setListings] = useState<ListingPartial[]>([]);
    const [counts, setCounts] = useState<{ count: number, pages: number }>({count: 0, pages: 0});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setLoading(true);
        // Creates a new URLSearchParams object from the applied filters, convert to query string, and update the URL
        const newFilter = new URLSearchParams(appliedFilters);
        if (host) {
            newFilter.set('host', host);
        }
        window.history.pushState(null, '', `?${newFilter.toString()}`);

        // Fetch listings with the applied filters
        getAllListings(newFilter.toString())
            .then(res => {
                setListings(res.data)
                setCounts({
                    count: res.pagination.count,
                    pages: res.pagination.totalPages
                })
            })
            .catch(() => {
                setListings([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [appliedFilters])

    return hideOnEmpty && !listings.length ? null : (<div className={'listings-page page-content'}>
            {hideFilter ? null :
                <Stack sx={{
                    width: '100%',
                    overflowX: 'scroll',
                    '&::-webkit-scrollbar': {
                        height: '0.5em'
                    }
                }}>
                    <ListingsFilter filters={appliedFilters} setFiltersHandler={setAppliedFilters}/>
                </Stack>}
            {loading ? (<CircularProgress/>) :
                listings.length ?
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
                    <ErrorGeneric title={'No Listings Found'}
                                  message={'There are no listings that match your search criteria. Please try again.'}
                                  buttonText={'Remove Filters'} buttonHandler={() => setAppliedFilters({})}/>
            }
        </div>
    )

}

export default ListingsPage;