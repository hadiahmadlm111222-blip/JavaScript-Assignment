
const orders = [
    { id: 1, customer: "Rami", items: ["latte", "croissant"], total: 7.5 },
    { id: 2, customer: "Lea", items: ["espresso"], total: 3.0 },
    { id: 3, customer: "Rami", items: ["latte", "muffin"], total: 8.0 },
    { id: 4, customer: "Karim", items: ["mocha", "croissant"], total: 9.0 },
    { id: 5, customer: "Lea", items: ["latte"], total: 4.5 },
    { id: 6, customer: "Nour", items: ["espresso", "latte", "muffin"], total: 10.5 }
];

const mondayCustomers = ["Rami", "Lea", "Karim", "Nour"];
const tuesdayCustomers = ["Lea", "Nour", "Tony", "Rami", "Lea"];


/*
  Question 2 - Part A
  Arrays and Array Methods
*/

// Function 1: Calculate total revenue using reduce.
function getTotalRevenue(orders) {
    return orders.reduce((sum, order) => sum + order.total, 0);
}

// Function 2: Find orders with a total >= min using filter.
function getBigOrders(orders, min) {
    return orders.filter(order => order.total >= min);
}

// Function 3: Create order summaries using map.
function getOrderSummaries(orders) {
    return orders.map(order =>
        "#" + order.id + " " + order.customer +
        " - " + order.items.length + " item(s) - $" +
        order.total.toFixed(2)
    );
}

// Function 4: Sort orders by total from highest to lowest.
function getSortedByTotal(orders) {
    return [...orders].sort((a, b) => b.total - a.total);
}

// Function 5: Find order IDs containing a specific item.
function findOrdersByItem(orders, item) {
    return orders
        .filter(order => order.items.includes(item))
        .map(order => order.id);
}


// ======================
// TESTS - PART A
// ======================

console.log("1. Total revenue:", getTotalRevenue(orders));

console.log("2. Big orders:", getBigOrders(orders, 8));

console.log("3. Order summaries:", getOrderSummaries(orders));

console.log("4. Sorted orders:", getSortedByTotal(orders));

console.log("5. Orders containing muffin:", findOrdersByItem(orders, "muffin"));

// Additional tests
console.log("Extra test 1:", getBigOrders(orders, 10));

console.log("Extra test 2:", findOrdersByItem(orders, "latte"));

















/*
  Question 2 - Part B
  Objects as Counters
*/

// Function 6: Count how many times each item was ordered.
function countItems(orders) {
    const counts = {};

    orders.forEach(order => {
        order.items.forEach(item => {
            counts[item] = (counts[item] || 0) + 1;
        });
    });

    return counts;
}

// Function 7: Find the most popular item.
function getMostPopularItem(orders) {
    const counts = countItems(orders);
    let mostPopular = null;
    let highestCount = 0;

    for (const item in counts) {
        if (counts[item] > highestCount) {
            highestCount = counts[item];
            mostPopular = item;
        }
    }

    return mostPopular;
}

// Function 8: Calculate total spending per customer.
function getSpendingPerCustomer(orders) {
    const spending = {};

    orders.forEach(order => {
        spending[order.customer] =
            (spending[order.customer] || 0) + order.total;
    });

    return spending;
}


// ======================
// TESTS - PART B
// ======================

console.log("6. Item counts:", countItems(orders));

console.log("7. Most popular item:", getMostPopularItem(orders));

console.log("8. Spending per customer:", getSpendingPerCustomer(orders));







/*
  Question 2 - Part C
  Working with Set
*/

// Function 9: Return unique customer names using Set.
function getUniqueCustomers(orders) {
    return [...new Set(orders.map(order => order.customer))];
}

// Function 10: Return all distinct items using flatMap and Set.
function getAllItems(orders) {
    return [...new Set(orders.flatMap(order => order.items))];
}

// Function 11a: Return customers who visited both days.
function bothDays(setA, setB) {
    return [...setA].filter(customer => setB.has(customer));
}

// Function 11b: Return customers who visited only the first day.
function onlyFirstDay(setA, setB) {
    return [...setA].filter(customer => !setB.has(customer));
}

// Function 11c: Return customers who visited either day.
function allCustomers(setA, setB) {
    return [...new Set([...setA, ...setB])];
}


// ======================
// TESTS - PART C
// ======================

const mondaySet = new Set(mondayCustomers);
const tuesdaySet = new Set(tuesdayCustomers);

console.log("9. Unique customers:", getUniqueCustomers(orders));

console.log("10. All distinct items:", getAllItems(orders));

console.log("11a. Both days:", bothDays(mondaySet, tuesdaySet));

console.log("11b. Only Monday:", onlyFirstDay(mondaySet, tuesdaySet));

console.log("11c. All customers:", allCustomers(mondaySet, tuesdaySet));

// Tuesday has 4 unique customers because "Lea" appears twice.
// A Set automatically removes duplicate values.
console.log("Distinct Tuesday customers:", tuesdaySet.size);

// Two additional tests
console.log("Extra test 1:", bothDays(new Set(["Ali", "Rami"]), new Set(["Ali", "Lea"])));

console.log("Extra test 2:", onlyFirstDay(new Set(["Ali", "Rami"]), new Set(["Rami"])));
