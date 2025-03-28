function generateRecipe(event) {
  event.preventDefault();

  //let recipeText = document.querySelector("#recipe");
  //recipeText.innerHTML = "Recipe comes here";

  new Typewriter("#recipe", {
        strings: "Recipe comes here",
        autoStart: true,
        cursor: " ",
        delay: 50
      });
}

let recipeForm = document.querySelector("#recipe-generator");
recipeForm.addEventListener("submit", generateRecipe);