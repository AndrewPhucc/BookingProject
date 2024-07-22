import React, { useEffect, useState } from 'react'
import "../styles/List.scss"
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {setTripList} from "../redux/state"
import ListingCard from '../components/ListingCard'
import Footer from '../components/Footer'

const TripList = () => {
    const [loading,setLoading] = useState(true)
    const userId = useSelector((state) => state.user._id)
    const tripList = useSelector((state) => state.user.tripList)
    const dispatch = useDispatch()

    const getTripList = async() => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}/trips`,{
                method: "GET",

            })
            const data = await response.json()
            dispatch(setTripList(data))
            setLoading(false)
        } catch (error) {
            console.log("feth trip list failed", error.message)
        }
    }
    

    useEffect(() => {
        getTripList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return loading ? <Loader/> : (
    <>
        <Navbar/>
        <div className='content-wrapper'>
        <h1 className='title-list'>Danh sách chuyến đi của bạn</h1>
        <div className='list'>
            {tripList && tripList.length > 0 ? (
                tripList?.map(({listingId,startDate,endDate,totalPrice,booking = true }) =>           
              <ListingCard listingId={listingId._id} 
                           listingPhotoPaths={listingId.listingPhotoPaths} 
                           city={listingId.city} 
                           province={listingId.province}
                           category={listingId.category}
                           startDate={startDate} 
                           endDate={endDate} 
                           totalPrice={totalPrice}
                           booking={booking}
                           />)
            ) : (
                <p className="empty-list">"Bạn chưa có danh sách chuyến đi"</p>
            )}
        </div>
        </div>
 
        <Footer/>
    </>
  )
}

export default TripList