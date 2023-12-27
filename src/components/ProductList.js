import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faClose } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './common.css'
import { Col, Row } from 'react-bootstrap';

const ProductList = ({ addToCart, removeFromCart }) => {
    const [products, setProducts] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [getDetails, setDetails] = useState([]);

    const [sliderSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    useEffect(() => {
        // Replace the URL with your dummy API endpoint
        axios.get('https://dummyjson.com/products')
            .then(response => {
                // Assuming your API response includes a 'quantity' property for each product
                const productsWithQuantity = response?.data?.products.map(product => ({
                    ...product,
                    quantity: 0, // Set the initial quantity to 0
                }));
                setProducts(productsWithQuantity);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const renderImages = (thumbnail) => (
        <img
            src={thumbnail}
            alt="Product Thumbnail"
            style={{ width: 50, height: 500 }}
        />
    );
    const handleClose = () => {
        setShowDetails(false)
    }
    const viewDetails = (row) => {
        setDetails(row)
        console.log("row det", row);
        setShowDetails(true)
    }

    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            width: '50%',
            margin: 'auto',
            height: '600px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        },
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            width: 150,
            renderCell: (params) => renderImages(params.row.thumbnail),
        },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'price', headerName: 'Price', width: 130 },
        {
            field: 'addToCart',
            headerName: 'Add to Cart',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={() => addToCart(params.row)}
                        style={{ backgroundColor: '#77DD76', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
                    >
                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '20px' }} />
                    </button>
                </div>
            ),
        },
        {
            field: 'viewDetails',
            headerName: 'View Details',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={() => viewDetails(params.row)}
                        style={{ backgroundColor: '#aec6cf', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
                    >
                        <FontAwesomeIcon icon={faEye} style={{ fontSize: '20px' }} />
                    </button>
                </div>
            ),
        },
    ];
    const sliderContainerStyle = {
        flex: 1,
        marginRight: '20px',
    };

    const detailsContainerStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column', // Align items in a column
        alignItems: 'center', // Center-align items horizontally
        justifyContent: 'center', // Center-align items vertically
    };

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <h2>Choose your Products</h2>

                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={false}
                />
            </div>

            {showDetails && (
                <Modal
                    isOpen={showDetails}
                    onRequestClose={handleClose}
                    style={modalStyle}
                    contentLabel="View Details Modal"
                >
                    {/* Your modal content goes here */}
                    <div>
                        <h2>{getDetails.title}</h2>
                        <Row>
                            <Col md={6}>
                                <Slider {...sliderSettings}>
                                    {getDetails.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', margin: '0 auto' }} />
                                        </div>
                                    ))}
                                </Slider>
                            </Col>
                            <Col md={6}>
                                <div className="details" style={detailsContainerStyle}>
                                    <div className='description'>{getDetails.description}</div>
                                    <div>Price: <b>$ {getDetails.price}</b></div>
                                    <div>Discount Percentage: <b>{getDetails.discountPercentage}</b>%</div>
                                    <div>Rating: <b>{getDetails.rating}</b></div>
                                    <div>Stock: <b>{getDetails.stock}</b></div>
                                    <div>Brand: <b>{getDetails.brand}</b></div>
                                    <div>Category: <b>{getDetails.category}</b> </div>
                                    <br />

                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/* <br/>
                    <div className='modalfooter'>
                        <button className='close' onClick={handleClose}>
                            Close Modal
                        </button>
                    </div> */}
                </Modal >
            )}
        </>
    );
};

export default ProductList;
