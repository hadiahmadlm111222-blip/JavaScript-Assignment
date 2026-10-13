
/*
  Question 1 - Part A
  Calculate the final price of a coffee order.
*/
function calculatePrice(size, quantity, isMember, hour) {

    // Step 1: Validate inputs
    if (size !== "small" && size !== "medium" && size !== "large") {
        return "Invalid size";
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return "Invalid quantity";
    }

    if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
        return "Invalid hour";
    }

    // Step 2: Set the price per cup
    let pricePerCup;

    switch (size) {
        case "small":
            pricePerCup = 2.50;
            break;
        case "medium":
            pricePerCup = 3.50;
            break;
        case "large":
            pricePerCup = 4.50;
            break;
    }

    let total = pricePerCup * quantity;

    // Step 3: Apply 10% bulk discount
    if (quantity >= 5) {
        total = total * 0.90;
    }

    // Step 4: Apply 5% member discount
    if (isMember === true) {
        total = total * 0.95;
    }

    // Step 5: Apply happy hour discount
    if (hour >= 15 && hour <= 17) {
        total = total - 1;
    }

    // Step 6: Prevent negative totals
    if (total < 0) {
        total = 0;
    }

    // Step 7: Round to 2 decimal places
    return Math.round(total * 100) / 100;
}

// Test cases
console.log("Test 1:", calculatePrice("large", 2, false, 10));
console.log("Test 2:", calculatePrice("medium", 5, true, 16));
console.log("Test 3:", calculatePrice("small", 4, true, 9));
console.log("Test 4:", calculatePrice("small", 1, false, 15));
console.log("Test 5:", calculatePrice("xl", 1, false, 9));
console.log("Test 6:", calculatePrice("large", 0, false, 9));
console.log("Test 7:", calculatePrice("large", 2.5, true, 9));
console.log("Test 8:", calculatePrice("medium", 2, true, 25));

// Two additional tests
console.log("Test 9:", calculatePrice("large", 5, false, 12));
console.log("Test 10:", calculatePrice("small", 1, true, 16));








/*
  Question 1 - Part B
  Print the prices for 1 to 10 coffees.
*/
function printPriceTable(size, isMember, hour) {

    for (let quantity = 1; quantity <= 10; quantity++) {

        let price = calculatePrice(size, quantity, isMember, hour);

        console.log("Qty " + quantity + " -> $" + price.toFixed(2));
    }
}

// Test Part B
console.log("Part B - Price Table:");
printPriceTable("medium", false, 16);









/*
  Question 1 - Part C
  Find the first hour with the lowest coffee price.
*/
function cheapestHour(size, quantity, isMember) {

    let bestHour = 0;
    let lowestPrice = calculatePrice(size, quantity, isMember, 0);

    for (let hour = 1; hour < 24; hour++) {

        let price = calculatePrice(size, quantity, isMember, hour);

        if (price < lowestPrice) {
            lowestPrice = price;
            bestHour = hour;
        }
    }

    return bestHour;
}

// Test Part C
let bestHour = cheapestHour("large", 3, false);
let bestPrice = calculatePrice("large", 3, false, bestHour);

console.log(
    "The best time to order 3 large coffees is at " +
    bestHour + ":00 for $" + bestPrice.toFixed(2)
);

// Two additional tests
console.log("Test 2:", cheapestHour("small", 1, false));
console.log("Test 3:", cheapestHour("medium", 5, true));
