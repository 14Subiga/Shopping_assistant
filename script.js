// // Tabs Navigation 
// const homeTab = document.getElementById('home-tab');
// const listTab = document.getElementById('list-tab');
// const settingsTab = document.getElementById('settings-tab');

// const homeSection = document.getElementById('home-section');
// const listSection = document.getElementById('list-section');
// const settingsSection = document.getElementById('settings-section');

// // Restore the active tab from localStorage
// window.addEventListener('load', () => {
//     const activeTabId = localStorage.getItem('activeTab') || 'home-tab';
//     const activeTab = document.getElementById(activeTabId);
//     const activeSection = document.getElementById(activeTabId.replace('-tab', '-section'));

//     setActiveTab(activeTab, activeSection);

//     // Restore saved budget and items
//     const savedBudget = localStorage.getItem('budget');
//     if (savedBudget) {
//         budget = parseFloat(savedBudget);
//         budgetDisplay.textContent = budget.toFixed(2);
//     }

//     const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
//     savedItems.forEach(item => {
//         addItemToTable(item.name, item.amount);
//         totalCost += item.amount; // Add the amount to the total
//     });

//     updateTotal();
// });

// homeTab.addEventListener('click', () => setActiveTab(homeTab, homeSection));
// listTab.addEventListener('click', () => setActiveTab(listTab, listSection));
// settingsTab.addEventListener('click', () => setActiveTab(settingsTab, settingsSection));

// function setActiveTab(tab, section) {
//     document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active-tab'));
//     tab.classList.add('active-tab');
//     document.querySelectorAll('main section').forEach(sec => sec.classList.add('hidden'));
//     section.classList.remove('hidden');

//     // Save the active tab to localStorage
//     localStorage.setItem('activeTab', tab.id);
// }

// // Shopping List Logic (Table-based)
// const shoppingTableBody = document.getElementById('table-body');
// const itemNameInput = document.getElementById('item-name');
// const itemAmountInput = document.getElementById('item-amount');
// const addItemButton = document.getElementById('add-item');
// const budgetDisplay = document.getElementById('budget-display');
// const setBudgetButton = document.getElementById('set-budget');
// const totalCostDisplay = document.getElementById('total-cost');

// let totalCost = 0;
// let budget = 0;

// // Add Item to Table
// addItemButton.addEventListener('click', () => {
//     const itemName = itemNameInput.value.trim();
//     const itemAmount = parseFloat(itemAmountInput.value.trim());

//     if (budget === 0) {
//         alert('Please set a budget first.');
//         return;
//     }

//     if (!itemName || isNaN(itemAmount) || itemAmount <= 0) {
//         alert('Please enter a valid item name and amount.');
//         return;
//     }

//     // Add row to the table
//     addItemToTable(itemName, itemAmount);

//     // Save item to localStorage
//     saveItem(itemName, itemAmount);

//     // Update total cost
//     totalCost += itemAmount;
//     updateTotal();

//     // Save total cost to localStorage
//     localStorage.setItem('totalCost', totalCost.toFixed(2));

//     // Clear inputs
//     itemNameInput.value = '';
//     itemAmountInput.value = '';
// });

// // Set Budget
// setBudgetButton.addEventListener('click', () => {
//     const userBudget = prompt('Enter your budget:');
//     if (userBudget && !isNaN(userBudget)) {
//         budget = parseFloat(userBudget);
//         budgetDisplay.textContent = budget.toFixed(2);

//         // Save budget to localStorage
//         localStorage.setItem('budget', budget.toFixed(2));

//         updateTotal();
//     }
// });

// // Add item to table
// function addItemToTable(itemName, itemAmount) {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//         <td>${itemName}</td>
//         <td>${itemAmount.toFixed(2)}</td>
//         <td>
//             <button class="button edit-button">Edit</button>
//             <button class="button remove-button">Remove</button>
//         </td>
//     `;
//     shoppingTableBody.appendChild(row);
//     // Attach event listeners for the buttons
//     const editButton = row.querySelector('.edit-button');
//     const removeButton = row.querySelector('.remove-button');

//     editButton.addEventListener('click', () => editItem(row, itemName, itemAmount));
//     removeButton.addEventListener('click', () => removeItem(row, itemName, itemAmount));
// }

// function editItem(row, oldName, oldAmount) {
//     const newName = prompt('Enter the new item name:', oldName);
//     const newAmount = parseFloat(prompt('Enter the new amount:', oldAmount));

//     if (newName && !isNaN(newAmount) && newAmount > 0) {
//         // Update row
//         row.children[0].textContent = newName;
//         row.children[1].textContent = newAmount.toFixed(2);

//         // Update localStorage
//         updateItemInLocalStorage(oldName, newName, newAmount);

//         // Adjust total cost
//         totalCost -= oldAmount;
//         totalCost += newAmount;
//         updateTotal();
//     } else {
//         alert('Invalid inputs. Please try again.');
//     }
// }

// function removeItem(row, itemName, itemAmount) {
//     if (confirm('Are you sure you want to remove this item?')) {
//         // Remove row
//         row.remove();

//         // Remove from localStorage
//         removeItemFromLocalStorage(itemName, itemAmount);

//         // Adjust total cost
//         totalCost -= itemAmount;
//         updateTotal();
//     }
// }
// // Save item to localStorage
// function saveItem(itemName, itemAmount) {
//     const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
//     shoppingList.push({ name: itemName, amount: itemAmount });
//     localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
// }

// // Update item in localStorage
// function updateItemInLocalStorage(oldName, newName, newAmount) {
//     let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
//     shoppingList = shoppingList.map(item =>
//         item.name === oldName ? { name: newName, amount: newAmount } : item
//     );
//     localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
// }

// // Remove item from localStorage
// function removeItemFromLocalStorage(itemName, itemAmount) {
//     let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
//     shoppingList = shoppingList.filter(item => item.name !== itemName || item.amount !== itemAmount);
//     localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
// }

// // Update Total and Check Budget
// function updateTotal() {
//     totalCostDisplay.textContent = totalCost.toFixed(2);
//     if (totalCost > budget) {
//         alert('Your budget is exceeded!');
//     }
// }

// // Handle Table Actions
// shoppingTableBody.addEventListener('click', (event) => {
//     const row = event.target.closest('tr');
//     const itemName = row.children[0].textContent;
//     const itemAmount = parseFloat(row.children[1].textContent);

//     if (event.target.classList.contains('remove-button')) {
//         // Update total cost and remove item
//         totalCost -= itemAmount;
//         updateTotal();

//         // Remove row and update localStorage
//         shoppingTableBody.removeChild(row);
//         removeItemFromLocalStorage(itemName, itemAmount);
//     } else if (event.target.classList.contains('edit-button')) {
//         // Edit logic
//         const newName = prompt('Edit item name:', itemName) || itemName;
//         const newAmount = parseFloat(prompt('Edit amount:', itemAmount)) || itemAmount;

//         // Update table row
//         row.children[0].textContent = newName;
//         row.children[1].textContent = newAmount.toFixed(2);

//         // Update localStorage
//         updateItemInLocalStorage(itemName, newName, newAmount);

//         // Update total cost
//         totalCost += newAmount - itemAmount;
//         updateTotal();
//     }
// });


// Tabs Navigation
const homeTab = document.getElementById('home-tab');
const listTab = document.getElementById('list-tab');
const settingsTab = document.getElementById('settings-tab');

const homeSection = document.getElementById('home-section');
const listSection = document.getElementById('list-section');
const settingsSection = document.getElementById('settings-section');

// Shopping List Logic
const shoppingTableBody = document.getElementById('table-body');
const itemNameInput = document.getElementById('item-name');
const itemAmountInput = document.getElementById('item-amount');
const addItemButton = document.getElementById('add-item');
const budgetDisplay = document.getElementById('budget-display');
const setBudgetButton = document.getElementById('set-budget');
const totalCostDisplay = document.getElementById('total-cost');

let totalCost = 0;
let budget = 0;

// Restore the active tab and data from localStorage
window.addEventListener('load', () => {
    const activeTabId = localStorage.getItem('activeTab') || 'home-tab';
    const activeTab = document.getElementById(activeTabId);
    const activeSection = document.getElementById(activeTabId.replace('-tab', '-section'));
    setActiveTab(activeTab, activeSection);

    // Restore budget
    const savedBudget = parseFloat(localStorage.getItem('budget')) || 0;
    budget = savedBudget;
    budgetDisplay.textContent = budget.toFixed(2);

    // Restore shopping list and total cost
    const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
    totalCost = 0; // Reset total cost
    savedItems.forEach(item => {
        addItemToTable(item.name, item.amount, false);
        totalCost += Math.abs(item.amount);
    });
    updateTotal();
});

// Tab Navigation Handlers
homeTab.addEventListener('click', () => setActiveTab(homeTab, homeSection));
listTab.addEventListener('click', () => setActiveTab(listTab, listSection));
settingsTab.addEventListener('click', () => setActiveTab(settingsTab, settingsSection));

function setActiveTab(tab, section) {
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active-tab'));
    tab.classList.add('active-tab');
    document.querySelectorAll('main section').forEach(sec => sec.classList.add('hidden'));
    section.classList.remove('hidden');
    localStorage.setItem('activeTab', tab.id);
}

// Add Item to Table
addItemButton.addEventListener('click', () => {
    const itemName = itemNameInput.value.trim();
    const itemAmount = parseFloat(itemAmountInput.value.trim());

    if (budget === 0) {
        alert('Please set a budget first.');
        return;
    }

    if (!itemName || isNaN(itemAmount) || itemAmount <= 0) {
        alert('Please enter a valid item name and amount.');
        return;
    }

    if (totalCost + itemAmount > budget) {
        alert('Your budget is exceeded!');
        return;
    }

    addItemToTable(itemName, Math.abs(itemAmount));
    saveItem(itemName, itemAmount);
    totalCost += Math.abs(itemAmount);
    updateTotal();

    itemNameInput.value = '';
    itemAmountInput.value = '';
});

// Set Budget
setBudgetButton.addEventListener('click', () => {
    const userBudget = prompt('Enter your budget:');
    if (userBudget && !isNaN(userBudget)) {
        budget = parseFloat(userBudget);
        budgetDisplay.textContent = budget.toFixed(2);
        localStorage.setItem('budget', budget.toFixed(2));
        updateTotal();
    }
});

function addItemToTable(itemName, itemAmount, save = true) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${itemName}</td>
        <td>${itemAmount.toFixed(2)}</td>
        <td>
            <button class="button edit-button">Edit</button>
            <button class="button remove-button">Remove</button>
        </td>
    `;
    shoppingTableBody.appendChild(row);

    const editButton = row.querySelector('.edit-button');
    const removeButton = row.querySelector('.remove-button');

    editButton.addEventListener('click', () => editItem(row, itemName, itemAmount));
    removeButton.addEventListener('click', () => removeItem(row, itemName, itemAmount));

    if (save) saveItem(itemName, itemAmount);
}

function editItem(row, oldName, oldAmount) {
    const newName = prompt('Enter the new item name:', oldName) || oldName;
    const newAmount = parseFloat(prompt('Enter the new amount:', oldAmount)) || oldAmount;

    if (newName && !isNaN(newAmount) && newAmount > 0) {
        const difference = newAmount - oldAmount;
        if (totalCost + difference > budget) {
            alert('Your budget is exceeded!');
            return;
        }

        row.children[0].textContent = newName;
        row.children[1].textContent = newAmount.toFixed(2);
        updateItemInLocalStorage(oldName, newName, newAmount);
        totalCost += difference;
        updateTotal();
    } else {
        alert('Invalid inputs. Please try again.');
    }
}

function removeItem(row, itemName, itemAmount) {
    if (confirm('Are you sure you want to remove this item?')) {
        row.remove();
        removeItemFromLocalStorage(itemName);
        totalCost -= Math.abs(itemAmount);
        //totalCost -= itemAmount;
        // Check if there are no more rows left in the table
        if (shoppingTableBody.children.length === 0) {
            totalCost = 0; // Reset totalCost to 0
        }
        updateTotal();
    }
}

function saveItem(itemName, itemAmount) {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.push({ name: itemName, amount: itemAmount });
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function updateItemInLocalStorage(oldName, newName, newAmount) {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList = shoppingList.map(item =>
        item.name === oldName ? { name: newName, amount: newAmount } : item
    );
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function removeItemFromLocalStorage(itemName) {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList = shoppingList.filter(item => item.name !== itemName);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function updateTotal() {
    totalCostDisplay.textContent = totalCost.toFixed(2);
    if (totalCost > budget) {
        alert('Your budget is exceeded!');
    }
}

