//combine the components EditProduct and AddProductForm so it becomes one component;

import { useEffect, useState } from 'react';
import styles from './EditProduct.module.css'
import { testSetErrors } from '../add-product/util.js';
//create and import a service for edit.

const EditProduct = ({ exitForm, productDetails }) => {

    const [formData, setFormData] = useState({ ...productDetails })
    const [isQuantityError, setIsQuantityError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [generalErrorMessage, setGeneralErrorMessage] = useState('');

    async function editProductHandler(e) {

        e.preventDefault();
        if (isQuantityError || isPriceError) return;

        if (Object.values(formData).some(input => input.toString() == '')) {

            setGeneralError(true);
            setGeneralErrorMessage('All fields are required!');
            return;
        }

        try {
            
            console.log('Product updated!');
            //implement editProduct service
        }
        catch (err) {

            setGeneralError(true);
            setGeneralErrorMessage(err.message);
        }
        exitForm();
    }

    function inputChangeHandler(e) {

        formData[e.target.name] = e.target.value;
        setFormData({ ...formData });
        setGeneralError(false);
    }

    function onBlurHandler(e) {

        const targetName = e.target.name;
        const targetValue = e.target.value;
        if (targetName !== 'quantity' && targetName !== 'price') return;

        const errorFields = {
            quantity: () => testSetErrors(targetValue, setIsQuantityError),
            price: () => testSetErrors(targetValue, setIsPriceError)
        }
        return errorFields[targetName]();
    }

    function exitEditForm(e) {

        if (e.target.className != '_layout_19ec5_1') return;
        exitForm();
    }

    return (

        <div className={styles.layout} onClick={exitEditForm}>

            <div className={styles.contentManager}>

                <form onSubmit={editProductHandler}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="name" className={styles.whiteText}>Product name:</label></td>
                                <td><input type="text" id="name" name="name" placeholder="Product name" value={formData.name} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="announced" className={styles.whiteText}>Announced:</label></td>
                                <td><input type="text" id="announced" name="announced" placeholder="Announce date" value={formData.announced} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="shortInfo" className={styles.whiteText}>Description:</label></td>
                                <td><input type="text" id="description" name="description" placeholder="Short info" value={formData.description} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="price" className={styles.whiteText}>Product Price:</label></td>
                                <td>
                                    <input onBlur={onBlurHandler} type="text" id="price" name="price" placeholder="Price BGN" value={formData.price} className={styles.managerInput} onChange={inputChangeHandler} />
                                    <div className={isPriceError ? styles.error : styles.hidden}>Price must be a number!</div>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="image" className={styles.whiteText}>Image Url:</label></td>
                                <td><input type="text" id="image" name="image" placeholder="Link to img" value={formData.image} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="quantity" className={styles.whiteText}>Quantity:</label></td>
                                <td><input onBlur={onBlurHandler} type="text" id="quantity" name="quantity" placeholder="Quantity" value={formData.quantity} className={styles.managerInput} onChange={inputChangeHandler} />
                                    <div className={isQuantityError ? styles.error : styles.hidden}>Quantity must contain only numbers!</div>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="cpu" className={styles.whiteText}>CPU:</label></td>
                                <td><input type="text" id="cpu" name="cpu" placeholder="cpu" value={formData.cpu} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="gpu" className={styles.whiteText}>GPU:</label></td>
                                <td><input type="text" id="gpu" name="gpu" placeholder="Graphic processing unit" value={formData.gpu} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="ram" className={styles.whiteText}>RAM:</label></td>
                                <td><input type="text" id="ram" name="ram" placeholder="RAM" value={formData.ram} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="storage" className={styles.whiteText}>Storage:</label></td>
                                <td><input type="text" id="storage" name="storage" placeholder="Storage" value={formData.storage} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="os" className={styles.whiteText}>OS:</label></td>
                                <td><input type="text" id="os" name="operating_system" placeholder="Android IOS" value={formData.operating_system} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="category" className={styles.whiteText}>Category:</label></td>
                                <td>
                                    <input type="text" id="category" name="category" placeholder="Category" value={formData.category} className={styles.managerInput} onChange={inputChangeHandler} />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="battery" className={styles.whiteText}>Battery:</label></td>
                                <td><input type="text" id="battery" name="battery" placeholder="battery" value={formData.battery} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="displaySize" className={styles.whiteText}>Display:</label></td>
                                <td><input type="text" id="displaySize" name="displaySize" placeholder="Inches" value={formData.displaySize} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={generalError ? styles.error : styles.hidden}>{generalErrorMessage}</div>
                    <button type="submit" id="add" className={styles.managerSubmitBtn} >Submit</button>
                </form>
            </div>
        </div>
    )

}

export default EditProduct;