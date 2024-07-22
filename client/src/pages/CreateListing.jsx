import "../styles/CreateListing.scss"
import Navbar from "../components/Navbar"
import { categories, types, facilities } from "../data"
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material"
import variables from "../styles/variables.scss"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { IoIosImages } from "react-icons/io"
import { useState } from "react"
import { BiTrash } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer";


const CreateListing = () => {

    const navigate = useNavigate()

    const [category,setCategory] = useState("")
    const [type,setType] = useState("")

    // location
        const [formLocation,setFormLocation] = useState({
            streetAddress: "",
            aptSuite: "",
            city: "",
            province: ""

        })
        
        const handleChangeLocation = (e) => {
            const {name, value} = e.target
            setFormLocation({
                ...formLocation,
                [name]: value
            })
        }
    // basic count 
    const [guestCount,setGuestCount] = useState(1)
    const [bedroomCount,setBedroomCount] = useState(1)
    const [bedCount,setBedCount] = useState(1)
    const [bathroomCount,setBathroomCount] = useState(1)
    
    // amenities section
    const [amenities,setAmenities] = useState([])

    const handleAmenities = (facility) => {
        if(amenities.includes(facility)) {
            
            setAmenities((prev) => prev.filter((option) => option !== facility))
        } 
        else {
            setAmenities((prev) => [...prev, facility])
        }
    }


    // Upload, drag & drop, remove photos
    
    const [photos, setPhotos] = useState([])

   
    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    }
    const handleDragPhoto = (result) => {
        if (!result.destination) return
        const items = Array.from(photos)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setPhotos(items)

    }
    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove))
    }

    // description

    const [formDescription,setFormDescription] = useState({
        title: "",
        description:"",
        highlight: "",
        price: 0
    })

    const handleChangeDescriptione = (e) => {
        const {name, value} = e.target
        setFormDescription({
            ...formDescription,
            [name]:value
        })
    }

    const creatorId = useSelector((state) => state.user._id)

    const handlePost = async(e) =>{
        e.preventDefault()
        try{
            // create a new fromdata object to handle file uploads
            const listingForm = new FormData()
            listingForm.append("creator", creatorId) 
            listingForm.append("category", category) 
            listingForm.append("type", type) 
            listingForm.append("streetAddress", formLocation.streetAddress) 
            listingForm.append("aptSuite", formLocation.aptSuite) 
            listingForm.append("city", formLocation.city) 
            listingForm.append("province", formLocation.province) 
            listingForm.append("guestCount", guestCount) 
            listingForm.append("bedroomCount", bedroomCount) 
            listingForm.append("bedCount", bedCount) 
            listingForm.append("bathroomCount", bathroomCount) 
            listingForm.append("amenities", amenities) 
            listingForm.append("title", formDescription.title) 
            listingForm.append("description", formDescription.description) 
            listingForm.append("highlight", formDescription.highlight) 
            listingForm.append("price", formDescription.price) 

            // append each selected photos to the FormData object

            photos.forEach((photo) => {
                listingForm.append("listingPhotos", photo)
            })
            // send a post request to server

            const response = await fetch("http://localhost:3001/properties/create", {
                method: "POST",
                body: listingForm
            })
           
            
            if(response.ok) {
                navigate("/")
              
            }
        }catch(err){
            console.log("Publish listing failed", err.message)
        }
    }
    
    
    return (
        <>
            <Navbar />

            <div className="create-listing">
                <h1>Tạo địa điểm của bạn</h1>
                <form onSubmit={handlePost}>
                    <div className="create-listing_step1">
                        <h2>Bước 1: Nói cho chúng tôi về chổ của bạn ?</h2>
                        <hr />
                        <h3>Loại hình nào dưới đây mô tả tốt nhất vị trí của bạn?</h3>
                        <div className="category-list">
                            {categories?.map((item, index) => (
                                <div className={`category ${category === item.label ? "selected" : ""}`} key={index} onClick={() => setCategory(item.label)}>
                                    <div className="category_icon">{item.icon}</div>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <h3>
                            Loại hình nào sẽ được lựa chọn cho khách
                        </h3>
                        <div className="type-list">
                            {types?.map((item, index) => (
                                <div className={`type ${type === item.name ? "selected" : ""}`}key={index} onClick={() => setType(item.name)}>
                                    <div className="type_text">
                                        <h4>{item.name}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="type_icon">
                                        {item.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h3>
                            Địa điểm của bạn ở đâu ?
                        </h3>
                        <div className="full">
                            <div className="location">
                                <p>Địa chỉ</p>
                                <input type="text" placeholder="Địa chỉ" name="streetAddress" required value={formLocation.streetAddress} onChange={handleChangeLocation}/>
                            </div>
                        </div>
                        <div className="half">
                            <div className="location">
                                <p>Căn hộ, Phòng Suite, v.v. (nếu có)</p>
                                <input type="text" placeholder="Căn hộ, Phòng Suite, v.v." name="aptSuite"   value={formLocation.aptSuite} onChange={handleChangeLocation} />
                            </div>
                            <div className="location">
                                <p>Thành phố</p>
                                <input type="text" placeholder="Thành phố" name="city" required  value={formLocation.city} onChange={handleChangeLocation} />
                            </div>
                        </div>
                        <div className="half">
                            <div className="location">
                                <p>Tỉnh</p>
                                <input type="text" placeholder="Tỉnh" name="province" required value={formLocation.province} onChange={handleChangeLocation} />
                            </div>
                        </div>
                        <h3>chia sẻ một vài chi tiết về chổ của bạn</h3>
                        <div className="basics">
                            <div className="basic">
                                <p>Số lượng người</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline onClick={() => {guestCount > 1 && setGuestCount(guestCount - 1)}} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }} />
                                    <p>{guestCount}</p>
                                    <AddCircleOutline onClick={() =>  setGuestCount(guestCount + 1)} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }} />
                                </div>
                            </div>
                            <div className="basic">
                                <p>Phòng ngủ</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline onClick={() => {bedroomCount > 1 && setBedroomCount(bedroomCount - 1)}} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }} />
                                    <p>{bedroomCount}</p>
                                    <AddCircleOutline onClick={() =>  setBedroomCount(bedroomCount + 1)} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }} />
                                </div>
                            </div>
                            <div className="basic">
                                <p>số lượng giường</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline onClick={() => {bedCount > 1 && setBedCount(bedCount - 1)}} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }} />
                                    <p>{bedCount}</p>
                                    <AddCircleOutline onClick={() =>  setBedCount(bedCount + 1)} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }} />
                                </div>
                            </div>
                            <div className="basic">
                                <p>Phòng tắm</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline onClick={() => {bathroomCount > 1 && setBathroomCount(bathroomCount - 1)}} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }} />
                                    <p>{bathroomCount}</p>
                                    <AddCircleOutline onClick={() =>   setBathroomCount(bathroomCount + 1)} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="create-listing_step2">

                        <h2>Bước 2: Làm chổ của bạn trở nên nổi bật</h2>
                        <hr />
                        <h3>Hãy cho khách biết chổ của bạn có những gì</h3>
                        <div className="amenities">
                            {facilities.map((item, index) => (
                                <div className={`facility ${amenities.includes(item.name) ? "selected" : "" }`} key={index} onClick={() => handleAmenities(item.name)}>
                                    <div className="facility_icon">{item.icon}</div>
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                        <h3>Tải lên hình ảnh về chổ của bạn</h3>
                        <DragDropContext onDragEnd={handleDragPhoto}>
                            <Droppable droppableId="photos" direction="horizontal" type="group">
                                {(provided) => (
                                    <div className="photos" {...provided.droppableProps} ref={provided.innerRef}>
                                        {photos.length < 1 && (
                                            <>
                                                <input id="image" type="file" style={{ display: "none" }} accept="image/*"
                                                    onChange={handleUploadPhotos} multiple />
                                                <label htmlFor="image" className="alone">
                                                    <div className="icon"><IoIosImages /></div>
                                                    <p>Tải ảnh lên</p>
                                                </label>
                                            </>
                                        )}
                                        {photos.length >= 1 && (
                                            <>
                                                {photos.map((photo, index) => {
                                                    return (
                                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                                            {(provided) => (
                                                                <div className="photo" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    <img src={URL.createObjectURL(photo)} alt="place" />
                                                                    <button type="button" onClick={() => handleRemovePhoto(index)}>
                                                                        <BiTrash />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                                <input id="image" type="file" style={{ display: "none" }} accept="image/*"
                                                    onChange={handleUploadPhotos} multiple />
                                                <label htmlFor="image" className="together">
                                                    <div className="icon"><IoIosImages /></div>
                                                    <p>Tải ảnh lên</p>
                                                </label>
                                            </>
                                        )}

                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                               <h3>Điều gì làm địa điểm của bạn hấp dẫn và thú vị với du khách</h3> 
                               <div className="description">
                                    <p>Tên địa điểm</p>
                                    <input type="text" placeholder="Tên.." name="title" value={formDescription.title} required onChange={handleChangeDescriptione}/>
                                    <p>Mô tả</p>
                                    <textarea type="text" placeholder="Mô tả" name="description" value={formDescription.description} required onChange={handleChangeDescriptione} />
                                    <p>Điểm Nổi bật</p>
                                    <input type="text" placeholder="Điểm Nổi bật" name="highlight" value={formDescription.highlight} required onChange={handleChangeDescriptione} />
                                    <p>Chọn mức giá</p>
                                    <span>$</span>
                                    <input type="number" placeholder="...." name="price" className="price" value={formDescription.price.toLocaleString()} required onChange={handleChangeDescriptione}/>
                               </div> 
                    </div>

                        <button className="submit_btn" type="submit">Tạo danh sách của bạn</button>       
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default CreateListing