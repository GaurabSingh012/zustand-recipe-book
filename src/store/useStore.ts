import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string
}

interface RecipeStore {
  recipes: Recipe[]
  addRecipe: (recipe: Recipe) => void
  removeRecipe: (id: number) => void
}

export const useStore = create<RecipeStore>()(
  persist(
    (set) => ({
      recipes: [],
      addRecipe: (recipe) =>
        set((state) => ({ recipes: [...state.recipes, recipe] })),
      removeRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'recipe-storage', // localStorage key
    }
  )
)
