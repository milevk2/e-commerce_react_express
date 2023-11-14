import { useEffect, useState } from "react";
import styles from './styles.module.css'
import { getAll } from '../services/userService.js'

const HomeLoad = () => {

    useEffect(() => {

        

        //getAllPhones();

    }, [])


    async function getAllPhones() {

        const response = await getAll()

    }

    return (

        <div className={styles.homeLoad}>

            <h1>This is header</h1>

        </div>

    )

}

export default HomeLoad;
