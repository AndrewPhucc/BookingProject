import React, { useEffect, useState } from 'react'
import "../styles/ListingDetails.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { facilities } from '../data'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const ListingDetails = () => {
    const [loading,setLoading] = useState(true)

    const {listingId} = useParams()
    const [listing,setListing] = useState("")

    const getListingDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/properties/${listingId}`,
            {
              method: "GET",
            }
          );
    
          const data = await response.json();
          setListing(data);
          setLoading(false);
        } catch (err) {
          console.log("Fetch Listing Details Failed", err.message);
        }
      };


    useEffect(() => {
        getListingDetails()
   // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [])

    /* booking calendar */
    const [dateRange,setDateRange] = useState([
        {
            starDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])

    const handleSelect = (ranges) => {
        // update the selected date range when the user makes a selection 
        setDateRange([ranges.selection])
    }

    const start = new Date(dateRange[0].starDate)
    const end = new Date(dateRange[0].endDate)
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const nightCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));


    /* submit booking */
    const navigate = useNavigate()

    const customerId = useSelector((state) => state?.user?._id)

    const handleSubmit = async() =>  {
      try {
        const bookingForm = {
          customerId,
          listingId,
          hostId: listing.creator._id,
          startDate: dateRange[0].starDate.toDateString(),
          endDate: dateRange[0].endDate.toDateString(),
          totalPrice:listing.price * nightCount
        }

        const response = await fetch("http://localhost:3001/bookings/create",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bookingForm)
        })

        if(response.ok){
          navigate(`/${customerId}/trips`)
        }
      } catch (error) {
          console.log("submit booking faild", error.message)
      }
    }


  return loading ? <Loader/> : (
    <>
    <Navbar/>
    <div className='listing-details'>
        <div className='title'>
            <h1>{listing.title}</h1>
            <div></div>
        </div>
        <div className='photos'>
            {listing.listingPhotoPaths?.map((item) => (
                <img src={`http://localhost:3001/${item?.replace("public", "")}`} alt='listing'/>
            ))}
        </div>
        <h2>{listing.type} tại {listing.city},{listing.province}</h2>
        <p>{listing.guestCount} người - {listing.bedroomCount} phòng ngủ - {listing.bedCount} giường -{listing.bathroomCount} phòng tắm </p>
        <hr/>

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing?.creator.profileImagePath.replace(
              "public",
              ""
            )}`} 
            alt='profile'
           />
          <h3>
            Chủ phòng: {listing?.creator.firstName}
          </h3>
        </div>
        <hr/>

        <h3>Mô tả</h3>
        <p>{listing.description}</p>
        <hr/>

        <h3>Điểm nổi bật</h3>
        <p>{listing.highlight}</p>
        <hr/>
        <div className='booking'>
            <div>
                <h2>Nơi này có những gì cho bạn?</h2>
                 <div className='amenities'> 
                    {listing.amenities[0].split(",").map((item,index) => (
                        <div className='facility' key={index}>
                            <div className='facility_icon'>
                            {facilities.find((facility) => facility.name === item)?.icon}
                            </div>   
                            <p>{item}</p>                         
                        </div>
                    ))}
                 </div>
            </div>
            
               {/* calendar */}
            <div>
                <h2>Bạn ở lại trong bao lâu ?</h2>
                <div className='date-range-calendar'>
                    <DateRange ranges={dateRange} onChange={handleSelect}/>
                    {nightCount > 1 && (
                        <h2>${listing.price.toLocaleString()} x {nightCount.toLocaleString()} đêm</h2>
                    )}
                    <h2>Tổng giá: {new Intl.NumberFormat().format(parseInt(listing.price) * nightCount)} đ</h2>
                    <p>Ngày bắt đầu: {dateRange[0].starDate.toDateString()}</p>
                    <p>Ngày kết thúc: {dateRange[0].endDate.toDateString()}</p>
                    {
                      !customerId ? (
                        <> 
                        <button className='button' style={{backgroundColor:"#CFCFCF"}} type='submit' onClick={handleSubmit} disabled >
                        Đặt phòng
                        </button>
                        <p style={{color: "red" , textAlign: "center"}}>Bạn phải đăng nhập !!!!</p>
                        </>
                      ) : (
                        <button className='button' type='submit' onClick={handleSubmit} >
                        Đặt phòng
                    </button>
                      )
                    }
                    
                 
                </div>
            </div>
        </div>

    </div>
    <Footer/>
    </>
  )
}

export default ListingDetails