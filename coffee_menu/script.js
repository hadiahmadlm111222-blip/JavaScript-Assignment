
/*
  Question 3 - Coffee Menu & Cart
  Part A: Render Menu
  Part B: Shopping Cart
  Part C: Live Total & Style Changes
  Part D: Custom Item Form
  Part E: Clear Cart
*/

const menu = [
    { name: "Espresso", price: 3.0 },
    { name: "Latte", price: 4.5 },
    { name: "Mocha", price: 5.0 },
    { name: "Muffin", price: 2.5 }
];

let cart = [];


// ======================
// PART A - RENDER MENU
// ======================

// Create and display all menu items with Add buttons.
function renderMenu() {
    const menuList = document.getElementById("menu-list");

    menuList.textContent = "";

    menu.forEach(item => {
        const li = document.createElement("li");

        const itemText = document.createElement("span");
        itemText.textContent =
            item.name + " — $" + item.price.toFixed(2);

        const addButton = document.createElement("button");
        addButton.textContent = "Add";

        addButton.addEventListener("click", () => {
            cart.push(item);
            renderCart();
        });

        li.appendChild(itemText);
        li.appendChild(addButton);

        menuList.appendChild(li);
    });
}


// ======================
// PART B - SHOPPING CART
// ======================

// Display all cart entries and their Remove buttons.
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const cartCount = document.getElementById("cart-count");

    cartList.textContent = "";

    if (cart.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "Your cart is empty.";
        cartList.appendChild(emptyMessage);
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");

            const itemText = document.createElement("span");
            itemText.textContent =
                item.name + " — $" + item.price.toFixed(2);

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.dataset.index = index;

            li.appendChild(itemText);
            li.appendChild(removeButton);
            cartList.appendChild(li);
        });
    }

    cartCount.textContent = cart.length;
    updateTotal();
}


// Remove one cart entry using event delegation.
document.getElementById("cart-list").addEventListener("click", (event) => {
    if (event.target.matches("button[data-index]")) {
        const index = Number(event.target.dataset.index);

        cart.splice(index, 1);
        renderCart();
    }
});


// ======================
// PART C - LIVE TOTAL
// ======================

// Calculate cart total and update reward styling.
function updateTotal() {
    const cartTotal = document.getElementById("cart-total");
    const rewardMsg = document.getElementById("reward-msg");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cartTotal.textContent = total.toFixed(2);

    if (total > 15) {
        cartTotal.style.color = "red";
        rewardMsg.classList.remove("hidden");
    } else {
        cartTotal.style.color = "";
        rewardMsg.classList.add("hidden");
    }
}


// ======================
// PART D - CUSTOM ITEM
// ======================

// Validate and add a custom item to the menu.
function addCustomItem() {
    const nameInput = document.getElementById("item-name");
    const priceInput = document.getElementById("item-price");
    const errorMsg = document.getElementById("error-msg");

    const name = nameInput.value.trim();
    const priceText = priceInput.value.trim();
    const price = Number(priceText);

    errorMsg.style.color = "red";
    errorMsg.textContent = "";

    if (name === "") {
        errorMsg.textContent = "Name is required.";
        return;
    }

    if (priceText === "" || !Number.isFinite(price) || price <= 0) {
        errorMsg.textContent = "Price must be a positive number.";
        return;
    }

    const itemExists = menu.some(item =>
        item.name.toLowerCase() === name.toLowerCase()
    );

    if (itemExists) {
        errorMsg.textContent = "This item is already on the menu.";
        return;
    }

    menu.push({ name, price });

    renderMenu();

    nameInput.value = "";
    priceInput.value = "";
    errorMsg.textContent = "";
}


// Handle the Add to menu button.
document.getElementById("add-custom-btn").addEventListener(
    "click",
    addCustomItem
);


// ======================
// PART E - CLEAR CART
// ======================

// Empty the cart and refresh the display.
function clearCart() {
    cart = [];
    renderCart();
}


// Handle the Clear cart button.
document.getElementById("clear-cart-btn").addEventListener(
    "click",
    clearCart
);


// ======================
// INITIAL DISPLAY
// ======================

renderMenu();
renderCart();
