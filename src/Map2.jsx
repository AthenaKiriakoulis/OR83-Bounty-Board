import {useEffect, useState, useMemo, useRef, useCallback} from "react";

import daMap from "./assets/USMap1.png";
import pointP from "./assets/point-purple.png";
import pointR from "./assets/point-red.png";
import pointB from "./assets/point-blue.png";
import pointG from "./assets/point-grey.png"
import aPointP from "./assets/assignedPointPurple.png";
import aPointR from "./assets/assignedPointRed.png";
import aPointB from "./assets/assignedPointBlue.png";
import aPointG from "./assets/assignedPointGrey.png";


import "./App.css";

function Map2(props){
    let foundIt = false;
    let rect;
    let indexVar = "";
    let textArr =["textyX", "textyY", "textyTitle", "textyType", "textyDesc", "textyAssign"]
    const initialFetch = useRef(true);
    
    const [points, setPoints] = useState([]);
    //controls which form is shown. If showform[2] is true, first form is shown. 
    //If showform[3] is true, second form is shown
    const [showForm, setShowForm] = useState([0,0,false,false]);
    const [input, setInput] = useState([]);
    const [rectSize, setRectSize] = useState(null);
    


    //helper function to take care of info text display changes
    const textyHelper = (arr, choice) => {
        for(let i in arr){
            if(choice == "blank"){
                document.getElementById(arr[i]).textContent = "";
            }
            else{
                document.getElementById(arr[i]).style.display = choice;
            }           
        }     
      }

    //this allows the assign form to be shown
    const assignFormHelper = () => {
        //this updates showForm to only change showform[3] to true
        const updateForm = showForm.map((val, index) => {
            if(index == 3){
                return val = true;
            }
            else{
                return val;
            }
        });
        setShowForm(updateForm);
        document.getElementById("textyButton").style.display = "none";

    }

    //runs when map is clicked 
    const handleClick = ({pageX, pageY, clientX, clientY}) => {
        const rect = document.getElementById("clickSpace").getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        foundIt = false;
        points.forEach((pointy) => {
            let pointyCheckX = pointy.x * rectSize.width + rectSize.left + scrollX
            let pointyCheckY = pointy.y * rectSize.height + rectSize.top + scrollY
            //if map click is in the range of an existing point
            if(((pageX <= (pointyCheckX + 15)) && (pageX >= (pointyCheckX - 15)) ) && ((pageY <= (pointyCheckY + 15)) && (pageY >= (pointyCheckY - 15)) )){
                foundIt=true;
                setShowForm([pointy.x,pointy.y,false,false])
                document.getElementById("headery").textContent= "Task Info" ;
                document.getElementById("textyX").textContent = "X Coordinate: " + pointy.x;
                document.getElementById("textyY").textContent = "Y Coordinate: " + pointy.y;
                document.getElementById("textyTitle").textContent = "Task Title: " + pointy.title;
                document.getElementById("textyType").textContent = "Task Type: " + pointy.type;
                document.getElementById("textyDesc").textContent = "Description: " + pointy.desc;
                document.getElementById("textyAssign").textContent = "Assigned To: " + pointy.assigned;

                document.getElementById("textyButton").style.display = "block";
                document.getElementById("textyButton2").style.display = "block";
                
                //makes text appear
                textyHelper(textArr, "block");
                
                
            }
            else{
            }
        
        });
        //if click wasnt in the range of any of the points
        if(points.length == 0 || foundIt == false){
            document.getElementById("headery").textContent= "Create New Task";

            //show the form with click coordinates already in the form
            
            setShowForm([x,y,true,false]);
            document.getElementById("textyButton").style.display = "none";
            document.getElementById("textyButton2").style.display = "none";
            textyHelper(textArr, "none");
            textyHelper(textArr, "blank");


        }
    }

    //adds data from form into object
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]: value}))
      }


      //runs when task create form is submit, adds form data to point data list
    const handleSubmit = (event) => {
        const rect = document.getElementById("clickSpace").getBoundingClientRect();
        event.preventDefault();
        const newX = (showForm[0]) / rect.width;
        const newY = (showForm[1]) / rect.height;
        if(input.type == undefined){
            input.type = "NPC";
        }
        
        
        setPoints((points) => {
            const newPoints = [...points, {
              id: "X" + newX + "Y" + newY,        
              x: newX,      
              y: newY,      
              title: input.title,      
              type: input.type,      
              desc: input.desc,      
              assigned: ""      
            }];
            return newPoints;      
          }); // <--- Call the memoized function
        
        //tells form to hide
        setShowForm([0,0,false,false]);
        document.getElementById("headery").textContent= "Task Created!";
      }



    //runs when taske assign is submit, adds form data to point data list
    const handleSubmit1 = (event) => {
        event.preventDefault();
        //finds right point in point list and changes assigned value to form input
        
        const pointID = "X" + showForm[0] + "Y" + showForm[1];
        const newpointArr = [...points];
        const index = newpointArr.findIndex((point) => point.id === pointID);
        if (index!== -1) {
            console.log("I got herrrre")
            const updatedPoint = newpointArr[index];
            updatedPoint.assigned = input.assignee;
            if(updatedPoint.type.slice(-1) !== "A"){
                updatedPoint.type += "A";
            }
            else{
                updatedPoint.type = updatedPoint.type;
            } 
            setPoints(newpointArr);
          }else{
            console.log("Error: Point Not Found")
        }
        //tells form to hide
        setShowForm([0,0,false,false]);
        document.getElementById("headery").textContent = "Task Assigned!";
        document.getElementById("textyButton").style.display = "none";
        document.getElementById("textyButton2").style.display = "none";
        textyHelper(textArr, "none");
        textyHelper(textArr, "blank");
        }

    //runs when delete button is clicked and preps delete function
    const handleDelete = () => {     
        const pointID = "X" + showForm[0] + "Y" + showForm[1];
        console.log(pointID);
        const newpointArr = [...points];
        console.log(newpointArr);
        const index = newpointArr.findIndex((point) => point.id === pointID);
        console.log(index);
        if (index!== -1) {
            newpointArr.splice(index, 1); 
            setPoints(newpointArr);
          }else{
            console.log("Error: Point Not Found")
        }
        //tells form to hide
        setShowForm([0,0,false,false]);
        document.getElementById("headery").textContent = "Task Deleted!";
        document.getElementById("textyButton").style.display = "none";
        document.getElementById("textyButton2").style.display = "none";
        textyHelper(textArr, "none");
        textyHelper(textArr, "blank");
        }

  


       

/////////////////////////////////////////////////////////////
        //updates the point positions for when the 
        useEffect(() => {
            console.log("page effected");
            const resize  = () => {
                rect = document.getElementById("clickSpace").getBoundingClientRect();
                setRectSize({width: rect.width, height: rect.height, left: rect.left, top: rect.top});
            }
            window.addEventListener('resize', resize);
            resize();
            return () => {
              window.removeEventListener('resize', resize);
            };
        }, [points]);

    return(
    <div>
        <div className="Title-text">OR83 Bounty Board Demo</div>
        <div className="wrapper">
            <div className="click-space" id="clickSpace" onClick={handleClick}>
            {/* iterates through points and puts them on the map*/}
                {points.map((point) => {
                    rect = document.getElementById("clickSpace").getBoundingClientRect();
                    let pointColor = null;
                    if(point.type == "NPC"){
                        pointColor = pointP;
                    }
                    if(point.type == "NPCA"){
                        pointColor = aPointP;
                    }
                    if(point.type == "City"){
                        pointColor = pointR;
                    }
                    if(point.type == "CityA"){
                        pointColor = aPointR;
                    }
                    if(point.type == "Encounter"){
                        pointColor = pointB;
                    }
                    if(point.type == "EncounterA"){
                        pointColor = aPointB
                    }
                    if(point.type == "Misc"){
                        pointColor = pointG
                    }
                    if(point.type == "MiscA"){
                        pointColor = aPointG;
                    }

                    //coordinates used at key value*/
                    indexVar = point.x + " " + point.y
                    //renders point 
                    return <img key={indexVar}  src={pointColor} className="point" style={{left: point.x * rectSize.width + rectSize.left + scrollX + "px", top: point.y * rectSize.height + rectSize.top + scrollY + "px"}}></img>      
                })}
                <img src={daMap} className="Background-image" id="theMap" alt="Map of Western US" /> 
                
            </div>
            <div className="info">
                <h2 id="headery"> Click to create task or show task info</h2> <br/>

                <p className="texty" id="textyX" ></p> <br/>
                <p className="texty" id="textyY" ></p> <br/>
                <p className="texty" id="textyTitle" ></p> <br/>
                <p className="texty" id="textyType" ></p> <br/>
                <p className="texty" id="textyDesc" ></p> <br/>
                <p className="texty" id="textyAssign" ></p> <br/>
                {showForm[2] &&
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                        <input type="text" id ="title" name="title" onChange={handleChange}/><br/>
                    <label htmlFor="coordX">X Coordinate:</label>
                        <input type="text" id="coordX" name="coordX" value={showForm[0]} readOnly/><br/>
                    <label htmlFor="coordY">Y Coordinate:</label>
                        <input type="text" id="coordY" name="coordY" value={showForm[1]} readOnly/><br/>
                    <label htmlFor="type">Task Type:</label>
                        <select id="type" name="type" defaultValue="Misc" onChange={handleChange} required="true">
                            <option value="Misc" disabled hidden>Select an Option</option>
                            <option value="NPC">NPC Event</option>
                            <option value="City">City Event</option>
                            <option value="Encounter">Encounter Event</option>
                            <option value="Misc">Miscellaneous Event</option>
                        </select><br/><br/>
                    <label htmlFor="Description">Description:</label>
                    <textarea id="desc" name="desc" onChange={handleChange}>
                        type here...   
                    </textarea>
                    <input type="submit" value="Submit" />
              </form>}
              <button className="texty" id="textyButton" onClick={assignFormHelper}> Assign Task</button> <br/> 
              <button className="texty" id="textyButton2" onClick={handleDelete}> Delete Task</button>
              {showForm[3] &&
              <form onSubmit={handleSubmit1}>
                <label htmlFor="assignee">Assign to:</label>
                        <input type="text" id ="assignee" name="assignee" onChange={handleChange}/><br/> 
                        <input type="submit" value="Submit" />
              </form>
              }
              
            </div>
        </div>
    </div>
    );
}

export default Map2;