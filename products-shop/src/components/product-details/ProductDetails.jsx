import { useEffect, useState } from 'react';
import styles from './ProductDetails.module.css'
import PictureMaxSize from './PictureMaxSize.jsx';
import UserComments from './Product comments/UserComments.jsx';
import EditProduct from './EditProduct.jsx';
import { deleteProduct, getProduct } from '../../services/productService.js'
import { useNavigate, useParams } from 'react-router-dom';
import jwtParser from '../../lib/jwtParser.js';


//const image = "https://images.samsung.com/bg/smartphones/galaxy-s23-ultra/buy/03_Color_Selection/S23Ultra_Basic_Color/S23Ultra_Green_MO.jpg"

const ProductDetails = ({ setCart }) => {

    let { productId } = useParams();
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const [maxSize, setMaxSize] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [comments, setComments] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();

    const toggleZoom = () => {
        setIsZoomedIn(!isZoomedIn);
    };

    const seeMaxSize = () => {

        setMaxSize(true);
    }

    function exitMaxSize() {

        setMaxSize(false);
        setIsZoomedIn(false);
    }

    function exitEdit() {

        setIsEdit(false);
    }

    function productDetailsUpdater(updatedProduct) {

        setProductDetails({ ...updatedProduct })
    }

    async function onProductDelete() {

        const isConfirmed = window.confirm("Are you sure you want to delete this product?");

        if (isConfirmed) {

            try {
                await deleteProduct(productId);
                navigate('/my_products');
            }
            catch (err) {
                navigate('*')
            }
        }
    }

    useEffect(() => {

        getProduct(productId).then(product => {
            const commentArray = product.comments.slice();
            setProductDetails({ ...product });
            setComments([...commentArray]);

        }).catch(err => console.log(err));

    }, [])

    useEffect(() => {

        const payload = jwtParser();

        if (payload) {

            const userId = payload._id
            if (productDetails.ownerId == userId) {

                setIsOwner(true);
            }
            else {
                setIsOwner(false);
            }
        }
        else {

            setIsOwner(false);
        }

    }, [productDetails])


    function commentsHandler(comments) {

        setComments([...comments])
    }
    return (

        <div className='flexCenterColumn'>
            {isEdit && <EditProduct exitForm={exitEdit} productDetails={productDetails} productId={productId} updateDetails={productDetailsUpdater} />}
            {maxSize ? <PictureMaxSize imageSrc={productDetails.image} closeImage={exitMaxSize} /> : <div className={styles.wrapper}>
                <div className={styles.some}>
                    <div className={styles.left1}>
                        <div className="headerDiv"><h4>{productDetails.name}</h4></div>
                        <div className={styles.imageDetails} onClick={toggleZoom}>


                            <img className={isZoomedIn ? styles.zoomIn : styles.zoomOut} src={productDetails.image} />


                            <button type="button" className={`defaultGreenText ${styles.zoomButton}`} onClick={seeMaxSize} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-zoom-in" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z">
                                    </path>
                                    <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z">
                                    </path>
                                    <path fillRule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={styles.right1}>
                        <div className="headerDiv"><h4>Specifications</h4></div>
                        <div className={styles.traitsTable}>

                            <div className={styles.trait}><div className={styles.specHeader}> Category:</div> {productDetails.category}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>Announced:</div> {productDetails.announced}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>Display:</div> {productDetails.displaySize}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>RAM:</div> {productDetails.ram}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>CPU:</div> {productDetails.cpu}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>GPU:</div> {productDetails.gpu}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>Os:</div> {productDetails.operating_system}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>Battery:</div> {productDetails.battery}</div>

                        </div>
                        <h4>Description</h4>
                        <p>
                            {productDetails.description}
                        </p>
                        <div className={`${styles.price} ${styles.heart}`}><p>Price: {productDetails.price}bgn</p></div>
                        {!isOwner ? <div className={styles.center}><button type="button" className="btn btn-success buy" onClick={() => { setCart(true); setTimeout(() => { setCart(false) }, 2000) }}>
                            Add to cart
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>
                        </div> : ''}
                        <div className="card-body">
                            {isOwner && <div className="row justify-content-around" id="adminPanel">
                                <div className="price"><p>Quantity:{productDetails.quantity}</p></div>
                                <a className="btn btn-warning col-4" onClick={() => setIsEdit(true)}>EDIT</a>
                                <a className="btn btn-danger col-4" onClick={onProductDelete}>DELETE</a>
                            </div>}
                        </div>
                    </div>

                </div>
            </div>}

            <UserComments comments={comments} setComments={commentsHandler} productId={productId} />
        </div>)


}

export default ProductDetails;