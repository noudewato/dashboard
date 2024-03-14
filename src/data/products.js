function generateRandomProduct() {
    const categories = ["Fruits", "Vegetables", "Dairy", "Meat", "Beverages", "Snacks"];
    const names = [
      "Apple", "Banana", "Orange", "Carrot", "Broccoli", "Milk", "Cheese", "Chicken", "Beef",
      "Soda", "Chips", "Cookies", "Water", "Juice"
    ];
  
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
  
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: randomName,
      category: randomCategory
    };
  }
  
  const groceryProducts = Array.from({ length: 100 }, generateRandomProduct);
  