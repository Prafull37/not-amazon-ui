import {Link} from 'react-router-dom';

import Rating from "./Rating";

export default function Product({product}){
    
    return (
        <div className="card">
        <Link to={`/product/${product._id}`}>
            <img className="medium" src={`${process.env.PUBLIC_URL}${product.image}`} alt="product" />
        </Link>

        <div className="card-body">
            <Link to={`/product/${product._id}`}>
                <h2> {product.name}</h2>
            </Link>
            <div>{product.description}</div>
            <div className="rating">
                <Rating rating={product.rating} numOfReviews={product.numReviews}/>
            </div>
            <div className="price">
                ${product.price}
            </div>
        </div>
    </div>
    )
}