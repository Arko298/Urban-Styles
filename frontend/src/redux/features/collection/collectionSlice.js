import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // All products
  filteredProducts: [], // Filtered products based on category, subcategory, and search
  categories: [], // Selected categories
  subCategories: [], // Selected subcategories
  search: "", // Search term
  sortType: "relevant", // Sorting type
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload; // Initialize filtered products
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((item) => item !== category);
      } else {
        state.categories.push(category);
      }
    },
    toggleSubCategory: (state, action) => {
      const subCategory = action.payload;
      if (state.subCategories.includes(subCategory)) {
        state.subCategories = state.subCategories.filter((item) => item !== subCategory);
      } else {
        state.subCategories.push(subCategory);
      }
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    applyFilters: (state) => {
      let filtered = [...state.products];

      // Filter by search term
      if (state.search) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(state.search.toLowerCase())
        );
      }

      // Filter by categories
      if (state.categories.length > 0) {
        filtered = filtered.filter((product) =>
          state.categories.includes(product.category)
        );
      }

      // Filter by subcategories
      if (state.subCategories.length > 0) {
        filtered = filtered.filter((product) =>
          state.subCategories.includes(product.subCategory)
        );
      }

      // Apply sorting
      switch (state.sortType) {
        case "low-high":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "high-low":
          filtered.sort((a, b) => b.price - a.price);
          break;
        default:
          break; // No sorting for "relevant"
      }

      state.filteredProducts = filtered;
    },
  },
});

export const {
  setProducts,
  setSearch,
  toggleCategory,
  toggleSubCategory,
  setSortType,
  applyFilters,
} = collectionSlice.actions;

export default collectionSlice.reducer;