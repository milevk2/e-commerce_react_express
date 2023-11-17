import styles from './UserComments.module.css'

const UserComments = () => {



    return (


        <div id="user-comments" className={styles.commentWrapper}>
            
            <h2 className="headerDiv" >Samsung Galaxy Tab A9+ - user opinions and reviews</h2>

            <div className={styles.comment}>

                <div className={styles.userDetails}>
                    <div className={styles.avatar}>D</div>

                    <div className={styles.userName}>UserName</div>

                </div>
                <div className={styles.comment}>Comment</div>

                <div>This is a postDatetime</div>

            </div>

            <div className={styles.comment}>

                <div className={styles.userDetails}>
                    <div className={styles.avatar}>D</div>

                    <div className={styles.userName}>UserName</div>

                </div>
                <div className={styles.comment}>Comment2</div>

                <div>This is a postDatetime</div>

            </div>

        </div>

    )
}

export default UserComments;