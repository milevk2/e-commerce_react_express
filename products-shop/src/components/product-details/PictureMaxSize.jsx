import { useContext } from "react";
import { LanguageContext } from "../../LanguageContext.jsx";

const PictureMaxSize = ({ imageSrc, closeImage }) => {

    const {isEnglish} = useContext(LanguageContext);

    return (
        <div className="flexCenterColumn">
            <img src={imageSrc} />

            <button className="backButton" onClick={() => closeImage()} type="button">{isEnglish? 'CLOSE PICTURE' : 'ЗАТВОРИ СНИМКА'}</button>

        </div>

    )


}

export default PictureMaxSize;