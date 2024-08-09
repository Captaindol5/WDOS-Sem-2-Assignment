const cartTable = document.getElementById("bcart");
const totalSection = document.getElementById("totalg");


LoadLocalStorage();

function LoadLocalStorage() {
    const favouriteCart = JSON.parse(localStorage.getItem('order'));
    
        
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

            
            sum += parseFloat(item.total.replace("LKR", "").trim());
        });
        updateTotal();
        
    
}

function updateTotal() {
    totalSection.textContent = `LKR ${sum.toFixed(2)}`;
}


document.getElementById('FormOrder').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const firstName = document.getElementById('FirstName').value;
    const lastName = document.getElementById('LastName').value;
    const address = document.getElementById('add').value;

    
    const message = `Thank you ${firstName} ${lastName}, the order will be delivered to ${address} within 2 days.`;

    
    alert(message);

    this.reset();

});