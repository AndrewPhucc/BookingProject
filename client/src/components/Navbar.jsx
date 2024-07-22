import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Search, Person, Menu } from '@mui/icons-material'
import variables from "../styles/variables.scss"
import {useSelector,useDispatch} from "react-redux"
import "../styles/Navbar.scss"
import {Link, useNavigate} from "react-router-dom"
import {setLogout} from "../redux/state"

const Navbar = () => {

  const [dropdownMenu,setDropdownMenu] = useState(false)

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  const [search,setSearch] = useState("")


  return (
    <div className='navbar'>
      <a href='/'>
        <img src='/assets/logo2.png' alt='' style={{borderRadius:"50%"}} />
      </a>

      <div className='navbar_search'>
        <input type='text' placeholder='Tìm địa điểm...' value={search} onChange={(e) => setSearch(e.target.value)} />
        <IconButton disabled={search === ""} onClick={() => navigate(`/properties/search/${search}`) }>
          <Search sx={{ color: variables.pinkred }}  />
        </IconButton>
      </div>
      <div className='navbar_right'>
        {user ? <a href='/create-listing' className='host'>Trở thành chủ nhà</a> : <a className='host' href='/login'>Trở thành chủ nhà</a>}

        <button className='navbar_right_account' onClick={() => setDropdownMenu(!dropdownMenu)}>
          <Menu sx={{ color: variables.darkgrey }} />
          {
            !user ? <Person sx={{ color: variables.darkgrey }} /> : (
              <img src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`} 
                alt='profile' style={{ objectFit: "cover", borderRadius: "50%" }}/>
                )
          }

        </button>
        {
          dropdownMenu && !user && (
            <div className='navbar_right_accountmenu'>
                <Link to="/login">Đăng nhập</Link>
                <Link to="/register">Đăng kí</Link>
            </div>
          )
        }
        {
          dropdownMenu && user && (
            <div className='navbar_right_accountmenu'>
                <Link to={`/${user?._id}/trips`}>Danh sách chuyến đi</Link>
                <Link to={`/${user?._id}/wishList`}>Danh sách yêu thích</Link>
                <Link to={`/${user?._id}/properties`}>Danh sách đã tạo</Link>
                <Link to="/login" onClick={() => dispatch(setLogout())}>Đăng xuất</Link>

              
            </div>
          )
        }

      </div>

    </div>
  )
}

export default Navbar