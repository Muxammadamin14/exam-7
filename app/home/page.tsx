"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import logo from '../img/Logo (2).png';
import control from '../img/Control Purchase.png';
import phone from '../img/Mobile.png';
import food from '../img/Food.png';
import kfs from '../img/Resturent.png';
import foiz from '../img/Subscribe.png';
import Features from '../img/Features.png';
import one from '../img/Upper Part.png';
import two from '../img/Upper Part (1).png';
import facetg from '../img/Socials.png';
import karxina from '../img/ant-design_shopping-cart-outlined.png';
import "./Home.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const MyHome = () => {
  const [userData, setUserData] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    axios
      .get('https://api.escuelajs.co/api/v1/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    window.location.href = '/';
  };

  return (
    <div className='container'>
      <header>
        <div className="headerDivs1">
          <Image src={logo} alt="" />
        </div>
        <div className="headerDivs2">
          <ul className="headerUl">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/allproducts">Dishes</a>
            </li>
          </ul>
        </div>
        <div className="headerDivs3">
          {userData ? (
            <>
              <div className="imgKarx">
              <a href="/addtocard">
                <Image src={karxina} alt="" />
              </a>
            </div>
              <button className="logoutBtn" onClick={handleLogout}>
                Logout
              </button>
              <button className='headerbtnL'>
                <span>{userData.name}</span>
              </button>
            </>
          ) : (
            <>
              <div className="imgKarx">
              <a href="/addtocard">
                <Image src={karxina} alt="" />
              </a>
            </div>
              <button className='headerbtnL'>
                <a href="/">Login</a>
              </button>
              <button className='headerbtnS'>Sign Up</button>
            </>
          )}
        </div>
      </header>
      {userData && (
        <>
          <div className="divgrey"></div>
          <div className="informationDiv">
            <div className="infOne">
              <div className="div-1"><p>OVER 1000 USERS</p></div>
              <div className="div-2"><h1 className='Poppins'>Enjoy Foods All <br /> Over The </h1><div className="World2"><h1 className="World">World</h1></div></div>
              <div className="div-3"><p>EatLy helps you set saving goals, earn cash back offers. Go to the disclaimer for more details and get paychecks up to two days early. Get a $20 bonus.</p></div>
              <div className="div-4"><button className='getS'>Get Started</button></div>
            </div>
            <div className="infTwo"><Image src={food} alt="" className='infTwo' /></div>
          </div>
          <div className="Features">
            <Image src={Features} alt="" className='Featurs' />
          </div>

          <div className='phoneDiv-1'>
            <div className='phoneDiv-2'>
              <Image src={phone} alt="" className='phon' />
            </div>
            <div className='phoneDiv-3'>
              <div className="phone-1"><h1 className='thetext-1'>Premium <br />For Your Health</h1><div className="quality"><h1 className='thetext-2'>Quality</h1></div></div>
              <div className="phone-2">
                <p className='paragraph1'>Premium quality food is made with ingredients that are packed with essential vitamins, minerals.</p>
                <p className='paragraph2'>These foods promote overall wellness by supporting healthy digestion and boosting immunity.</p>
              </div>
              <div className="phone-3">
                <button className='download'>Download </button>
              </div>
            </div>
          </div>
          <div className="divgrey2"></div>
          <div className="chickenKing">
            <Image src={kfs} alt="" className='' />
          </div>

          <div className='text-1'><h1>Our Top</h1><div className='dish'><h1>Dishes</h1></div></div>
          <div className="topDishes">
            {products.slice(0, 4).map((product) => (
              <div className="text-2" key={product.id}>
                <div className='eatInfo'>
                  <h3 className='heal'>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className='dolar'>
                    <h2>${product.price}</h2>
                    <button className='btnPlus'>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="control">
            <Image src={control} alt="" className='' />
          </div>

          <div className="customer"><h1 className='customerName'>Customer</h1> <h1 className='say'>Say</h1></div>
          <div className="customerDiv">
            <div className="customer-1">
              <Image src={one} alt="" className='' />
            </div>
            <div className="customer-2">
              <Image src={two} alt="" className='customer-2' />
            </div>
          </div>

          <div className="emailForm">
            <div className="formContainer">
              <Image src={foiz} alt="" className='imageWithForm' />
              <form className='formEmail'>
                <input placeholder='Enter Your Email Address' type="email" id="email" name="email" />
                <button className='Subtitle' type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          <footer>
            <div className="footer-div-1">
              <Image src={logo} alt="" />
            </div>
            <div className="footer-div-2"></div>
            <div className="footer-div-3">
              <div className="div-fot-one"><p>© 2023 EATLY All Rights Reserved</p></div>
              <div className="div-fot-two"> <Image src={facetg} alt="" /></div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default MyHome;
