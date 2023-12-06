import { useEffect, useState } from 'react';
import styles from './UserComments.module.css'
import getDateTime from '../../../lib/getDateTime.js';
import Comment from './Comment.jsx';
import { updateProduct } from '../../../services/productService.js';


const UserComments = ({ comments, setComments, productId }) => {

    const [rating, setRating] = useState(0);

    async function addNewComment(e) {

        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        formData.time = getDateTime();
        formData.rating = rating;
        formData.comment = true;
        const updatedComments = [...comments, formData];

        try {
            const response = await updateProduct(productId, formData);
            console.log(response);
            setComments(updatedComments);
        }
        catch (err) {

            console.log(err);
        }
        finally{e.target.reset()}
    }

    function ratingHandler(e) {

        setRating(Number(e.target.id))
        const stars = Array.from(e.currentTarget.children);

        for (let star of stars) {

            if (Number(star.id) <= Number(e.target.id)) {

                star.classList.add(styles.checked);
                continue;
            }
            star.classList.remove(styles.checked);
        }
    }

    return (


        <div id="user-comments" className={styles.commentWrapper}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <h2 className="headerDiv" >Samsung Galaxy Tab A9+ - user opinions and reviews</h2>

            {comments && comments.length > 0 && comments.map(data => (
                <Comment comment={data} key={data._id || data.user_id} />
            ))}


            <form className={styles.addComment} onSubmit={addNewComment}>

                <label htmlFor='userName'>Your user name:</label>
                <input className={styles.roundedBorder} name='userName'></input>

                <label htmlFor='user_id'>Your user id:</label>
                <input className={styles.roundedBorder} name='user_id'></input>

                <label htmlFor='user_id'>Add comment:</label>
                <textarea name='content' className={styles.roundedBorder}></textarea>

                <label htmlFor='rating'>Your rating:</label>

                <div className={styles.rating} onClick={ratingHandler}>

                    <span className="fa fa-star" id='1'></span>
                    <span className="fa fa-star" id='2'></span>
                    <span className="fa fa-star" id='3'></span>
                    <span className="fa fa-star" id='4'></span>
                    <span className="fa fa-star" id='5'></span>

                </div>

                <button type='submit' className='defaultButton'>Submit</button>
            </form>



        </div>

    )
}

export default UserComments;