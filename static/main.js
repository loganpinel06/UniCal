//main.js will handle all frontend logic for the main route

//global variable to track total calories
let totalCalories = 0;

//function to update the total calories display
const updateTotalCalories = (calories) => {
    totalCalories += calories;
    const totalElement = document.getElementById('total-calories');
    if (totalElement) {
        totalElement.textContent = totalCalories;
    }
};

//function to reset total calories and all meal entries
const resetTotalCalories = () => {
    totalCalories = 0;
    const totalElement = document.getElementById('total-calories');
    if (totalElement) {
        totalElement.textContent = totalCalories;
    }
    
    // Remove all meal result rows from all forms
    const allResultElements = document.querySelectorAll('.meal-form .form-row');
    allResultElements.forEach(element => {
        // Only remove elements that contain meal results (have paragraphs with meal info)
        if (element.querySelector('p')) {
            element.remove();
        }
    });
};

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
        //create a new div html element
        const resultElement = document.createElement('div');
        //give the div a class for styling
        resultElement.className = 'form-row';
        //update the text content of the div element with the calories data
        resultElement.innerHTML = `
            <p>Meal: ${data.meal_description}</p>
            <p>Estimated Calories: ${data.calories.calories}</p>
        `;
        //append the result element to the document
        form.appendChild(resultElement);
        
        //update the total calories dynamically
        const calorieValue = parseInt(data.calories.calories) || 0;
        updateTotalCalories(calorieValue);
        
        //reset the form 
        form.reset();
    } catch (err) {
        //log the error to the console
        console.log(err);
    }
}

//MAIN CODE

//ADD EVENT LISTENERS
//get all meal forms and add the same event listener to each
const mealForms = document.querySelectorAll('.meal-form form');
mealForms.forEach(form => {
    form.addEventListener('submit', fetchResponse);
});