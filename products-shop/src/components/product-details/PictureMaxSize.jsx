
const PictureMaxSize = ({ imageSrc, closeImage }) => {


    return (
        <div className="flexCenterColumn">
            <img src={imageSrc} />

            <button className="backButton" onClick={() => closeImage()} type="button">CLOSE PICTURE</button>

        </div>

    )


}

export default PictureMaxSize;