import { BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import ProductScreen from "./screen/ProductScreen";
import HomeScreen from './screen/HomeScreen';
import CartScreen from './screen/CartScreen';
import SignInScreen from './screen/SignInScreen';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import RegisterScreen from './screen/RegisterScreen';
// import { userSignOut } from './redux/actions/userAction';


function App() {
  const dispatch= useDispatch()
  const state = useSelector((state)=>state)
  console.log("State",state)
  const cartItems=state?.cart?.cartItems?.length  || 0;

  const userInfo =state.userInfo.user||{};

  return (<Router
    forceRefresh={true}
  >
            
    <div className="App">
      <div className="grid-container">
        <header className="rows">
            <div>
                <Link to="/" className="brand">amazon</Link>
            </div>
            <Div>
               {(Object.keys(userInfo).length===0) ?(<Link to="/signin"> Sign In</Link>): (
                 
                <Dropdown className="dropdown">
                  <Link to="#">
                   {userInfo?.name} <i className="fa fa-caret-down"></i>
                   </Link>
                   <DropdownContent className="dropdown-content">
                      <div onClick={(e)=>dispatch({type:"USER_TAKE_SIGNOUT"})}>
                        Sign Out
                      </div>
                   </DropdownContent>
                </Dropdown>   
               )}
                <Link to="/cart">Cart {cartItems.length>0 && <Span>{cartItems}</Span>}</Link>
            </Div>
        </header>
        <main>
        <Switch>
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/signin" component={SignInScreen} />
          <Route exact path="/" component={HomeScreen} /> 
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/register" component={RegisterScreen} />
        </Switch>
        </main>
        <footer className="rows center">
            All right reserved
        </footer>
    </div>
    </div>
    </Router>
  );
}

const Div=styled.div`
    display:flex;
    width:15%;
    max-width:100px;
    margin-right:15px;
    justify-content:space-between; 
    align-items:center;
`

const Span= styled.span`
  background-color:red;
  width:100%;
  height:100%;
  color:white;
  font-size:12px;
  padding:4px;
  border-radius:50%;
  text-align:center
`;

const Dropdown= styled.div`
   &.dropdown{
    top:5px;
    position:relative;
    height:30px;
   }
  &:hover .dropdown-content {
    display:block;
  }
`;

const DropdownContent=styled.ul`
&.dropdown-content{
  position:absolute;
  display:none;
  left:0;
  width:65px;
  padding:1rem;
  margin:0;
  margin-top:0.4rem;
  border-radius:0.5rem;
  z-index:1;
  background-color:#203040;
  cursor:pointer;
}
`;

export default App;
