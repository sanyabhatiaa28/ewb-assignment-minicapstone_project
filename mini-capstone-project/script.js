
 // Capstone Project: Product Inventory Dashboard

// Ques: Build a product inventory application that accepts product input, validates it, assigns categories, calculates total inventory value, displays affordable products and generates a formatted report using JavaScript functions and array methods.

console.log("--- Initializing Inventory System ---");

const defaultInventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 }
];

let inventory = loadInventory();

function loadInventory() {
  try {
    const saved = localStorage.getItem("productInventory");
    if (saved !== null) {
      const data = JSON.parse(saved);
      if (Array.isArray(data) && data.every(item =>
        item &&
        typeof item.name === "string" &&
        item.name.trim() !== "" &&
        typeof item.price === "number" &&
        Number.isFinite(item.price) &&
        item.price > 0
      )) {
        return data;
      }
    }
  } catch (error) {
    console.log("Could not load saved inventory.");
  }
  return defaultInventory.map(item => ({ ...item }));
}

function saveInventory() {
  try {
    localStorage.setItem("productInventory", JSON.stringify(inventory));
  } catch (error) {
    showMessage("Unable to save data in this browser.", true);
  }
}

function getCategory(price) {
  let category = "";
  switch (true) {
    case price < 50:
      category = "Budget";
      break;
    case price <= 500:
      category = "Standard";
      break;
    default:
      category = "Premium";
  }
  return category;
}

function findProduct(searchName) {
  let found = null;
  for (let i = 0; i < inventory.length; i++) {
    if (!inventory[i].name) {
      continue;
    }
    if (inventory[i].name.toLowerCase() === searchName.toLowerCase()) {
      found = inventory[i];
      break;
    }
  }
  return found;
}

function getTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

const finalPrice = (price, tax = 0, discount = 0) => {
  return price + (price * tax / 100) - (price * discount / 100);
};

function showMessage(text, isError = false) {
  const message = document.getElementById("message");
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function addProduct(name, price) {
  if (!name || name.trim() === "") {
    showMessage("Please enter a valid product name.", true);
    return;
  }
  if (!Number.isFinite(price) || price <= 0) {
    showMessage("Please enter a valid price greater than zero.", true);
    return;
  }

  name = name.trim();

  if (findProduct(name)) {
    showMessage("This product already exists.", true);
    return;
  }

  inventory.push({ name: name, price: Math.round(price * 100) / 100 });
  saveInventory();
  renderInventory();
  showMessage("Product added successfully!");
  document.getElementById("productForm").reset();

  console.log('[Product added: "' + name + '" at "$' + price + '"]');
}

function deleteProduct(name) {
  inventory = inventory.filter(item => item.name !== name);
  saveInventory();
  renderInventory();
  showMessage("Product deleted.");
}

function renderInventory() {
  const body = document.getElementById("inventoryBody");
  const search = document.getElementById("searchInput").value.trim().toLowerCase();
  const visibleInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(search)
  );

  body.replaceChildren();

  visibleInventory.forEach(function (item) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const categoryCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const badge = document.createElement("span");
    const deleteButton = document.createElement("button");

    nameCell.textContent = item.name;
    nameCell.className = "product-name";
    priceCell.textContent = "$" + item.price.toFixed(2);
    badge.textContent = getCategory(item.price);
    badge.className = "category " + getCategory(item.price);
    categoryCell.appendChild(badge);

    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => deleteProduct(item.name));
    actionCell.appendChild(deleteButton);

    row.append(nameCell, priceCell, categoryCell, actionCell);
    body.appendChild(row);
  });

  document.getElementById("emptyMessage").hidden = visibleInventory.length !== 0;
  updateAnalytics();
}

function updateAnalytics() {
  const total = getTotal(inventory);
  const affordable = inventory.filter(function (item) {
    return item.price < 200;
  });
  const affordableNames = affordable.map(function (item) {
    return item.name;
  });
  const report = inventory.map(function (item) {
    return item.name.toUpperCase() + ": $" + item.price.toFixed(2);
  });

  document.getElementById("totalProducts").textContent = inventory.length;
  document.getElementById("totalValue").textContent = "$" + total.toFixed(2);
  document.getElementById("affordableCount").textContent = affordable.length;

  const affordableList = document.getElementById("affordableList");
  const reportList = document.getElementById("reportList");
  affordableList.replaceChildren();
  reportList.replaceChildren();

  affordableNames.forEach(function (name) {
    const li = document.createElement("li");
    li.textContent = name;
    affordableList.appendChild(li);
  });

  report.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    reportList.appendChild(li);
  });

  console.log("--- Financial Analytics ---");
  console.log("Total Inventory Value: $" + total);
  console.log("Filtered Affordable Items: " + JSON.stringify(affordableNames));
  console.log("Formatted Report List: " + JSON.stringify(report));
}

document.getElementById("productForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("productName").value;
  const price = Number(document.getElementById("productPrice").value);
  addProduct(name, price);
});

document.getElementById("searchInput").addEventListener("input", renderInventory);

document.getElementById("resetBtn").addEventListener("click", function () {
  inventory = defaultInventory.map(item => ({ ...item }));
  saveInventory();
  document.getElementById("searchInput").value = "";
  renderInventory();
  showMessage("Demo inventory restored.");
});

console.log("--- Processing Inventory Roster (forEach) ---");
inventory.forEach(function (item) {
  console.log("* Item: " + item.name + " ($" + item.price + ") -> Category: " + getCategory(item.price));
});

renderInventory();
