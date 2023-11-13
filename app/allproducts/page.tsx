"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../img/Logo (2).png";
import facetg from '../img/Socials.png';
import karxina from '../img/ant-design_shopping-cart-outlined.png';
import '../css/All.min.css'
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const AllProducts = () => {
  const [userData, setUserData] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const productsPerPage = 7;

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    axios
      .get<Product[]>("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (product: Product) => {
    let cart: Product[] = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const filteredProducts = currentProducts.filter((product) => {
    const { title, description } = product;
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
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
            <div className="imgKarx">
              <a href="/addtocard">
                <Image src={karxina} alt="" />
              </a>
            </div>
          ) : null}
        </div>
      </header>

      {userData ? (
        isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="topDishes">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="searchInput"
            />
            {filteredProducts.map((product) => (
              <div key={product.id} className="text-2">
                <div className="eatImage">
                  <h1>{product.id}</h1>
                </div>
                <div className="eatInfo">
                  <h3 className="heal">{product.title}</h3>
                  <p>{product.description}</p>
                  <div className="dolar">
                    <h2>{product.price}</h2>
                    <button className="btnPlus" onClick={() => handleAddToCart(product)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : null}

      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="paginationButton">
            {index + 1}
          </button>
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

export default AllProducts;
