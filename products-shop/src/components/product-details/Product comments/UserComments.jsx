import { useState, useContext } from 'react';
import styles from './UserComments.module.css'
import getDateTime from '../../../lib/getDateTime.js';
import Comment from './Comment.jsx';
import { updateProduct } from '../../../services/productService.js';
import jwtParser from '../../../lib/jwtParser.js';
import { v4 as uuidv4 } from 'uuid';
import { LoggerContext } from '../../../LoggerContext.jsx';

LoggerContext
const UserComments = ({ comments, setComments, productId, productDetails }) => {

    const [rating, setRating] = useState(0);
    const {userName, userId, userEmail} = useContext(LoggerContext); // takes user data from the sessionStorage

    async function addNewComment(e) {

        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        formData.userName = userName;
        formData.user_id = userId;
        formData.time = getDateTime();
        formData.rating = rating;
        formData.comment = true;
        formData.commentId = uuidv4();
        const updatedComments = [...comments, formData];
        
        try {
           await updateProduct(productId, formData);
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
            <h2 className="headerDiv" >{productDetails.name} - user opinions and reviews</h2>

            {comments && comments.length > 0 && comments.map(data => (
               
                <Comment comment={data} key={data.commentId} />
            ))}

           { userName && <form className={styles.addComment} onSubmit={addNewComment}>

                <label htmlFor='content'>Add comment:</label>
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
            </form>}
        </div>

    )
}

export default UserComments;