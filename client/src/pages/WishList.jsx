import React from 'react'
import "../styles/List.scss"
import { useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import ListingCard from '../components/ListingCard'
import Footer from '../components/Footer'

const WishList = () => {
    const wishList = useSelector((state) => state.user.wishList)
  return (
    <>
        <Navbar/>
        <div className='content-wrapper'>
          <h1 className='title-list'>Danh sách yêu thích</h1>
          <div className='list'>
            {wishList && wishList.length > 0 ? (
              wishList.map(
                ({
                  _id,
                  creator,
                  listingPhotoPaths,
                  city,
                  province,
                  category,
                  type,
                  price,
                  booking = false,
                }) => (
                  <ListingCard
                    key={_id}
                    listingId={_id}
                    creator={creator}
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    province={province}
                    category={category}
                    type={type}
                    price={price}
                    booking={booking}
                  />
                )
              )
            ) : (
              <p className="empty-list">"Bạn chưa có danh sách yêu thích"</p>
            )}
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default WishList
