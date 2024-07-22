import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "../styles/Register.scss"


const RegisterPage = () => {
    const [formData,setFormData] = useState({
        firstName:"",
        email:"",
        password:"",
        comfirmPassword:"",
        profileImage: null,
    })
    const handleChange = (e) =>{
        const {name, value, files} = e.target
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value
        })
    }
    

    const [passwordMatch,setPasswordMatch] = useState(true)

    useEffect(()=>{
        setPasswordMatch(formData.password === formData.comfirmPassword || formData.comfirmPassword === "") 
    },[formData.password, formData.comfirmPassword]  )

    
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
          
        try{
            const register_form = new FormData()
            for(var key in formData){
                register_form.append(key,formData[key])
            }
            const response = await fetch("http://localhost:3001/auth/register",{
                method: "POST",
                body: register_form
            })
            if(response.ok){
                navigate("/login")
            }
        }catch(err){
            console.log("Đăng kí thất bại", err.message)
        }
        

    }

    return (
        <div className='register'>
            <div className='register_content'>
                <form className='register_content_form' onSubmit={handleSubmit}>
                    <input
                        placeholder='Họ Và Tên'
                        name='firstName'
                        value={formData.firstName}
                        required
                        onChange={handleChange}
                    />
                    <input
                        placeholder='Email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder='Mật Khẩu'
                        name='password'
                        type='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder='Nhập lại mật khẩu'
                        name='comfirmPassword'
                        type='password'
                        value={formData.comfirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {!passwordMatch && (
                        <p style={{color:"red"}}>Mật khẩu không trùng khớp!</p>
                    )}
                    <input 
                    id='image'
                     type='file' 
                     name='profileImage' 
                     accept='image/*' 
                     style={{ display: 'none' }}  onChange={handleChange} required />

                    <label htmlFor='image'>
                        <img src='/assets/addImage.png' alt='add profile img'/>
                        <p>Tải ảnh của bạn lên</p>
                    </label>
                    {formData.profileImage && (
                        <img src={URL.createObjectURL(formData.profileImage)} alt='' style={{maxWidth:"80px"}}/>
                    )}
                    <button type='submit' disabled={!passwordMatch}>Đăng Kí</button>
                </form>
                <a href='/login'>Bạn Đã Có Tài Khoản? Đăng Nhập Tại Đây</a>
            </div>

        </div>
    )
}

export default RegisterPage