var id = "id=" + Math.random().toString(16).slice(2)

// switch case based on url path

var path = window.location.pathname;
console.log(path)

// create order object to eventually send to localstorage
let order = {
    id: '',
    size: '',
    type: '',
    color: '',
    text: '',
    textColor: '',
    imageUrl: '',
};

switch (path) {
    case "/":
    case "/index.html":
        console.log("hi")
        const designUrl = document.querySelector('.specsLink');
        console.log(designUrl)
        designUrl.href = `specs.html#${id}`;
        break;
    case "/specs.html":

        const orderId = window.location.hash.substring(1);
        const orderExists = JSON.parse(localStorage.getItem(`order${orderId}`));
        
        const specsForm = document.querySelector('form');

        if(orderExists){
            console.log("order id exists");

            console.log(specsForm.size.value)
            console.log(orderExists.size)
            console.log(orderExists)

            specsForm.size.value = orderExists.size;
            specsForm.type.value = orderExists.type;

        }

        specsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('form submitted');
            
            // add form values to order object
            order.size = specsForm.size.value;
            order.type = specsForm.type.value;

            order.id = orderId;

            // add order object to localstorage
            localStorage.setItem(`order${orderId}`, JSON.stringify(order));
            console.log(order);

            // redirect to designer.html
            window.location.href = `designer.html#${orderId}`;
        });
        
        break;
    case "/designer.html":

        // get order object from localstorage
        order = JSON.parse(localStorage.getItem('order'));
        console.log(order);

        const designForm = document.querySelector('form');

        designForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('form submitted');

            // add form values to order object
            order.color = designForm.color.value;
            order.text = designForm.text.value;
            order.textColor = designForm.textColor.value;
            order.imageUrl = designForm.image.value;

            // edit order object to localstorage

            localStorage.setItem('order', JSON.stringify(order));

            console.log(order);

            // redirect to overview.html

            window.location.href = 'overview.html';

        });

        break;
    case "/overview.html":
        // get all order objects from localstorage which start with "order"

        const orders = Object.keys(localStorage)
            .filter(key => key.includes("order"))
            .map(key => JSON.parse(localStorage.getItem(key)));

        const orderContainer = document.querySelector('.orders');

        if(orders){
            console.log("order object exists");

            orders.forEach(order => {
                createOrderTable(order, orderContainer);
            });


        }else {
            console.log("order object does not exist");
            
            const emptyContainer = document.createElement("section")
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "No orders found";
            const emptyLink = document.createElement("a");
            emptyLink.href = "index.html";
            emptyLink.textContent = "Go to homepage";
            emptyContainer.appendChild(emptyMessage);
            emptyContainer.appendChild(emptyLink);

            orderContainer.appendChild(emptyContainer);
        }
        break;
    default:
        // do something
}


function createOrderTable(orderObject, container) {
    const section = document.createElement("section");

    // create h2 element and set text content from local storage
    const h2 = document.createElement("h2");
    h2.textContent = "T-shirt"; 
    section.appendChild(h2);

    // create table element
    const table = document.createElement("table");

    // create first row of table
    const tr1 = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.textContent = "Color:";
    const td1 = document.createElement("td");
    td1.textContent = orderObject.color; 
    const th2 = document.createElement("th");
    th2.textContent = "Size:";
    const td2 = document.createElement("td");
    td2.textContent = orderObject.size; 
    tr1.appendChild(th1);
    tr1.appendChild(td1);
    tr1.appendChild(th2);
    tr1.appendChild(td2);

    // create second row of table
    const tr2 = document.createElement("tr");
    const th3 = document.createElement("th");
    th3.textContent = "Text:";
    const td3 = document.createElement("td");
    td3.textContent = orderObject.text || "None"; // if product text is not found in local storage, use default value
    const th4 = document.createElement("th");
    th4.textContent = "Image:";
    const td4 = document.createElement("td");
    td4.textContent = orderObject.image || "None"; // if product image is not found in local storage, use default value
    tr2.appendChild(th3);
    tr2.appendChild(td3);
    tr2.appendChild(th4);
    tr2.appendChild(td4);

    // create third row of table
    const tr3 = document.createElement("tr");
    const th5 = document.createElement("th");
    th5.textContent = "Text color:";
    const td5 = document.createElement("td");
    td5.textContent = orderObject.textColor || "None"; // if product text color is not found in local storage, use default value
    const th6 = document.createElement("th");
    th6.textContent = "Amount:";
    const td6 = document.createElement("td");
    td6.textContent = "1"; // if product amount is not found in local storage, use default value
    tr3.appendChild(th5);
    tr3.appendChild(td5);
    tr3.appendChild(th6);
    tr3.appendChild(td6);

    // add rows to table
    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);

    // create link element and set attributes
    const link = document.createElement("a");
    link.href = `specs.html#${orderObject.id}`;
    link.textContent = "Edit";

    // add elements to section
    section.appendChild(table);
    section.appendChild(link);

    container.appendChild(section);
}