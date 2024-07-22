import React, { useEffect, useState } from 'react'
import {categories} from "../data"
import "../styles/Listings.scss"
import {useDispatch, useSelector} from "react-redux"
import { setListings } from '../redux/state'
import Loader from "../components/Loader"
import ListingCard from "../components/ListingCard"

const Listings = () => {
    const dispath = useDispatch()
    const [loading,setLoading] = useState(true)
    const [selectedCategory,setSelectedCategory] = useState("All")

    const listings = useSelector((state) => state.listings)

    const getFethListing = async () => {
        try{
            const respone = await fetch(
                selectedCategory !== "All" ?
                `http://localhost:3001/properties?category=${selectedCategory}` : "http://localhost:3001/properties", 
                {
                    method: "GET",
                })
                
                const data = await respone.json()
                dispath(setListings({listings: data}))
                setLoading(false)
        } catch(err){
            console.log("Feth Listings Failed", err.message)
        }
    }

    useEffect(()=>{
        getFethListing()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedCategory])

   
  return (
    <>
    <div className='category-list'>
        {categories.map((category,index) =>{
            return (
                <div className={`category ${category.label === selectedCategory ? "selected": ""}`} key={index} onClick={() => setSelectedCategory(category.label)} >
                <div className='category_icon'>{category.icon}</div>
                <p>{category.label}</p>
            </div>
            )
        })}
    </div>
    {
        loading ? <Loader/> : (
            <div className='listings'>
                {listings.map(({_id,
                    creator,                      
                    listingPhotoPaths,
                    city,
                    province,       
                    category,
                    type,
                    price,
                    booking = false}) => (<ListingCard 
                                listingId={_id}
                                creator={creator}
                                listingPhotoPaths={listingPhotoPaths}
                                city={city}
                                province={province}
                                category={category}
                                type={type}
                                price={price}
                                booking={booking}
                                />))}
            </div>
        )
    }
    </>
  )
}

export default Listings