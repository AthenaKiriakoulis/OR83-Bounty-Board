import {useState, useRef, createContext, useContext } from 'react';
import {useNavigate, Navigate, Outlet} from 'react-router-dom';
import './App.css';
import { AuthContext } from "./context/AuthContext.jsx";
import bcrypt from "bcryptjs";


function Login(props){
    const { setIsLoggedIn } = useContext(AuthContext);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [demoNavigate, setDemoNavigate] = useState(false);
    const blob = useRef(null);

    const [input, setInput] = useState([]);
    const navigate = useNavigate();

    //adds data from form into object
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]: value}))
    }
    
    //when button clicked, compares password with hashed password
    const handleClick = (event) => {
        event.preventDefault();


        const hashpassword = "$2a$10$bsi67NOzdT4Tf49Q2DaGV.HfSXH6G7IFIt6InPkEKas8Rai/I7gC.";
        const saltRounds = 10;
        //this was for testing hashed passwords
        /*
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
            // returns hash
            console.log(hash);
            });
          });
          */
        
        //compares passwords
        bcrypt.compare(input.password, hashpassword, function(err, result) {
            if (result) {
                console.log("It matches!");
                setIsLoggedIn(true);
                setShouldNavigate(true);
            }
            else {
                document.getElementById("loginTexty").textContent = "Password Invalid";
            }
        });
    }


    //when button clicked, compares password with hashed password
    const handleClick2 = (event) => {
        setDemoNavigate(true);
    }



    const followMouse = (event) => {
        const { clientX, clientY } = event;
        if(blob.current){
            blob.current.animate({
                left: `${clientX - 100}px`,
                top: `${clientY - 100}px`
        
            }, {duration: 1000, fill: "forwards"})
        }
    }


    return (

        <div className="home-wrapper" id="home-wrapper"  onPointerMove={followMouse}>
        <div className="blob1" ref={blob}></div>
        <h1 className = "home-title">OR83 Bounty Board</h1>
        <div className="login-wrapper">
            <div className="login-border"></div>
            <div className="login-background">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleClick}>
                    <label htmlFor="password" className="login-enter">Enter Password:</label>
                        <input className="login-text" type="text" id ="password" name="password" onChange={handleChange}/><br/> 
                        <input className="login-submit" type="submit" value="Submit"/>
                    
                </form>
                <p className="login-title" id="login-text" ></p> <br/>
                <button className="login-demo" id="DemoButton" onClick={handleClick2}> Demo Mode</button>
                {shouldNavigate && <Navigate to='/Map' replace={true} />}
                {demoNavigate && <Navigate to='/DemoMap'/>}
            </div>
        </div>
        </div>
    );
}

export default Login;