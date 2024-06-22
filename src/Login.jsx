import {useState, createContext, useContext } from 'react';
import {useNavigate, Navigate, Outlet} from 'react-router-dom';
import './App.css';
import { AuthContext } from "./context/AuthContext.jsx";
import bcrypt from "bcryptjs";


function Login(props){
    const { setIsLoggedIn } = useContext(AuthContext);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [demoNavigate, setDemoNavigate] = useState(false);

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


    return (
        <div className="loginWrapper">
            <h1 className="loginTitle">Login</h1>
            <form onSubmit={handleClick}>
                <label htmlFor="password" className="loginTitle">Enter Password:</label>
                    <input type="text" id ="password" name="password" onChange={handleChange}/><br/> 
                    <input type="submit" value="Submit"/>
                
            </form>
            <p className="loginTitle" id="loginTexty" ></p> <br/>
            <button id="DemoButton" onClick={handleClick2}> Demo Mode</button>
            {shouldNavigate && <Navigate to='/Map' replace={true} />}
            {demoNavigate && <Navigate to='/DemoMap'/>}
        </div>
    );
}

export default Login;