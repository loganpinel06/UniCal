//main.js will handle all frontend logic for the main route

const fetchResponse = async (event) => {
    //prevent the default form submission behavior
    event.preventDefault();

    //get the form element from the DOM
    const form = document.getElementById('breakfast-form');
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
        //create a new p html element
        const resultElement = document.createElement('p');
        //update the text content of the p element with the calories data
        resultElement.textContent = `Estimated Calories: ${data.calories}`;
        //append the result element to the document
        document.body.appendChild(resultElement);
        //reset the form 
        form.reset();
    } catch (err) {
        //log the error to the console
        console.log(err);
    }
}

//MAIN CODE
//ADD EVENT LISTENERS
const breakfastForm = document.getElementById('breakfast-form');
breakfastForm.addEventListener('submit', fetchResponse);