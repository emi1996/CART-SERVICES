import React, { useState } from "react";
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "../App.css";
import logo from "../assets/logo.png";
import quotes from "../assets/quotes.png";
import quotesclose from "../assets/quotesclose.png";
import wallpaper from "../assets/wallpaper.png";
import cartdetails from "../assets/cartdetails.svg";
import samplecompanies from "../assets/samplecompanies.jpg";
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Index() {
    const [selecteddata, setSelecteddataa] = useState("home");
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            // If the product is already in the cart, update the quantity and newprice
            setCartItems(prevCart => prevCart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1, newprice: (item.quantity + 1) * item.price }
                    : item
            ));
        } else {
            // If the product is not in the cart, add it with quantity 1 and calculate newprice
            setCartItems(prevCart => [
                ...prevCart,
                { ...product, quantity: 1, newprice: product.price } // Assuming product.price is the initial price
            ]);
        }
    };


    const removeFromCart = (productId) => {
        // Find the index of the product in the cart
        const productIndex = cartItems.findIndex(item => item.id === productId);

        // If the product is in the cart, update quantity and newprice
        if (productIndex !== -1) {
            setCartItems(prevCart => {
                const updatedCart = prevCart.map((item, index) => {
                    if (index === productIndex) {
                        const newQuantity = item.quantity - 1;

                        if (newQuantity > 0) {
                            // If the new quantity is greater than 0, update quantity and newprice
                            return { ...item, quantity: newQuantity, newprice: newQuantity * item.price };
                        } else {
                            // If the new quantity is 0 or less, remove the item from the cart
                            return null;
                        }
                    } else {
                        return item;
                    }
                }).filter(Boolean); // Remove null values from the array
                return updatedCart;
            });
        }
    };




    const productDataList = () => {
        setSelecteddataa("products");
    };
    const homeData = () => {
        setSelecteddataa("home");
    }
    const cartDataList = () => {
        setSelecteddataa("cart");
    }
    return (
        <div>
            <div className="navigate">
                <span>
                    <img className="logo" src={logo} alt="Logo" />
                </span>
                <span>
                    <img src={wallpaper} alt="wallpaper" className="wallpaper" />
                </span>
            </div>

            <TabContext value={selecteddata}>
                <Box>
                    <TabList sx={{ borderBottom: 1 }} TabIndicatorProps={{ style: { backgroundColor: '#0e0d38' } }} style={{ width: 350, fontWeight: 600 }}>
                        <Tab label="Home" onClick={homeData} style={{ textTransform: "none", fontWeight: 600, fontSize: 14 }} value="home" />
                        <Tab label="Products" onClick={productDataList} style={{ textTransform: "none", fontWeight: 600, fontSize: 14 }} value="products" />
                        <Tab label="Cart" onClick={cartDataList} style={{ textTransform: "none", fontWeight: 600, fontSize: 14 }} value="cart" />
                    </TabList>
                </Box>
            </TabContext>
            {selecteddata === "products" ?
                <div>
                    <ProductList addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems} />
                </div>
                : selecteddata === "cart" ?
                    <div>
                        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
                    </div>
                    :
                    <div>
                        <Container>
                            <Row className="mx-0">
                                <Col >
                                    <div>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-12 text-center">
                                                    <h3 class="animate-charcter"> Better fulfillment starts with better software</h3>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <h1>Better fulfillment starts with better software</h1> */}
                                        <b className="subtext">
                                            Cart.com combines powerful channel management tools and tech-enabled logistics to enable B2C brands
                                            and B2B companies to sell and fulfill anywhere their customers want to buy, delivering results for the
                                            world's most celebrated brands and complex organizations.
                                        </b>
                                    </div>
                                      
                                </Col>
                                <Col>
                                    <img src={samplecompanies} />
                                </Col>
                                <Col>
                                    <img src={quotes} />
                                    <br />
                                    <span  class="flicker-text">
                                        The Cart team did a fantastic job this year handling the BFCM..AMAZING performance! Cart.com executive leadership team was...committed to making this our best peak season ever and yes, they did accomplish that goal!
                                    </span>
                                    <br />

                                    <img src={quotesclose} />

                                </Col>
                            </Row>
                            <Row>
                                
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-12 text-center">
                                                    <h3 class="animate-charcter">Solutions for selling and fulfilling everywhere
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <b className="subtext textpadding ">
Whether it's automating product listings across social and shopping channels, synchronizing pricing, inventory and orders across marketplaces, driving online or in-store sales or fulfilling orders across channels, Cart.com's unified commerce software and services enable companies to sell and fulfill anywhere their customers are.
</b>
<br/>
<img className="textpadding" src={cartdetails} />
<br/>

                            </Row>
                        </Container>
                    </div>
            }

            <footer className="footer">
                <p className="text-footer">
                    Copyright ©-All rights are reserved
                </p>
            </footer>
        </div >
    );
}



export default Index;
