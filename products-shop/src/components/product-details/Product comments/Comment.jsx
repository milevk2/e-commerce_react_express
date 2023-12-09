import { useEffect, useRef } from "react";
import styles from './UserComments.module.css'


const Comment = ({ comment }) => {
    const starsContainerRef = useRef(null);
  
    useEffect(() => {
      const stars = starsContainerRef.current?.children;
      if (stars) {
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const isStarFilled = i + 1 <= Number(comment.rating);
  
          star.classList.toggle(styles.checked, isStarFilled);
        }
      }
    }, [comment]);
  
    return (
      <div className={styles.comment}>
        <div className={styles.userDetails}>
          <div className={styles.avatar}>{comment.userName[0]}</div>
          <div className={styles.userName}>{comment.userName}</div>
        </div>
  
        <div className={styles.commentText}>
          <div>{comment.content}</div>
  
          <div className={styles.rating} ref={starsContainerRef}>
            <span className="fa fa-star" id="1"></span>
            <span className="fa fa-star" id="2"></span>
            <span className="fa fa-star" id="3"></span>
            <span className="fa fa-star" id="4"></span>
            <span className="fa fa-star" id="5"></span>
          </div>
        </div>
  
        <div className={styles.time}>{comment.time}</div>
      </div>
    );
  };

export default Comment;