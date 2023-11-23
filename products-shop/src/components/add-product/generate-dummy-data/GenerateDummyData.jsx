import styles from './GenerateDummyData.module.css'
import { post } from '../../../lib/request.js'

const GenerateDummyData = () => {


    async function dataFetcher(e) {

        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target))
        try {
            const response = await post('http://localhost:3000/autofill', null, data)

            console.log(response)
        }
        catch (err) {

            console.log(err.message);
        }
        finally{

            e.target.reset();
        }

    }

    return (

        <div className={styles.dummyForm}>
            <form onSubmit={dataFetcher}>
                <label className={styles.whiteText}>Fill Automatically. Choose a brand and the quantity of product data you want to fetch.</label>
                <div className={styles.marginFive}><label htmlFor="brand" className={styles.whiteText}>Product name:</label>
                    <select className={styles.marginFive} name='brand'>
                        <option value="samsung">Samsung</option>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="nokia">Nokia</option>
                    </select>
                </div>
                <div className={styles.marginFive}> <label htmlFor="quantity" className={styles.whiteText}>Quantity:</label>
                    <input className={styles.marginFive} type='number' name='quantity'></input>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}

export default GenerateDummyData;