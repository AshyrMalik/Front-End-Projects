const recipes = [];

function addRecipe(){
    var name = document.getElementById("recipeName").value;
    var ingredients = document.getElementById("ingredients").value;
    var instructions = document.getElementById("instructions").value;
    
    const recipe={ 
        id:Date.now(),
        name,
        ingredients,
        instructions
    };

    recipes.push(recipe);
    displayRecipe();
    clearform();

}

function clearform(){
    document.getElementById("recipeName").value=" ";
    document.getElementById("ingredients").value=" ";
    document.getElementById("instructions").value=" ";

}

function displayRecipe(){
    const recipeList=document.getElementById("recipeList");
    recipeList.innerHTML = "";

    recipes.forEach(recipe => {
        item= document.createElement("div");
        item.className = 'recipe-item';

        item.innerHTML=`
            <h2>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button class="edit-button" onclick="editRecipe(${recipe.id})">Edit</button>
            <button class="delete-button" onclick="deleteRecipe(${recipe.id})">Delete</button>
                
            `;

        recipeList.appendChild(item);
    });
}
function editRecipe(id){
    const r=recipes.find(r => r.id === id);
    document.getElementById("recipeName").value=r.name;
    document.getElementById("ingredients").value=r.ingredients;
    document.getElementById("instructions").value=r.instructions;
    deleteRecipe(r.id);
}

function deleteRecipe(id) {
    const index = recipes.findIndex(r => r.id === id);
    recipes.splice(index, 1);
    displayRecipe();
}

function searchRecipes(){
    const query= document.getElementById("search").value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));
    displayFilteredRecipes(filteredRecipes);
}

function displayFilteredRecipes(filteredRecipes) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    filteredRecipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';
        recipeItem.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button class="edit-button" onclick="editRecipe(${recipe.id})">Edit</button>
            <button class="delete-button" onclick="deleteRecipe(${recipe.id})">Delete</button>
        `;
        recipeList.appendChild(recipeItem);
    });
}
