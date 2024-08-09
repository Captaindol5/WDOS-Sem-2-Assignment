
const inputFields = document.querySelectorAll(".Vegeqty");
const cartButtons = document.querySelectorAll(".btn");
const itemPrices = document.querySelectorAll(".price");
const itemNames = document.querySelectorAll(".itemname");
const cartTable = document.getElementById("bcart");
const totalSection = document.getElementById("totalg");
const addToFavouritesButton = document.querySelector(".favbtn");
const applyFavouritesButton = document.querySelector(".appfavbtn");
const orderButton = document.getElementById("orderButton");
let sum = 0;

orderButton.onclick = saveToLocalStorage;
cartButtons.forEach(cartButtonFunction);
function cartButtonFunction(element, index) {
    element.onclick = getDetails.bind(this, index);
}

addToFavouritesButton.onclick = saveToFavourites;

applyFavouritesButton.onclick = loadFromFavourites;


function getDetails(index) {
    let itemname = itemNames[index].textContent;
    let priceText = itemPrices[index].textContent;
    let price = Number(priceText.replace("LKR.", "").replace(",", "").trim());
    let itemQuantity = Number(inputFields[index].value);
    let total = price * itemQuantity;

    if (itemQuantity > 0) {
        sum += total;
        let newRow = cartTable.insertRow();
        newRow.setAttribute("data-index", index);

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);

        cell1.textContent = itemname;
        cell2.textContent = `LKR ${price.toFixed(2)}`;
        cell3.textContent = itemQuantity;
        cell4.textContent = `LKR ${total.toFixed(2)}`;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeItem(newRow, total);
        };
        cell5.appendChild(removeButton);

        updateTotal();
    } else {
        alert("Please enter a valid quantity");
    }
}


function removeItem(row, itemTotal) {
    sum -= itemTotal;
    cartTable.removeChild(row);
    updateTotal();
}


function updateTotal() {
    totalSection.textContent = `LKR ${sum.toFixed(2)}`;
}


function saveToFavourites() {
    const cartItems = [];
    const rows = cartTable.rows;
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const item = {
            name: cells[0].textContent,
            price: cells[1].textContent,
            quantity: cells[2].textContent,
            total: cells[3].textContent
        };
        cartItems.push(item);
    }
    localStorage.setItem('favouriteCart', JSON.stringify(cartItems));
    alert("Cart saved as favourites!");
}


function loadFromFavourites() {
    const favouriteCart = JSON.parse(localStorage.getItem('favouriteCart'));
    if (favouriteCart) {
        
        sum = 0;
        cartTable.innerHTML = '';
        favouriteCart.forEach(item => {
            let newRow = cartTable.insertRow();

            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);

            cell1.textContent = item.name;
            cell2.textContent = item.price;
            cell3.textContent = item.quantity;
            cell4.textContent = item.total;

            let removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = function() {
                removeItem(newRow, parseFloat(item.total.replace("LKR", "").trim()));
            };
            cell5.appendChild(removeButton);

            sum += parseFloat(item.total.replace("LKR", "").trim());
        });
        updateTotal();
        alert("Favourites applied to the cart!");
    } else {
        alert("No favourite items found!");
    }
}


    

function saveToLocalStorage() {
    const cartItems = [];
    const rows = cartTable.rows;
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const item = {
            name: cells[0].textContent,
            price: cells[1].textContent,
            quantity: cells[2].textContent,
            total: cells[3].textContent
        };
        cartItems.push(item);
    }
    localStorage.setItem('order', JSON.stringify(cartItems));
    console.log(JSON.parse(localStorage.getItem("order")))
    
}