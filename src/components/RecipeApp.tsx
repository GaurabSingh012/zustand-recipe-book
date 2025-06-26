import { useState } from "react";
import { useStore } from "../store/useStore";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
}

const RecipeApp = () => {
  const { recipes, addRecipe, removeRecipe } = useStore();
  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const handleAddRecipe = () => {
    if (
      name.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      return;
    }

    addRecipe({
      id: Date.now(),
      name,
      ingredients: ingredients
        .split(",")
        .map((ingredients) => ingredients.trim()),
      instructions,
    });

    setName("");
    setIngredients("");
    setInstructions("");
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setName(recipe.name);
    setIngredients(recipe.ingredients.join(", "));
    setInstructions(recipe.instructions);
  };

  const handleUpdateRecipe = () => {
    if (
      name.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      return;
    }

    if (editingRecipe) {
      removeRecipe(editingRecipe.id);
      addRecipe({
        id: Date.now(),
        name,
        ingredients: ingredients
          .split(",")
          .map((ingredients) => ingredients.trim()),
        instructions,
      });
      setEditingRecipe(null);
      setName("");
      setIngredients("");
      setInstructions("");
    }
  };

  const handleCancelEdit = () => {
    setEditingRecipe(null)
    setName("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-100 tedxt p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-500 drop-shadow-[0_0_10px_#22c55e] tracking-wide">
          🍲 Recipe Book
        </h1>

        <div className="space-y-4 mb-6">
          {/* Get Recipe Details */}
          <div className="space-y-4 mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Recipe Name"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ingredients (comma separated , )"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Instructions..."
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-between">
            {editingRecipe ? (
              <>
                {/* Update Recipe  */}
                <button
                  onClick={handleUpdateRecipe}
                  className="bg-yellow-500 text-white  px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Update Recipe
                </button>
                {/* Cancel Update */}
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white  px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* Add new Recipe */}
                <button
                  onClick={handleAddRecipe}
                  className="bg-yellow-500 text-white  px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Add Recipe
                </button>
              </>
            )}
          </div>
        </div>

        {/* Show the Recipe list  */}
        <ul className="space-y-4">
          <h3 className="text-2xl font-semibold text-red-700 mb-4 border-b-2 border-red-300 pb-1">
            🍲 Recipe List
          </h3>

          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="p-4 bg-green-50 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {recipe.name}
              </h2>

              <p className="text-gray-700 mb-2">
                <strong>Ingredients: </strong> {recipe.ingredients.join(", ")}
              </p>

              <div className="flex justify-end gap-4">
                {/* Edit Recipe  */}
                <button
                  onClick={() => handleEditRecipe(recipe)}
                  className="bg-yellow-500 text-white  px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                {/* Delete Recipe  */}
                <button
                  onClick={() => removeRecipe(recipe.id)}
                  className="bg-red-500 text-white  px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeApp;
