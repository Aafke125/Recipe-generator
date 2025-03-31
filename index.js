let apiKey = "cc05e6fc059ab2a432b067tfa63aoa4b";
let recipeText = document.querySelector("#recipe");
let recipeForm = document.querySelector("#recipe-generator");

function generateRecipe(recipe) {
  recipeText.innerHTML = ""; // Clear previous recipe

  // Convert newlines (\n) into HTML <br> for proper line breaks
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