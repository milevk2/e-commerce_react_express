import { useContext } from 'react';
import './ProductSpecs.css'
import { LanguageContext } from '../../../LanguageContext.jsx';


const ProductSpecs = ({ product }) => {

    const {specsEnum} = useContext(LanguageContext);

    return (

        <div className="table-container">
            <div className="table-row">
                <div className="property-name">{specsEnum.name}</div>
                <div className="property-value">{product.name}</div>
            </div>
            <div className="table-row">
                <div className="property-name">{specsEnum.announced}</div>
                <div className="property-value">{product.announced}</div>
            </div>
            <div className="table-row">
                <div className="property-name">{specsEnum.display}</div>
                <div className="property-value">{product.displaySize}</div>
            </div>
            <div className="table-row">
                <div className="property-name">{specsEnum.os}</div>
                <div className="property-value">{product.operating_system}</div>
            </div>
            <div className="table-row">
                <div className="property-name">{specsEnum.cpu}</div>
                <div className="property-value">{product.cpu}</div>
            </div>
            <div className="table-row">
                <div className="property-name">{specsEnum.gpu}</div>
                <div className="property-value">{product.gpu}</div>
            </div>
            <div className="table-row">
                <div className="property-name">{specsEnum.memory}</div>
                <div className="property-value">{product.ram}</div>
            </div>
            <div className="table-row">
                <div className="property-name">{specsEnum.battery}</div>
                <div className="property-value">{product.battery}</div>
            </div>
        </div>
    )
}

export default ProductSpecs;