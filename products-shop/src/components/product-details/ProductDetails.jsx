import { useEffect, useState, useContext } from 'react';
import styles from './ProductDetails.module.css'
import PictureMaxSize from './PictureMaxSize.jsx';
import UserComments from './Product comments/UserComments.jsx';
import EditProduct from './EditProduct.jsx';
import { deleteProduct, getProduct } from '../../services/productService.js'
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContext } from '../../LoadingContext.jsx';
import ProductSpecs from './product-specs/ProductSpecs.jsx';
import './ProductDetails.css'
import { LoggerContext } from '../../LoggerContext.jsx';
import { LanguageContext } from '../../LanguageContext.jsx';



//const image = "https://images.samsung.com/bg/smartphones/galaxy-s23-ultra/buy/03_Color_Selection/S23Ultra_Basic_Color/S23Ultra_Green_MO.jpg"

const ProductDetails = ({ setCart }) => {

    let { productId } = useParams();
    const { toggleLoading } = useContext(LoadingContext);
    const { token, userId } = useContext(LoggerContext);
    const { isEnglish } = useContext(LanguageContext);
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const [maxSize, setMaxSize] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [comments, setComments] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);

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

        setProductDetails({ ...updatedProduct });
    }

    async function onProductDelete() {

        const isConfirmed = window.confirm(isEnglish ? "Are you sure you want to delete this product?" : 'Сигурни ли сте, че искате да изтриете този продукт?');

        if (isConfirmed) {

            try {
                await deleteProduct(productId);

                navigate('/my_products');
            }
            catch (err) {

                navigate('*');
            }
            finally {
                toggleLoading();
            }
        }
    }

    useEffect(() => {

        getProduct(productId).then(product => {
            const commentArray = product.comments.slice();
            setProductDetails({ ...product });
            setComments([...commentArray]);

        }).catch(err => console.log(err));

    }, []);

    useEffect(() => {

        if (token) {

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

    }, [productDetails]);


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


                            {token && <button type="button" className={`defaultGreenText ${styles.zoomButton}`} onClick={seeMaxSize} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-zoom-in" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z">
                                    </path>
                                    <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z">
                                    </path>
                                    <path fillRule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z">
                                    </path>
                                </svg>
                            </button>}
                        </div>
                    </div>

                    <div className={styles.right1}>
                        <div className="headerDiv"><h4>{isEnglish ? 'Specifications' : 'Спецификации'}</h4></div>
                        {/* <div className={styles.traitsTable}>

                            <div className={styles.trait}><div className={styles.specHeader}> Category:</div> {productDetails.category}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>Announced:</div> {productDetails.announced}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>Display:</div> {productDetails.displaySize}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>RAM:</div> {productDetails.ram}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>CPU:</div> {productDetails.cpu}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>GPU:</div> {productDetails.gpu}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>Os:</div> {productDetails.operating_system}</div>
                            <div className={styles.trait}><div className={styles.specHeader}>Battery:</div> {productDetails.battery}</div>

                        </div> */}
                        <div className="info-container">
                            <div className="info-row">
                                <div className="icon">
                                </div>
                                <div className="info-text">
                                    <div>{isEnglish? 'Announced' : 'Обявен'}: {productDetails.announced}</div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="icon">

                                    <img src="/images/ram-icon.png" alt="RAM Icon" />
                                </div>
                                <div className="info-text">
                                    <div>{isEnglish? 'RAM: ' : 'Рам памет: '}{productDetails.ram}</div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="icon">

                                    <img src="/images/cpu-icon.png" alt="CPU Icon" />
                                </div>
                                <div className="info-text">
                                    <div>{isEnglish? 'CPU: ' : 'Процесор: '} {productDetails.cpu}</div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="icon">

                                    <img src="/images/os-icon.png" alt="OS Icon" />
                                </div>
                                <div className="info-text">
                                    <div>{isEnglish? 'OS: ' : 'Операционна система: '} {productDetails.operating_system}</div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.price} ${styles.heart}`}><p>{isEnglish? `Price: ${productDetails.price}bgn` : `Цена: ${productDetails.price}лв`} </p></div>
                        {!isOwner ? <div className={styles.center}>{token && <button type="button" className="btn btn-success buy" onClick={() => { setCart(true); setTimeout(() => { setCart(false) }, 1700) }}>
                        {isEnglish? 'Add to cart' : 'Добави в количката'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>}
                        </div> : ''}
                        {isOwner && < div className="card-body">
                            <div className="row justify-content-around" id="adminPanel">
                                <div className="price"><p>{isEnglish?'Available in stock': 'Налично количество'}: {productDetails.quantity}</p></div>
                                <a className="btn btn-warning col-4" onClick={() => setIsEdit(true)}>{isEnglish? 'EDIT' : 'Редактиране'}</a>
                                <a className="btn btn-danger col-4" onClick={(e) => {
                                    toggleLoading();
                                    onProductDelete(e);
                                }}>{isEnglish? 'DELETE' : 'Изтрий'}</a>
                            </div>
                        </div>}
                    </div>

                </div>

                <div className={styles.triggerContainer}>
                    <button className={styles.triggerButton} onClick={() => setShowSpecs(showSpecs => showSpecs ? false : true)}>{isEnglish? 'Show Product Details' : 'Покажи допълнителни детайли'}</button>
                </div>
                {showSpecs && <ProductSpecs product={productDetails} />}
            </div>}

            <UserComments comments={comments} setComments={commentsHandler} productId={productId} productDetails={productDetails} />
        </div>)


}

export default ProductDetails;