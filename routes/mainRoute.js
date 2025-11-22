//main route for the web page 

//imports 
import express from "express";
//import controller functions 
import { getMain, getMealCalories } from "../controllers/mainController.js";

//create a router for the main app 
const mainRouter = express.Router(); 

//ROUTES 
//GET ROUTES (render templates) 
mainRouter.get('/', getMain);

//middleware to encode the form submission so it is accessible in the post route 
//with 'req.body.<formName>'
mainRouter.use(express.urlencoded({ extended: true })); //for form submissions
//POST ROUTES
mainRouter.post('/generate-calories', getMealCalories);

//export the mainRouter 
export default mainRouter 
