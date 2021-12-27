
import styled from 'styled-components';

function calculatePercentageFromRating(rating){
    rating=parseFloat(rating);
    const maxRating=5;
    const starPercentage=(rating/maxRating)*100;
    return Math.round(starPercentage/10)*10;
}

export default function Rating({rating=0,numOfReviews,children,reviewString=""}){

    return (
        <div style={{margin:"0 8px"}}>
            <StarMaker rating={rating}/>
            <i className="fa fa-chevron-down" style={{fontSize:"8px",opacity:"0.6",verticalAlign:"top",marginTop:"4px"}}></i>
           <NoOfRating>{numOfReviews}  {reviewString}</NoOfRating>
           {children}
        </div>
    )
}

export function StarMaker({rating}){
    
    // const halfOrEmptyClassName=half ? "-o-half":empty ? "-o":"";
    const width=calculatePercentageFromRating(rating);
    return (
        <StarOuter>
            <StarInner width={width}/>
        </StarOuter>
    )

} 

const StarOuter= styled.span`
    position:relative;
    display:inline-block;
    margin-right:5px;
    &:before{
    content: "\f005 \f005 \f005 \f005 \f005";
    font-family: "Font Awesome 5 Free";
    font-weight: 200;
    color: #ff9138 ;
    }
`;

const StarInner=styled.span`
    position:absolute;
    left:0;
    top:0;
    white-space:nowrap;
    overflow:hidden;
    width:${({width=0})=>`${width}%`};
    &:before{
        content: "\f005 \f005 \f005 \f005 \f005";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        color: #ff9138 ;
    }
`

const NoOfRating=styled.a`
    box-sizing: border-box;
    cursor: pointer;
    direction: ltr;
    font-size: 14px;
    line-height: 20px;
    color:#007185;
    margin-left:5px;
    &:hover{
        color: rgb(199, 81, 31) ;
        text-decoration:underline;
    }
`