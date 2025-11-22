//mainController.js will handle all backend logic for the main route 

//imports 

//main get route which renders html template
export const getMain = async (req, res, next) => {
  //render the html template 
  res.render('main.html');
};
