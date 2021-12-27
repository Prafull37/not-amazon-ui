
import styled from 'styled-components';
import Rating from './Rating';

export default function ProductDetails({product,qty,setQuantity,addToCartFunction}){
    return (
    <ProductDetailArea>
        <ProductPosterSection product={product} />
        <ProductDetailsAndPrice>
             <ProductDescription product={product}/>
             <PurchaseArea product={product} qty={qty} setQuantity={setQuantity} addToCartFunction={addToCartFunction} />
        </ProductDetailsAndPrice>
    </ProductDetailArea>
    );
}   

const ProductPosterSection=({product})=>{
    const {details,name}=product;

    return (
        <ProductImageArea>
        <ProductPoster >
            <img src={process.env.PUBLIC_URL+product.image} alt={name +" "+ details} />
        </ProductPoster>
    </ProductImageArea>
    )
}
const ProductDetailArea=styled.div`
    display:flex;
    flex-direction: coloumn;
    margin:16px 0 24px 0;
`

const ProductImageArea=styled.div`
    flex-grow:4;
    display:flex;
    flex-direction:row;
    max-height:520px;
`

const ProductPoster=styled.div`
   width:100%;
    height:100%;
    & img{
        height:100%;
        width:100%;
    }
`

const ProductDetailsAndPrice=styled.div`
    display:flex;
    width:100%;
    flex-direction:row;
    justify-content:space-between;
`

const ProductDescription=({product})=>{
    const {name,description,price,rating,numReviews} = product;
    return (
        <ProductDescriptionArea>
             <h2> {name}</h2>
             <Rating rating={rating} numOfReviews={numReviews} reviewString="reviews" /> 
             <hr/>
             <Price >
                M.R.P : {price}
             </Price>
             <Description>
                 <div className="heading">Description : </div>
                  <div>
                      {description}
                  </div>
             </Description>
        </ProductDescriptionArea>
    )
}

const ProductDescriptionArea=styled.div`
    margin:1rem;
    flex-grow:1.5;
`;

const Price=styled.div`
     font-family:Helvetica,Arial, sans-serif;
    margin:1.6rem 0;
`;

const Description=styled.div`
    font-family:Helvetica,Arial, sans-serif;
    margin:1.6rem 0;
    font-weight:500; 
    & .heading{
        font-family:600 !important;
    }
`;

const PurchaseArea=(props)=>{
    const {seller="",name,rating,numReviews,price,countInStock} = props.product;
    
    return (
        <PurchaseContainer>
            <div className="card">
                <PurchaseBoxElement> 
                    <span>Seller</span> 
                    <span>{seller}</span>
                </PurchaseBoxElement>
                <PurchaseBoxElement> {name}</PurchaseBoxElement>
                <PurchaseBoxElement>
                    <div>
                        <Rating rating={rating} numOfReviews={numReviews} reviewString="reviews"/>
                    </div>
                </PurchaseBoxElement>
                <PurchaseBoxElement>
                    <span>Price</span> 
                    <span>{price}</span>
                </PurchaseBoxElement>
                <PurchaseBoxElement>
                    <span>Status</span> 
                    {countInStock >0 ? <span className="success"> In Stock</span>:<span className="error">Out Of Stock</span>}
                </PurchaseBoxElement>
                <PurchaseBoxElement>
                    <span>Qty.</span> 
                    <QtySelect onChange={(e)=>props.setQuantity(e.target.value)}>
                        {
                            countInStock >0 ? QuantityOption(countInStock):<QtyOption value={0} >0</QtyOption>
                        }
                    </QtySelect>
                </PurchaseBoxElement>
                {
                countInStock > 0 && (
                <AddToCartButton onClick={props.addToCartFunction} disabled={props.qty===0}>Add to Cart</AddToCartButton>
                )
                }
                
            </div>
        </PurchaseContainer>
    )
}

export const QuantityOption=(quantity)=>{
    let options=[];
    // selectedIndex = selectedIndex || 1;
    let selected;
    for(let i =1;i<=quantity;i++){
        // selected= selectedIndex===i ;
        options.push(<QtyOption value={i} key={i}>{i}</QtyOption>)
    }
    return options;
}

const PurchaseBoxElement=styled.div`
    margin:10px;
    display:flex;
    justify-content:space-between;
`

export const QtySelect=styled.select`

`;

export const QtyOption=styled.option`

`;

export const AddToCartButton=styled.button`
      border:2px solid #ffd814;
    background-color:#ffd814;
    padding:0.8rem 2rem;
    border-radius:25px;
    width:100%;
    cursor:pointer;
    &:hover{
        background-color:white;
        border:2px solid #ffd814;
    }
`;

const PurchaseContainer =styled.div`
;
flex-basis:350px;
flex-shrink:1;
display:inline-block;
 & > .card{
    padding:1.2rem;
 }
`