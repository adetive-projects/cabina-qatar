import {
  IoIosPhonePortrait,
  IoMdMail,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoMdPerson,
} from "react-icons/io";

import Link from "next/link";
import { useSelector } from "react-redux";

const MobileMenuWidgets = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="offcanvas-mobile-menu__widgets space-mb--30">
      <div className="contact-widget space-mb--30">
        <ul>
          {/* <li>
            <IoMdPerson />
            <Link href="/login">Login</Link>
          </li> */}

          {user ? (
            <li>
              <Link href="/my-account" className="d-flex align-items-center">
                <IoMdPerson />
                <span>{user.name}</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login" className="d-flex align-items-center">
                <IoMdPerson />
                <span>Login</span>
              </Link>
            </li>
          )}
          <li>
            <IoIosPhonePortrait />
            <a href="tel:+974 44337000">+974 44337000 </a>
          </li>
          <li>
            <IoMdMail />
            <a href="mailto:info@cabinaqatar.com">info@cabinaqatar.com</a>
          </li>
        </ul>
      </div>

      <div className="social-widget">
        {/* <a href="https://www.twitter.com" target="_blank">
          <IoLogoTwitter />
        </a> */}
        <a href="https://www.instagram.com/cabina.qatar/" target="_blank">
          <IoLogoInstagram />
        </a>
        <a
          href="https://www.facebook.com/people/CabinaQatar/61566948988556/?sk=about"
          target="_blank"
        >
          <IoLogoFacebook />
        </a>
        {/* <a href="https://www.pinterest.com" target="_blank">
          <IoLogoPinterest />
        </a> */}
      </div>
    </div>
  );
};

export default MobileMenuWidgets;
