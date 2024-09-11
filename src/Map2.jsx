import {useEffect, useState, useMemo, useRef, useCallbac, memo} from "react";

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
import Point from './Point';
import helpers from "./helpers.js";

function Map2(props){
    let foundIt = false;
    let rect;
    let indexVar = "";
    let textArr =["textyX", "textyY", "textyTitle", "textyType", "textyDesc", "textyAssign"];
    let textBlankArr =[["textyX", ""], ["textyY", ""], ["textyTitle", ""], ["textyType", ""], ["textyDesc", ""], ["textyAssign", ""]];
    let buttonArr = ["textyButton", "textyButton2", "textyButton3" ];

    const pointTypes = {
        "NPC": [pointP, aPointP],
        "City": [pointR, aPointR],
        "Encounter": [pointB, aPointB],
        "Misc": [pointG, aPointG]
    }

    const initialFetch = useRef(true);
    
    const [points, setPoints] = useState([]);

    //stores value and boolean for red circle that pops up when point is clicked
    const [tempPoint, setTempPoint] = useState([0,0,false]);

    //tells program whether to use editing fucntion or creating function at submit
    const [doEdit, setdoEdit] = useState(false);

    //controls which form is shown. If showform[2] is true, first form is shown. 
    //If showform[3] is true, second form is shown
    const [showForm, setShowForm] = useState([0,0,false,false]);
    const [input, setInput] = useState([]);
    const [rectSize, setRectSize] = useState(null);
    const [measurements, setMeasurements] = useState(null);
    





    //runs when map is clicked 
    const handleClick = ({pageX, pageY, clientX, clientY}) => {
        const rect = document.getElementById("clickSpace");
        const x = pageX - rect.offsetLeft;
        const y = pageY - rect.offsetTop;
        foundIt = false;
        document.getElementById("headery").textContent= pageY ;
        points.forEach((pointy) => {
            let pointyCheckX = pointy.x * rect.offsetWidth
            let pointyCheckY = pointy.y * rect.offsetHeight

            console.log(`Click Position: (${pageX}, ${pageY})`);
            console.log(`Point Position: (${pointyCheckX}, ${pointyCheckY})`);
            
            //if map click is in the range of an existing point
            if(((pageX - rect.offsetLeft <= (pointyCheckX + 15)) && (pageX  - rect.offsetLeft>= (pointyCheckX - 15)) ) && ((pageY - rect.offsetTop<= (pointyCheckY + 15)) && (pageY - rect.offsetTop>= (pointyCheckY - 15)) )){
                foundIt=true;
                setShowForm([pointy.x,pointy.y,false,false])
                let textContentArr = [
                    ["headery", "Task Info"], 
                    ["textyX", "X Coordinate: " + pointy.x],
                    ["textyY", "Y Coordinate: " + pointy.y], 
                    ["textyTitle", "Task Title: " + pointy.title],
                    ["textyType","Task Type: " + pointy.type], 
                    ["textyDesc", "Description: " + pointy.desc],
                    ["textyAssign", "Assigned To: " + pointy.assignee]
                ]

                     
                //tells temp point not to appear 
                setTempPoint([0, 0,false]);
     
                //makes text appear
                helpers.displayHelper(textArr, "block");
                helpers.displayHelper(buttonArr, "block");
                helpers.textyHelper(textContentArr);
                
                
            }

        
        });
        //if click wasnt in the range of any of the points
        if(points.length == 0 || foundIt == false){
            document.getElementById("headery").textContent= "Create New Task";

            //show the form with click coordinates already in the form
            
            setShowForm([x,y,true,false]);
            setTempPoint([pageX, pageY,true]);
            helpers.displayHelper(buttonArr, "none");
            helpers.displayHelper(textArr, "none");
            helpers.textyHelper(textBlankArr);

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
        const rect = document.getElementById("clickSpace");
        event.preventDefault();

        if(helpers.titleValidation(input.title)){
            alert(helpers.titleValidation(input.title));
            return;
       }

       if(helpers.descValidation(input.desc)){
           alert(helpers.descValidation(input.desc));
           return;
      }
       


        const newX = (showForm[0]) / rect.offsetWidth;
        const newY = (showForm[1]) / rect.offsetHeight;
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
              assigned: false,  
              assignee: ""    
            }];
            return newPoints;      
          });
        

        //clears input 
        setInput({});
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
            if(!input.assignee){
                updatedPoint.assignee = "";   
            }else{
                updatedPoint.assignee = input.assignee;

                if(!updatedPoint.assigned){
                    updatedPoint.assigned = true;
                }
            }



            setPoints(newpointArr);
          }else{
            console.log("Error: Point Not Found")
        }
        //tells form to hide
        setShowForm([0,0,false,false]);
        document.getElementById("headery").textContent = "Task Assigned!";
        helpers.displayHelper(buttonArr, "none");
        helpers.displayHelper(textArr, "none");
        helpers.textyHelper(textBlankArr);
        }

    //runs when edit form is submitted, adds new form data to form data list    
    const handleSubmit2 = (event) => {
        event.preventDefault();
        //finds right point in point list and changes assigned value to form input
        
        const pointID = "X" + showForm[0] + "Y" + showForm[1];
        const newpointArr = [...points];
        const index = newpointArr.findIndex((point) => point.id === pointID);
        if (index!== -1) {
            console.log("I got herrrre editing")
            const updatedPoint = newpointArr[index];
            if(input.title != null){ 
                updatedPoint.title = input.title;
            }
            if(input.type != null){ 
                updatedPoint.type = input.type;
            }
            if(input.desc != null){
                updatedPoint.desc = input.desc;
            }

            setPoints(newpointArr);

          }else{
            console.log("Error: Point not found")
        }

        //tells form to hide
        setShowForm([0,0,false,false]);
        document.getElementById("headery").textContent = "Task Edited!";
        helpers.displayHelper(buttonArr, "none");
        helpers.displayHelper(textArr, "none");
        helpers.textyHelper(textBlankArr);
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
        helpers.displayHelper(buttonArr, "none");
        helpers.displayHelper(textArr, "none");
        helpers.textyHelper(textBlankArr);
    }

  


       

/////////////////////////////////////////////////////////////
        //updates the point positions for when the page size is changed
        useEffect(() => {
            console.log("page effected");
            const resize  = () => {
                rect = document.getElementById("clickSpace");
                setRectSize({width: rect.offsetWidth, height: rect.offsetHeight, left: rect.offsetLeft, top: rect.offsetTop});
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
            {tempPoint[2] &&
                <div className ="tempPoint" style={{'left':tempPoint[0],'top':tempPoint[1]}}></div>
            }
            {/* iterates through points and puts them on the map*/}
                {points.map((point) => {
                    rect = document.getElementById("clickSpace");
                    let pointColor = null;
                    if(point.assigned){
                        pointColor = pointTypes[point.type][1]
                    }else{
                        pointColor = pointTypes[point.type][0]
                    }
                    

                    //coordinates used at key value*/
                    indexVar = point.x + " " + point.y

                    //renders point 
                    return <Point key={indexVar}  src={pointColor} className="point" left = {point.x} top = {point.y} />      
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
                <form onSubmit={doEdit ? handleSubmit2 : handleSubmit}>
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
              <button className="texty" id="textyButton" onClick={() => helpers.assignFormHelper(buttonArr, showForm, setShowForm)}> Assign Task</button> <br/> 
              <button className="texty" id="textyButton2" onClick={handleDelete}> Delete Task</button>
              <button className="texty" id="textyButton3" onClick={() => helpers.editFormHelper(textArr, buttonArr, textBlankArr, showForm, setShowForm, setdoEdit)}> Edit Task</button>
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