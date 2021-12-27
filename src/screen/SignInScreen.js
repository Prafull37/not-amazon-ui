import {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AddToCartButton } from '../components/ProductDetails';
import { useDispatch } from 'react-redux';

export default function SignInScreen(props){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword,setShowPassword] = useState('');

   const dispatch = useDispatch();
   const redirect= `/${props.location.search!=="" ? props.location.search.split("=")[1] : ''}`;
    console.log("Ra",redirect);
    const SubmitHandler= (e)=>{
        e.preventDefault();
        dispatch({type:"FETCH_USER_DETAILS",  credentials:{email,password}})

        // console.log("lala",`/${props.location.search?.split("=")[1] || ''}`)
        props.history.push(redirect);
    }
    return (
        <Wrapper>
            <h2>Sign In</h2>
            <form onSubmit ={SubmitHandler}>
            <FormWrapper>
                <Label htmlFor="email">Email</Label>
                <Input type="email" value={email} id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email@email.com" autoComplete="email" />

                <Label htmlFor="password">Password</Label>
                <Input type={showPassword?"text":"password"} value={password} id="password" onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password" placeholder="Enter your Password" />
                <Div as={Link} to="/forgotpassword">Forgot Password </Div>

                <Div>
                <Input type="checkbox" id="showPass" onChange={(e)=>setShowPassword(e.target.checked)} />
                <Label htmlFor="showPass">Show Password</Label>
                </Div>
                <AddToCartButton type="submit">Submit</AddToCartButton>
            </FormWrapper>
            </form>
            <div>
                <div>
                    Do not have account? <Link to={`/register${redirect==="/"?"":"?redirect="+redirect}`}>Create Account</Link>
                </div>
            </div>
        </Wrapper>
    )
}

export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    & > h2{
        font-size:24px;
    }
    & > form{
        width:100%;
    }

    & button{
        margin-top:8px;
        margin-bottom:8px;
    }
`

export const FormWrapper = styled(Wrapper)`
    width:40%;
   margin:0 auto;
`
export const Label = styled.label`
    align-self:flex-start;
    font-weight:700;
`

export const Input = styled.input.attrs(props=>({
    type:props.type
}))`
 width:${props=>props.type ==="checkbox"?"5%":"95%"};;
 margin: ${props=>props.type ==="checkbox"?0:"12px"};
 padding:12px;
`;

export const Div= styled.div`
    align-self:flex-start;
    width:100%;
    margin:4px 0;
`