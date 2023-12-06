import { useEffect } from "react";
import styles from './UserComments.module.css'

const Comment = ({ comment }) => {

    useEffect(() => {

        const element = document.getElementById(`${comment.user_id}`)

        if (element) {
            const stars = Array.from(element.children);

            for (let star of stars) {

                if (Number(star.id) <= Number(comment.rating)) {

                    star.classList.add(styles.checked);
                    continue;
                }
                star.classList.remove(styles.checked);
            }
        }
    }, [])

    if (comment.content !== undefined) return (


        <div className={styles.comment}>

            <div className={styles.userDetails}>
                <div className={styles.avatar}>{comment.userName[0]}</div>
                <div className={styles.userName}>{comment.userName}</div>
            </div>

            <div className={styles.commentText}>

                <div>{comment.content}</div>

                <div className={styles.rating} id={comment.user_id}>

                    <span className="fa fa-star" id='1'></span>
                    <span className="fa fa-star" id='2'></span>
                    <span className="fa fa-star" id='3'></span>
                    <span className="fa fa-star" id='4'></span>
                    <span className="fa fa-star" id='5'></span>

                </div>

            </div>
            <div className={styles.time}>{comment.time}</div>

        </div>)
}

export default Comment;