import {useState} from 'react';
import {Link} from 'react-router-dom';
import { AddToCartButton } from '../components/ProductDetails';
import {Wrapper,FormWrapper,Label,Input} from './SignInScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function RegisterScreen(props){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword]  = useState('');
    const [confirmPassword,setConfirmPassword]  = useState('');
    console.log(props)
    const dispatch = useDispatch();
    const redirect= `/${props.location.search!=="" ? props.location.search.split("=")[1] : ''}`;

    const user = useSelector(state=>state.userInfo.user)|| {};
    console.log("user",user);

    useEffect(() => {
        if(Object.keys(user).length>0){
            props.history.push(redirect)
        }
    }, [user,redirect]);

    const SubmitHandler= (e)=>{
        e.preventDefault();
        if(password === confirmPassword){
            dispatch({type:"CREATE_NEW_USER",  credentials:{name,email,password}})
            // console.log("lala",`/${props.location.search?.split("=")[1] || ''}`)
          
        }else{
            alert('Password and Confirm Password does not match');
        }
    }

    return (
        <Wrapper>
             <h2>Create Account</h2>
            <form onSubmit ={SubmitHandler}>
            <FormWrapper>
                <Label htmlFor="name">Name</Label> 
                <Input type="name" value={name} id="name" onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name" />
                
                <Label htmlFor="email">Email</Label>
                <Input type="email" value={email} id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email@email.com" />

                <Label htmlFor="password">Password</Label>
                <Input type="password" value={password} id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your Password" />

                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input type="password" value={confirmPassword} id="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm your Password" />

                <AddToCartButton type="submit">Register</AddToCartButton>
            </FormWrapper>
            </form>
            <div>
                <div>
                   Already have an Account <Link to={`/signin${redirect==="/"?"":"?redirect="+redirect}}`}>Sign In.</Link>
                </div>
            </div>
        </Wrapper>
    )

}