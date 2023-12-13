import './ProductSpecs.css'

const ProductSpecs = ({ product }) => {


    return (

        <div className="table-container">
            <div className="table-row">
                <div className="property-name">Name</div>
                <div className="property-value">{product.name}</div>
            </div>
            <div className="table-row">
                <div className="property-name">Announced</div>
                <div className="property-value">{product.announced}</div>
            </div>
            <div className="table-row">
                <div className="property-name">Display Size</div>
                <div className="property-value">{product.displaySize}</div>
            </div>
            <div className="table-row">
                <div className="property-name">Operating System</div>
                <div className="property-value">{product.operating_system}</div>
            </div>
            <div className="table-row">
                <div className="property-name">CPU</div>
                <div className="property-value">{product.cpu}</div>
            </div>
            <div className="table-row">
                <div className="property-name">GPU</div>
                <div className="property-value">{product.gpu}</div>
            </div>
            <div className="table-row">
                <div className="property-name">RAM</div>
                <div className="property-value">{product.ram}</div>
            </div>
            <div className="table-row">
                <div className="property-name">Battery</div>
                <div className="property-value">{product.battery}</div>
            </div>
        </div>
    )
}

export default ProductSpecs;