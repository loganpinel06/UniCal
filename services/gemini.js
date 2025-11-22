//gemini.js will integrate the Google Gemini API create the AI Model
//documentation followed https://ai.google.dev/gemini-api/docs/quickstart

//imports
import { GoogleGenAI, Type } from "@google/genai";
//require and configure dotenv for reading .env variables 
import dotenv from 'dotenv';
dotenv.config();

//initialize the client
//we can do this at a toplevel even though this file is never run because when the exported function is imported
//and used in another file Node.js has a module caching system that will run this files top-level code exactly once
//which will initialize the client once for the entire app
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

//create a async function to prompt the Gemini API for a recipe 
const generate_calories = async (meal_description) => {
  /*
   *Generate calories using the Gemini API based on provided meal description.
   *Args:
        meal_description (str): Description of the meal to generate calorie information for
   *Returns:
        Response object from Gemini API containing calorie data, or an error message if error occurs
   */
  //try, catch block to handle errors when generating a recipe 
  try { 
    //define the prompt 
    const prompt = `
      Imagine you are needing to cook a meal using only the ingredients available to you in your pantry.
      You are a professional chef with years of experience crafting delicious meals.
      You are tasking with creating a meal for a specific meal type ${meal_type}.
      You have the following ingredients available to you: ${ingredients_list.join(', ')}.
      Please create two quality recipes and provide detailed instructions for how to prepare each recipe.
    `;

    //send the prompt to the Gemini API 
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        //configure the response to JSON 
        //and provide the structure of the JSON 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.NUMBER },
            },
            propertyOrdering: ["calories"],
          },
        },
        //Disable Thinking
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    })

    //return the response as parsed JSON
    return JSON.parse(response.text);

  } catch (err) {
    //log the error
    console.log(err);
  }
};

//export the generate_recipe function
export default generate_recipe;
