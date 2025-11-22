//main.js will handle all frontend logic for the main route

//global variable to track total calories
let totalCalories = 0;

//HELPER FUNCTIONS
//function to update the total calories display
const updateTotalCalories = (calories) => {
    totalCalories += calories;
    const totalElement = document.getElementById('total-calories');
    if (totalElement) {
        totalElement.textContent = totalCalories;
    }
};

//function to reset total calories and all meal entries
const resetAll = () => {
    totalCalories = 0;
    const totalElement = document.getElementById('total-calories');
    if (totalElement) {
        totalElement.textContent = totalCalories;
    }
    
    // Remove all meal result rows from all forms
    const allResultElements = document.querySelectorAll('.meal-result');
    allResultElements.forEach(element => {
        element.remove();
    });
};

//FRONTEND DOM FUNCTIONS
//fetch response function which will fetch the backend POST routes response and update the DOM
const fetchResponse = async (event) => {
    //prevent the default form submission behavior
    event.preventDefault();

    //get the form element that triggered the event
    const form = event.target;
    //create a new FormData object to represent data as key-value pairs
    const formData = new FormData(form);

    //try, catch 
    try {
        //fetch the response from the backend POST route
        const response = await fetch('/generate-calories', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData), // converts FormData → urlencoded string
        });
        //check if the resposne is not ok and throw an error
        if (!response.ok) {
            throw new Error('Problem fetching pantry items from the server');
        }
        //parse the response as json
        const data = await response.json();
        //store the calorie value for deletion
        const calorieValue = parseInt(data.calories.calories) || 0;
        //create a new div html element
        const resultElement = document.createElement('div');
        //give the div a class for styling
        resultElement.className = 'form-row meal-result';
        resultElement.dataset.calories = calorieValue;
        //update the text content of the div element with the calories data
        resultElement.innerHTML = `
            <p>Meal: ${data.meal_description}</p>
            <p>Estimated Calories: ${data.calories.calories}</p>
            <button type="button" class="delete-meal-btn" onclick="deleteMealResult(this)">Delete</button>
        `;
        //append the result element to the document
        form.appendChild(resultElement);
        
        //update the total calories dynamically
        updateTotalCalories(calorieValue);
        
        //reset the form 
        form.reset();
    } catch (err) {
        //log the error to the console
        console.log(err);
    }
}

//function to delete individual meal results
const deleteMealResult = (button) => {
    const mealElement = button.parentElement;
    const calories = parseInt(mealElement.dataset.calories) || 0;
    
    // Subtract calories from total
    totalCalories -= calories;
    const totalElement = document.getElementById('total-calories');
    if (totalElement) {
        totalElement.textContent = totalCalories;
    }
    
    // Remove the element from DOM
    mealElement.remove();
};

//MAIN CODE

//ADD EVENT LISTENERS
//get all meal forms and add the same event listener to each
const mealForms = document.querySelectorAll('.meal-form form');
mealForms.forEach(form => {
    form.addEventListener('submit', fetchResponse);
});