let apiKey = "cc05e6fc059ab2a432b067tfa63aoa4b";
let recipeText = document.querySelector("#recipe");
let recipeForm = document.querySelector("#recipe-generator");

function generateRecipe(recipe) {
  recipeText.innerHTML = ""; 


  let formattedRecipe = recipe.replace(/\n/g, "<br>");

  new Typewriter(recipeText, {
    autoStart: true,
    cursor: " ",
    delay: 20,
    loop: false,
  })
    .typeString(formattedRecipe) // Type the formatted text
    .start(); // Ensure it runs once and doesn't delete
}

recipeForm.addEventListener("submit", displayRecipe);

function displayRecipe(event) {
  event.preventDefault();
  let ingredientInput = document.querySelector("#search-form-input").value.trim();

  fetchRecipe(ingredientInput);
}

function fetchRecipe(ingredientInput) {
  let prompt = `Create a unique vegetarian recipe using the following ingredient(s): ${ingredientInput}. 
  The recipe must include a title, a list of ingredients with measurements, and step-by-step cooking instructions.
  Do not include any non-vegetarian ingredients. Ensure the recipe is clear and easy to follow. The text should considt of a <strong> heading and have bulletpoints in front of the ingredients. Don't use ###, ##, # or **`;

  let context = "Only provide recipes that can be made with a maximum of 10 ingredients. All recipes should be vegetarian.";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("recipe-hidden");

  axios.get(apiUrl)
    .then(response => {
      let recipe = response.data.answer;
      generateRecipe(recipe);
    })
    .catch(error => {
      recipeText.textContent = "Oops! Something went wrong.";
      console.error("Error fetching recipe:", error);
    });
}