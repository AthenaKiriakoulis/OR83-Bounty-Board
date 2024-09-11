import axios from "axios";

///////////////////////Helper Functions/////////////////////////////////////////////////

  //helper function to take care of info text display changes
  const textyHelper = (arr) => {
    for(let i in arr){
            document.getElementById(arr[i][0]).textContent = arr[i][1];
      }
               
  }


  const displayHelper = (arr, choice) => {
    for(let i in arr){
      document.getElementById(arr[i]).style.display = choice;      
    }   
  }

  //this allows the assign form to be shown
  const assignFormHelper = (buttonArr, showForm, setShowForm) => {
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
      helpers.displayHelper(buttonArr, "none");

  }


  const editFormHelper = (textArr, buttonArr, textBlankArr, showForm, setShowForm, setdoEdit) => {
      //this updates showForm to only change showform[2] to true
      const updateForm = showForm.map((val, index) => {
          if(index == 2){
              return val = true;
          }
          else{
              return val;
          }
      });
      setShowForm(updateForm);
      setdoEdit(true);
      helpers.displayHelper(buttonArr, "none");
      helpers.displayHelper(textArr, "none");
      helpers.textyHelper(textBlankArr);

  }

  const titleValidation = (title) => {
    if(!title) return "Title must not be undefined";
  }

  const descValidation = (title) => {
    if(!title) return "Description must not be undefined";
  }







let helpers = {
  textyHelper,
  displayHelper,
  assignFormHelper,
  editFormHelper,
  titleValidation,
  descValidation
}

export default helpers;
