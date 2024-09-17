// Model: Fetch and manage category data
class CategoryModel {
  constructor() {
    this.categories = {};
  }

  fetchCategories() {
    return fetch("https://dummyjson.com/products/category-list")
      .then((response) => response.json())
      .then((data) => {
        this.categories = this.organizeCategories(data);
        return this.categories;
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }

  organizeCategories(data) {
    // Define the category mapping based on the given example
    const categoryMapping = {
      beauty: ["fragrances", "skin-care"],
      fashion: [
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "sunglasses",
        "tops",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches",
      ],
      electronics: ["laptops", "mobile-accessories", "smartphones", "tablets"],
      home: [
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
      ],
      sports: ["sports-accessories", "vehicle", "motorcycle", "mens-watches"],
    };

    return categoryMapping;
  }
}

// View: Handle the display and hover effects
class CategoryView {
  constructor() {
    this.categoryContainer = document.getElementById("category-container");
  }

  renderCategories(categories) {
    this.categoryContainer.innerHTML = "";

    Object.keys(categories).forEach((category) => {
      const categoryElement = document.createElement("div");
      categoryElement.className = "category";
      categoryElement.innerText = category;
      this.categoryContainer.appendChild(categoryElement);

      const subCategoryList = document.createElement("div");
      subCategoryList.className = "sub-categories";
      subCategoryList.style.display = "none"; // Hide subcategories initially

      categories[category].forEach((subCategory) => {
        const subCategoryElement = document.createElement("div");
        subCategoryElement.className = "sub-category";
        subCategoryElement.innerText = subCategory;
        subCategoryList.appendChild(subCategoryElement);
      });

      categoryElement.appendChild(subCategoryList);

      // Show subcategories on hover
      categoryElement.addEventListener("mouseenter", () => {
        subCategoryList.style.display = "block";
      });
      categoryElement.addEventListener("mouseleave", () => {
        subCategoryList.style.display = "none";
      });
    });
  }
}

// Controller: Coordinate fetching and displaying categories
class CategoryController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.model.fetchCategories().then((categories) => {
      this.view.renderCategories(categories);
    });
  }
}

// Initialize the MVC components
document.addEventListener("DOMContentLoaded", () => {
  const model = new CategoryModel();
  const view = new CategoryView();
  const controller = new CategoryController(model, view);
  controller.init();
});
