//mainController.js will handle all backend logic for the main route 

//imports 
import generate_calories from '../services/gemini.js';

//main get route functionality which renders html template
export const getMain = async (req, res, next) => {
  //render the html template 
  res.render('main.html');
};

//handle backend logic for POST routes 
//this function will get the users input from the request
//and then utilize the gmini service to get a calories count based on the meal description
export const getMealCalories = async (req, res, next) => {
  //try catch block to handle errors 
  try {
    //get the meal description from the form submission
    const meal_description = req.body.meal;
    //use gemini to generate calories based on meal description
    const calories = await generate_calories(meal_description);
    console.log(calories);
    //send a json response to the frontend with the calories data
    res.json(calories);
  //handle errors
  } catch (err) {
    //utilize the next callback to handle errors
    next(err);
  }
}
