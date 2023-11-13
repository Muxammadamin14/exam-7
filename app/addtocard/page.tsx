"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../img/Logo (2).png";
import facetg from "../img/Socials.png";
import karxina from "../img/ant-design_shopping-cart-outlined.png";
import "../css/addto.min.css";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const Addtocard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    window.location.href = "/";
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="div">
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
                <Image src={karxina} alt="" />
              </div>
              <button className="logoutBtn" onClick={handleLogout}>
                Logout
              </button>
              <button className="headerbtnL">
                <span>{userData.name}</span>
              </button>
            </>
          ) : (
            <>
              <div className="imgKarx">
                <Image src={karxina} alt="" />
              </div>
              <button className="headerbtnL">
                <a href="/">Login</a>
              </button>
              <button className="headerbtnS">Sign Up</button>
            </>
          )}
        </div>
      </header>
      <div className="product-to-add">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <p>{item.title}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button
              className="remove"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Remove
            </button>
            <button
              className="btnPlus"
              onClick={() => handleIncreaseQuantity(item.id)}
            >
              +
            </button>
            <button
              className="btnMinus"
              onClick={() => handleDecreaseQuantity(item.id)}
            >
              -
            </button>
          </div>
        ))}
      </div>
      <footer>
        <div className="div-fot-one">
          <p>© 2023 EATLY All Rights Reserved</p>
        </div>
        <div className="div-fot-two">
          <Image src={facetg} alt="" />
        </div>
      </footer>
    </div>
  );
};

export default Addtocard;
