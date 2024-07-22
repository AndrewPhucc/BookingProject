import React, { useState } from 'react'
import "../styles/ListingCard.scss"
import { MdArrowForwardIos, MdArrowBackIosNew,MdFavorite } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux"
import { setWishList } from '../redux/state'


const ListingCard = ({listingId,
  creator,                      
  listingPhotoPaths,
  city,
  province,       
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking}) => {
    // slider for images
    const [currentIndex,setCurrentIndex] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goToPrevSlide = () =>{
      setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
    }
    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
    }

    /* add to favorite list */
    const user = useSelector((state) => state.user);
    const wishList = user?.wishList || [];
  
    const isLiked = wishList?.find((item) => item?._id === listingId);
  
    const patchWishList = async () => {
      if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } else { return }
    };
  

  
  

  return (
    <div className='listing-card' onClick={() => navigate(`/properties/${listingId}`)}>
      <div className='slider-container'>
        <div className='slider' style={{transform:`translateX(-${currentIndex * 100}%)`}}>
            {listingPhotoPaths?.map((photo,index) =>{
              return(
                <div key={index} className='slide'>
                <img src={`http://localhost:3001/${photo?.replace("public", "")}`} alt={` ${index + 1}`}/>
                <div className='prev-button' 
                     onClick={(e)=>{ e.stopPropagation() 
                                    goToPrevSlide(e)}}>
                  <MdArrowBackIosNew sx={{fontSize: "15px" }} />
                </div>
                <div className='next-button' 
                    onClick={(e)=>{e.stopPropagation() 
                                  goToNextSlide(e)}}>
                  <MdArrowForwardIos sx={{fontSize: "15px" }} />
                </div>
              </div>
              )           
            })}
        </div>
      </div>
      <h3>{city}, {province}</h3>
      <p>{category}</p>
      {!booking ? (<>
        <p>{type}</p>
        <p><span>{price.toLocaleString()} đ</span> một đêm</p>
      </>) : (
        <>
        <p><span>Ngày</span>: {startDate} - {endDate}</p>
        <p><span>Tổng</span> : <span>{totalPrice.toLocaleString()} đ</span> </p>
        </>
      )}
        <button className='favorite' onClick={(e) => { e.stopPropagation(); patchWishList()}} disabled={!user}>
          {isLiked ? (
            <MdFavorite style={{color:"red"}}/>
          ) : (
            <MdFavorite style={{color:"white"}}/>
          )}
        </button>
    </div>
  )
}

export default ListingCard