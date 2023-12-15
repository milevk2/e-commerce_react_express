import { useContext, useState } from 'react';
import styles from './AddProductForm.module.css'
import { testSetErrors } from './util.js';
import { createProduct } from '../../services/productService.js';
import { defaultValues } from './EmptyProductForm.js';
import GenerateDummyData from './generate-dummy-data/GenerateDummyData.jsx'
import { LoadingContext } from '../../LoadingContext.jsx';
import { LoggerContext } from '../../LoggerContext.jsx';
import { LanguageContext } from '../../LanguageContext.jsx';


const AddProductForm = () => {

    const [formData, setFormData] = useState({ ...defaultValues })
    const [isQuantityError, setIsQuantityError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [generalErrorMessage, setGeneralErrorMessage] = useState('');
    const { toggleLoading } = useContext(LoadingContext);
    const { userId } = useContext(LoggerContext);
    const {specsEnum, isEnglish} = useContext(LanguageContext);

    async function addProductHandler(e) {

        e.preventDefault();
        //abort function in case of existing error:
        if (isQuantityError || isPriceError) return toggleLoading();

        //return if any of the input fields is empty and send error box to the user:
        if (Object.values(formData).some(input => input == '')) {

            setGeneralError(true);
            setGeneralErrorMessage('All fields are required!');
            return toggleLoading();
        }

        try {
    
            const body = {...formData, 'ownerId': userId};
            await createProduct(body);
        }
        catch (err) {

            setGeneralError(true);
            setGeneralErrorMessage(err.message);
        }
        finally{

            toggleLoading();
            setFormData({ ...defaultValues });
        }
        
    }

    function inputChangeHandler(e) {

        formData[e.target.name] = e.target.value;
        setFormData({ ...formData });
        setGeneralError(false);
    }

    //Checks for input errors on quantity and price and sets their respective error box if there is error:
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

    return (

            <div className={styles.contentManager}>
                <GenerateDummyData />
                <form onSubmit={(e)=>{
                    
                    toggleLoading();
                    addProductHandler(e)}}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="name" className={styles.whiteText}>{specsEnum.name}:</label></td>
                                <td><input type="text" id="name" name="name" placeholder={specsEnum.name} value={formData.name} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="announced" className={styles.whiteText}>{specsEnum.announced}:</label></td>
                                <td><input type="text" id="announced" name="announced" placeholder={specsEnum.announced} value={formData.announced} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="shortInfo" className={styles.whiteText}>{specsEnum.description}:</label></td>
                                <td><input type="text" id="description" name="description" placeholder={specsEnum.description} value={formData.description} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="price" className={styles.whiteText}>{specsEnum.price}:</label></td>
                                <td>
                                    <input onBlur={onBlurHandler} type="text" id="price" name="price" placeholder={specsEnum.price + ' ' + specsEnum.currency} value={formData.price} className={styles.managerInput} onChange={inputChangeHandler} />
                                    <div className={isPriceError ? styles.error : styles.hidden}>Price must be a number!</div>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="image" className={styles.whiteText}>{specsEnum.image}:</label></td>
                                <td><input type="text" id="image" name="image" placeholder={specsEnum.image} value={formData.image} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="quantity" className={styles.whiteText}>{specsEnum.quantity}:</label></td>
                                <td><input onBlur={onBlurHandler} type="text" id="quantity" name="quantity" placeholder={specsEnum.quantity} value={formData.quantity} className={styles.managerInput} onChange={inputChangeHandler} />
                                    <div className={isQuantityError ? styles.error : styles.hidden}>{isEnglish? 'Quantity must contain only numbers!': 'Количеството трябва да е число!'}</div>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="cpu" className={styles.whiteText}>{specsEnum.cpu}:</label></td>
                                <td><input type="text" id="cpu" name="cpu" placeholder={specsEnum.cpu} value={formData.cpu} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="gpu" className={styles.whiteText}>{specsEnum.gpu}:</label></td>
                                <td><input type="text" id="gpu" name="gpu" placeholder={specsEnum.gpu} value={formData.gpu} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="ram" className={styles.whiteText}>{specsEnum.memory}:</label></td>
                                <td><input type="text" id="ram" name="ram" placeholder={specsEnum.memory_format} value={formData.ram} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="storage" className={styles.whiteText}>Storage:</label></td>
                                <td><input type="text" id="storage" name="storage" placeholder="Storage" value={formData.storage} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="os" className={styles.whiteText}>{specsEnum.os}:</label></td>
                                <td><input type="text" id="os" name="operating_system" placeholder={specsEnum.os} value={formData.operating_system} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="category" className={styles.whiteText}>{specsEnum.category}:</label></td>
                                <td>
                                    <input type="text" id="category" name="category" placeholder={specsEnum.category} value={formData.category} className={styles.managerInput} onChange={inputChangeHandler} />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="battery" className={styles.whiteText}>{specsEnum.battery}:</label></td>
                                <td><input type="text" id="battery" name="battery" placeholder={specsEnum.battery} value={formData.battery} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                                <td><label htmlFor="displaySize" className={styles.whiteText}>{specsEnum.display}:</label></td>
                                <td><input type="text" id="displaySize" name="displaySize" placeholder={specsEnum.display_format} value={formData.displaySize} className={styles.managerInput} onChange={inputChangeHandler} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={generalError ? styles.error : styles.hidden}>{generalErrorMessage}</div>
                    <button type="submit" id="add" className={styles.managerSubmitBtn} > {isEnglish? 'Save' : 'Запис'}</button>
                </form>
            </div>
    )
}

export default AddProductForm;