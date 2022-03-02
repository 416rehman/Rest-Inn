import React, {useEffect} from 'react';
import ListingCard from "../../components/ListingCard/ListingCard";
import './ListingsPage.scss';
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'
import InvalidPage from "../../components/InvalidPage/InvalidPage";
import {Pagination, Skeleton} from "@mui/material";

function ListingsPage() {
    const [searchParams] = useSearchParams();
    const [listings, setListings] = React.useState<ListingPartial[]>([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);

    useEffect(()=>{
        setCurrentPage(parseInt(searchParams.get('page') || '1'));
    }, [])

    useEffect(()=> {
        searchParams.set('page', currentPage.toString());
        const filter = searchParams.toString()

        axios.get(apiURL('/properties', filter))
            .then(res => {
                setListings(res.data.data)
                setTotalPages(res.data.pagination.totalPages)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [searchParams, currentPage])

    const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    return loading ? (
        <div className={'listings-page page-content'}>
            <Skeleton variant={'rectangular'} height={180} style={{
                borderRadius: '25px',
            }}/>
            <Skeleton variant={'rectangular'} height={180} style={{
                borderRadius: '25px',
            }}/>
            <Skeleton variant={'rectangular'} height={180} style={{
                borderRadius: '25px',
            }}/>
            <Skeleton variant={'rectangular'} height={180} style={{
                borderRadius: '25px',
            }}/>
        </div>
    ) : (
        <div className={'listings-page page-content'}>
            {listings.length ?
                (<React.Fragment>
                    <div className={'listings-container'}>
                        {listings.map(listing => <ListingCard key={listing._id}  listing={listing}/>)}
                    </div>
                    <Pagination count={totalPages} page={currentPage} shape="rounded" onChange={changePage} />
                </React.Fragment>)
                    :
                <InvalidPage/>
            }

        </div>
    )
}

export default ListingsPage;