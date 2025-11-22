//main route for the web page 

//imports 
import express from "express";
//import controller functions 
import { getMain } from "../controllers/mainController.js";

//create a router for the main app 
const mainRouter = express.Router(); 

//ROUTES 
//GET ROUTES (render templates) 
mainRouter.get('/', getMain);

//POST ROUTES

//export the mainRouter 
export default mainRouter 
