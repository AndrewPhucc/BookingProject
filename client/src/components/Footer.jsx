import "../styles/Footer.scss"
import { LocalPhone, Email, Facebook, Instagram, InfoSharp } from "@mui/icons-material"


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/"><img src="/assets/logo2.png" alt="logo" /></a>
      </div>

      <div className="footer_center">
        <h3>Mạng xã hội</h3>
        <ul>
          <li>  <InfoSharp/> Về chúng tôi!</li>
          <li> <Facebook/> <a href="https://www.facebook.com/Phucleeday/"> fanpage của chúng tôi</a></li>
          <li> <Instagram/><a href="https://www.instagram.com/"> instagram của chúng tôi</a></li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Liên hệ</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+84 702693032</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>phucle011232@gmail.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  )
}

export default Footer