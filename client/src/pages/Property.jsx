import "../styles/List.scss"
import { useDispatch, useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import ListingCard from '../components/ListingCard'
import { useEffect, useState } from "react"
import { setPropertyList } from "../redux/state"
import Loader from "../components/Loader"
import Footer from "../components/Footer"

const Property = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const propertyList = user?.propertyList

  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user?._id}/properties`, {
        method: "GET",

      })
      const data = await response.json()
      dispatch(setPropertyList(data))
      setLoading(false)
    } catch (error) {
      console.log("feth properties failed ", error.message)
    }
  }

  useEffect(() => {
    getPropertyList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return loading ? <Loader /> : (
    <>
      <Navbar />
      <div className='content-wrapper'>
        <h1 className='title-list'>Danh sách đã tạo</h1>
        <div className='list'>
          {propertyList && propertyList.length > 0 ? (
            propertyList?.map(
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
            <p className="empty-list">"Bạn chưa tạo danh sách nào"</p>
          )}

        </div>
      </div>

      <Footer />
    </>

  )
}
export default Property