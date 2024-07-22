import { Link } from "react-router-dom"
import { categories } from "../data"
import "../styles/Categories.scss"

const Categories = () => {
  return (
    <div className='categories'> 
        <h1>Khám phá những địa điểm nổi bật</h1>
        <p>Hãy khám phá bộ sưu tập rộng lớn các căn hộ nghỉ dưỡng của chúng tôi, dành cho mọi loại du khách. 
        Thưởng thức văn hóa bản địa, tận hưởng sự thoải mái như tại gia và tạo nên những kỷ niệm khó phai trong ước mơ điểm đến của bạn.</p>

        <div className="categories_list">
            {categories?.slice(1, 7).map((category,index)=>{
                return (
                <Link to={`/properties/category/${category?.label}`}>
                    <div className="category" key={index}>
                        <img src={category.img} alt={category.label}/>
                        <div className="overlay"></div>
                        <div className="category_text">
                            <div className="category_text_icon">{category.icon}</div>
                            <p>{category.label}</p>
                        </div>
                    </div>
                </Link>
                )
            })}
        </div>
    </div>
  )
}

export default Categories