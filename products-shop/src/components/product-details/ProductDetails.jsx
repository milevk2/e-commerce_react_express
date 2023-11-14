import { useEffect, useState } from 'react';
import styles from './ProductDetails.module.css'
import PictureMaxSize from './PictureMaxSize.jsx';
import UserComments from './Product comments/UserComments.jsx';



const image = "https://images.samsung.com/bg/smartphones/galaxy-s23-ultra/buy/03_Color_Selection/S23Ultra_Basic_Color/S23Ultra_Green_MO.jpg"

const ProductDetails = ({setCart}) => {

    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const [maxSize, setMaxSize] = useState(false)

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

    return (
        <div className='flexCenterColumn'>
        {maxSize ? <PictureMaxSize imageSrc={image} closeImage={exitMaxSize}/> : <div className={styles.wrapper}>
        <div className={styles.some}>
            <div className={styles.left1}>
                <div className="headerDiv"><h4>Title</h4></div>
                <div className={styles.imageDetails} onClick={toggleZoom}>


                    <img className={isZoomedIn ? styles.zoomIn : styles.zoomOut} src="https://images.samsung.com/bg/smartphones/galaxy-s23-ultra/buy/03_Color_Selection/S23Ultra_Basic_Color/S23Ultra_Green_MO.jpg" />


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
                <div className="headerDiv"><h4>Характеристики</h4></div>
                <div className={styles.traitsTable}>
                    <table>
                        <tbody>
                            <tr>
                                <td><p className={styles.trait}>Цвят:</p></td><td><p>blue</p></td>
                            </tr>
                            <tr>
                                <td><p className={styles.trait}>Екран:</p></td><td><p>4 инча</p></td>
                            </tr>
                            <tr>
                                <td><p className={styles.trait}>RAM:</p></td><td><p>8 ГБ</p></td>
                            </tr>
                            <tr>
                                <td><p className={styles.trait}>Пространство:</p></td><td><p>64 ГБ</p></td>
                            </tr>
                            <tr>
                                <td><p className={styles.trait}>ОС: </p></td><td><p>Android</p></td>
                            </tr>
                            <tr>
                                <td><p className={styles.trait}>Product ID: </p></td><td><p>a6081d7f-5f15-4e8a-a422-8fb938834fdb</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4>Кратка информация</h4>
                <p>
                </p>
                <div className={`${styles.price} ${styles.heart}`}><p>Цена: 444лв</p></div>
                <div className={styles.center}><button type="button" className="btn btn-success buy"  onClick={()=>{setCart(true); setTimeout(()=>{setCart(false)},2000)}}> 
                    Добави в количката
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z">
                        </path>
                    </svg>
                </button>
                </div>
                <div className="card-body">
                    <div className="row justify-content-around" id="adminPanel">
                        <div className="price"><p>Количество:44</p></div>
                        <a className="btn btn-warning col-4" href="/Edit/Phones/-NWNWEnAWg2E9ydiavV3">EDIT</a>
                        <a className="btn btn-danger col-4" href="/Delete/Phones/-NWNWEnAWg2E9ydiavV3">DELETE</a>
                    </div>
                </div>
            </div>

        </div>
    </div>}

    <UserComments />
    </div>)


}

export default ProductDetails;