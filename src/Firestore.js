import axios from "axios";
import { collection, addDoc, getDocs, getDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "./firebase.js";


  //adds point to firestore database
  const addPoint = async (point) => {
    try {
        console.log("point is " + point);
        const collectionRef = collection(db, "points");
        const dataRef = doc(collectionRef, "daData");
        const pointData = {data : point} 
        await setDoc(dataRef, pointData);
        console.log("Point successfully written with ID: ", dataRef.id);

        //rerender the page to get all the points on the map
        
      } catch (e) {
        console.error("Error occured when adding point: ", e);
      }
    

}




  //gets the points data and brings it back to the website
  const fetchPoints = async (setPoints) => {
     
          const docRef = doc(db, "points", "daData");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              const newPoints = docSnap.data().data;
              setPoints((prevPoints) => {
                  // Only update if new data is different from current state
                  if (JSON.stringify(prevPoints) !== JSON.stringify(newPoints)) {
                      return newPoints;
                  }
                  return prevPoints;
              });
          } else {
              console.log("No such point!");
          }
          console.log("Point fetched");
     
  }



  //Updates point in database to add assignee
  const updatePoint = async (point) => {
      console.log("I updateeee")
      try {
          const pointRef = doc(db, "points", "daData");
        const pointData = {data: point}
        await updateDoc(pointRef, pointData);
        console.log("Point successfully updated");
      } catch (error) {
          console.error("Error occured when updating point: ", error);
      }
    };


      //Updates point in database to add assignee
  const deletePoint = async (point) => {
      console.log("I deletttte")
      try {
          const pointRef = doc(db, "points", "daData");
          const pointData = {data: point}
          await updateDoc(pointRef, pointData);
          console.log("Point sucessfully removed");
      } catch (error) {
          console.error("Error occured when deleting point: ", error);
      }
      };



let firestore = {
  addPoint,
  fetchPoints,
  updatePoint,
  deletePoint
}

export default firestore;
