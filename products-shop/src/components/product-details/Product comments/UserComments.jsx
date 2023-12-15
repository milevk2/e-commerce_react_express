import { useState, useContext } from 'react';
import styles from './UserComments.module.css'
import getDateTime from '../../../lib/getDateTime.js';
import Comment from './Comment.jsx';
import { updateProduct } from '../../../services/productService.js';
import { v4 as uuidv4 } from 'uuid';
import { LoggerContext } from '../../../LoggerContext.jsx';
import { LanguageContext } from '../../../LanguageContext.jsx';


const UserComments = ({ comments, setComments, productId, productDetails }) => {

    const [rating, setRating] = useState(0);
    const {userName, userId} = useContext(LoggerContext);
    const {isEnglish} = useContext(LanguageContext);

    async function addNewComment(e) {

        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        formData.userName = userName;
        formData.user_id = userId;
        formData.time = getDateTime();
        formData.rating = rating;
        formData.comment = true; //this line is needed in order to trigger the correct userService in the backend;
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
            <h2 className="headerDiv" >{productDetails.name} - {isEnglish? 'user opinions and reviews:' : 'потребителски мнения и ревюта:'}</h2>

            {comments && comments.length > 0 && comments.map(data => (
               
                <Comment comment={data} key={data.commentId} />
            ))}

           { userName && <form className={styles.addComment} onSubmit={addNewComment}>

                <label htmlFor='content'>{isEnglish? 'Add comment:' : 'Добави коментар:'}</label>
                <textarea name='content' className={styles.roundedBorder}></textarea>
                <label htmlFor='rating'>{isEnglish? 'Your rating:' : 'Вашата оценка:'}</label>

                <div className={styles.rating} onClick={ratingHandler}>

                    <span className="fa fa-star" id='1'></span>
                    <span className="fa fa-star" id='2'></span>
                    <span className="fa fa-star" id='3'></span>
                    <span className="fa fa-star" id='4'></span>
                    <span className="fa fa-star" id='5'></span>

                </div>

                <button type='submit' className='defaultButton'>{isEnglish? 'Comment' : 'Коментирай'}</button>
            </form>}
        </div>

    )
}

export default UserComments;