import axios from "axios";


const API_KEY = import.meta.env.VITE_MONDAY_API_KEY
const BOARD_ID = import.meta.env.VITE_MONDAY_BOARD_ID

const createItem = async (title, type, id) => {

  try{
    const date = new Date();

    //gets the current date and puts it in the right format
    let day = date.getDate();

    let newDay = day.toString();
    if (day < 10){
      newDay = "0" + newDay;
    }

    let month = date.getMonth() + 1;
    let newMonth = month.toString();
    if (month < 10){
      newMonth = "0" + newMonth;
    }

    let year = date.getFullYear();

    let currentDate = `${year}-${newMonth}-${newDay}`;


    const response = await axios.post(
      "https://api.monday.com/v2", 
      {
        query: `
        mutation {
          create_item (
            board_id: ${BOARD_ID}, 
            group_id: "topics", 
            item_name: "${title}", 
            column_values: "{\\\"date4\\\":\\\"${currentDate}\\\", \\\"text4__1\\\":\\\"${type}\\\", \\\"text5__1\\\":\\\"${id}\\\"}" 
          ) {
            id
          }
        }
        `
      },
      {
        headers: {
          'Authorization': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(response.data);
    console.log("it work!");

  }catch(error){
    console.error("Error:", error);
    console.log("it dont work :(");
  }
}



const updateItem = async (id, title, type) => {
  let taskID =  "";
    //gets task id
    try{

      const response = await axios.post(
        "https://api.monday.com/v2", 
        {
          query: `
          query {
            items_page_by_column_values (limit: 1, board_id: ${BOARD_ID}, columns: [{column_id: "text5__1", column_values: ["${id}"]}]) {
              cursor
              items {
                id
                name
              }
            }
          }
          `
        },
        {
          headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      taskID = response.data.data.items_page_by_column_values.items[0].id;
      console.log(response.data.data.items_page_by_column_values.items[0].id);
      console.log("it work!");

    }catch(error){
      console.error("Error:", error);
      console.log("it dont work :(");
    }

    //updates item with task id
    try{

      const response = await axios.post(
        "https://api.monday.com/v2", 
        {
          query: `
          mutation {
            change_multiple_column_values (item_id: ${taskID}, board_id: ${BOARD_ID}, column_values: " { \\\"name\\\":\\\"${title}\\\", \\\"text4__1\\\":\\\"${type}\\\"}") {
              id
            }
          }
          `
        },
        {
          headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);
      console.log("it work!");

    }catch(error){
      console.error("Error:", error);
      console.log("it dont work :(");
    }
}


const assignItem = async (id, assignee) => {
  let taskID =  "";
    //gets task id
    try{

      const response = await axios.post(
        "https://api.monday.com/v2", 
        {
          query: `
          query {
            items_page_by_column_values (limit: 1, board_id: ${BOARD_ID}, columns: [{column_id: "text5__1", column_values: ["${id}"]}]) {
              cursor
              items {
                id
                name
              }
            }
          }
          `
        },
        {
          headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      taskID = response.data.data.items_page_by_column_values.items[0].id;
      console.log(response.data.data.items_page_by_column_values.items[0].id);
      console.log("it work!");

    }catch(error){
      console.error("Error:", error);
      console.log("it dont work :(");
    }

    //updates item with task id
    try{

      const response = await axios.post(
        "https://api.monday.com/v2", 
        {
          query: `
          mutation {
            change_multiple_column_values (item_id: ${taskID}, board_id: ${BOARD_ID}, column_values: " { \\\"text__1\\\":\\\"${assignee}\\\" }") {
              id
            }
          }
          `
        },
        {
          headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);
      console.log("it work!");

    }catch(error){
      console.error("Error:", error);
      console.log("it dont work :(");
    }
}




const deleteItem = async (id) => {
  let taskID =  "";
    //gets task id
    try{

      const response = await axios.post(
        "https://api.monday.com/v2", 
        {
          query: `
          query {
            items_page_by_column_values (limit: 1, board_id: ${BOARD_ID}, columns: [{column_id: "text5__1", column_values: ["${id}"]}]) {
              cursor
              items {
                id
                name
              }
            }
          }
          `
        },
        {
          headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      taskID = response.data.data.items_page_by_column_values.items[0].id;
      console.log(response.data.data.items_page_by_column_values.items[0].id);
      console.log("it work!");

    }catch(error){
      console.error("Error:", error);
      console.log("it dont work :(");
    }

    //updates item with task id
    try{

      const response = await axios.post(
        "https://api.monday.com/v2", 
        {
          query: `
          mutation {
            delete_item (item_id: ${taskID}) {
              id
            }
          }
          `
        },
        {
          headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);
      console.log("it work!");

    }catch(error){
      console.error("Error:", error);
      console.log("it dont work :(");
    }
}


let queries = {
  createItem,
  assignItem,
  updateItem,
  deleteItem
}

export default queries;
