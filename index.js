let apiKey = "cc05e6fc059ab2a432b067tfa63aoa4b";
let recipeText = document.querySelector("#recipe");
let recipeForm = document.querySelector("#recipe-generator");

function generateRecipe(recipe) {
  let formattedRecipe = recipe.replace(/\n/g, "<br>");
  
  // Add a class to show the blinking cursor
  recipeText.classList.add("typewriter-empty");

  new Typewriter(recipeText, {
    strings: formattedRecipe, // It's cleaner to pass strings directly
    autoStart: true,
    cursor: " ",
    delay: 20,
    loop: false,
  }).callFunction(() => {
    // When typing is done, remove the class to hide the cursor
    recipeText.classList.remove("typewriter-empty");
  }).start();
}

recipeForm.addEventListener("submit", displayRecipe);

function displayRecipe(event) {
  event.preventDefault();
  let ingredientInput = document.querySelector("#search-form-input").value.trim();

  // Show the recipe container and initialize it
  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("recipe-hidden");
  recipeElement.innerHTML = ""; // Clear previous recipe

  fetchRecipe(ingredientInput);
}

function fetchRecipe(ingredientInput) {
  let prompt = `Create a unique vegetarian recipe using the following ingredient(s): ${ingredientInput}. The recipe must include a title, a list of ingredients with measurements, and step-by-step cooking instructions. Do not include any non-vegetarian ingredients. Ensure the recipe is clear and easy to follow. The text should consist of a <strong> heading and have bulletpoints in front of the ingredients. Do NOT use ###, ##, # or **`;
  let context = "Only provide recipes that can be made with a maximum of 10 ingredients. All recipes should be vegetarian.";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios.get(apiUrl)
    .then(response => {
      let recipe = response.data.answer;
      generateRecipe(recipe);
    })
    .catch(error => {
      recipeText.innerHTML = "<strong>Oops! Something went wrong.</strong><br/>Please try again in a moment.";
      console.error("Error fetching recipe:", error);
    });
}
