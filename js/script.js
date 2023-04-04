var id = "id=" + Math.random().toString(16).slice(2)

// switch case based on url path

const path = window.location.pathname;
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

let orderId = '';
let orderExists = '';

switch (path) {
    case "/":
    case "/index.html":
        console.log("hi")
        const designUrl = document.querySelector('.specsLink');
        console.log(designUrl)
        designUrl.href = `specs.html#${id}`;
        break;
    case "/specs.html":

        orderId = window.location.hash.substring(1);
        orderExists = JSON.parse(localStorage.getItem(`order${orderId}`));
        
        const specsForm = document.querySelector('form');

        if(orderExists){
            console.log("order id exists");

            console.log(specsForm.size.value)
            console.log(orderExists.size)
            console.log(orderExists)

            specsForm.size.value = orderExists.size;
            specsForm.type.value = orderExists.type;

            specsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('form submitted');
                
                // add form values to order object
                orderExists.size = specsForm.size.value;
                orderExists.type = specsForm.type.value;
    
                orderExists.id = orderId;
    
                // add order object to localstorage
                localStorage.setItem(`order${orderId}`, JSON.stringify(orderExists));
                console.log(order);
    
                // redirect to designer.html
                window.location.href = `designer.html#${orderId}`;
            });
        }else {
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
        }
        
        break;
    case "/designer.html":
        // get order object from localstorage
        orderId = window.location.hash.substring(1);
        orderExists = JSON.parse(localStorage.getItem(`order${orderId}`));
        const designForm = document.querySelector('form');

        if(orderExists){
            console.log("order id exists");

            designForm.color.value = orderExists.color;
            designForm.text.value = orderExists.text;
            designForm.textColor.value = orderExists.textColor;
            // designForm.image.value = orderExists.imageUrl;
        }

        // const figure = document.querySelector('figure');
        // const shirtImage = document.querySelector('figure > img');
        // const colorInputs = document.querySelectorAll('input[name="color"]');
        
        // // change img src based on color input
        // colorInputs.forEach(input => {
        //     if(input.checked){
        //         shirtImage.src = `images/tshirt-${input.value}-large.png`;
        //     }
        //     input.addEventListener('change', (e) => {
        //         shirtImage.src = `images/tshirt-${e.target.value}-large.png`;
        //     });
        // });

        const shirtText = document.querySelector('figure > figcaption');
        const shirtTextInput = document.querySelector('#text');
        shirtText.textContent = shirtTextInput.value;
        const shirtTextColor = document.querySelector('#textColor');
        document.documentElement.style.setProperty('--textColor', shirtTextColor.value);

        // change text color based on color input
        shirtTextColor.addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--textColor', e.target.value);
        });
        
        // change text content based on text input
        shirtTextInput.addEventListener('input', (e) => {
            shirtText.textContent = e.target.value;
        });


        const fileInput = document.querySelector('#image');
        const uploadImage = document.querySelector(".overlayImg");
        uploadImage.src = orderExists.imageUrl;

        fileInput.addEventListener('change', (e) => {

            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const image = e.target.result;
                orderExists.imageUrl = image;
                console.log(image)
            });
            reader.readAsDataURL(file);
            uploadImage.src = URL.createObjectURL(file);
        });


        designForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('form submitted');

            // add form values to order object
            orderExists.color = designForm.color.value;
            orderExists.text = designForm.text.value;
            orderExists.textColor = designForm.textColor.value;
            // orderExists.imageUrl = designForm.image.value;
    
            // edit order object to localstorage

            localStorage.setItem(`order${orderId}`, JSON.stringify(orderExists));

            // redirect to overview.html

            window.location.href = 'overview.html';

        });

        break;
    case "/overview.html":

        // remove placeholder
        const placeholder = document.querySelector('.orderPlaceholder');
        placeholder.remove();

        // get all order objects from localstorage which start with "order"

        const orders = Object.keys(localStorage)
            .filter(key => key.includes("order"))
            .map(key => JSON.parse(localStorage.getItem(key)));

        const orderContainer = document.querySelector('.orders');

        if(orders && orders.length > 0){
            console.log("order object exists");

            orders.forEach(order => {
                createOrderTable(order, orderContainer);
            });

        }else {
            console.log("order object does not exist");
            
            const emptyContainer = document.createElement("section")
            emptyContainer.classList.add("noOrders");
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "No orders found";
            const emptyLink = document.createElement("a");
            emptyLink.classList.add("btn-link");
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

    section.innerHTML = `
        <h2>${orderObject.type} T-shirt</h2>
        <div>
            <figure>
                <svg class="shirtImg" viewBox="0 0 124 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M79.9727 1C79.4538 10.476 71.6056 18 62 18C52.3944 18 44.5462 10.476 44.0273 1M78.9711 1C78.4534 9.92338 71.0531 17 62 17C52.9468 17 45.5465 9.92338 45.0289 1H78.9711ZM62 19C72.158 19 80.4541 11.0286 80.9741 1H93.4863C94.2178 1 94.9241 1.26729 95.4724 1.75158L121.618 24.8472C122.776 25.8693 122.968 27.6029 122.063 28.8539L109.994 45.5379C108.898 47.0526 106.699 47.2071 105.402 45.8605L96.0671 36.1665C95.317 35.3875 94 35.9185 94 37V98C94 99.6569 92.6568 101 91 101H33C31.3431 101 30 99.6569 30 98V37C30 35.9185 28.683 35.3875 27.9328 36.1665L18.5979 45.8605C17.3012 47.2071 15.102 47.0526 14.0063 45.5379L1.93705 28.8539C1.03208 27.6029 1.22443 25.8693 2.38162 24.8472L28.5276 1.75158C29.0758 1.26729 29.7821 1 30.5137 1H43.0258C43.5459 11.0286 51.842 19 62 19Z" fill="${orderObject.color}" stroke="black" stroke-width="2"/>
                </svg>

                ${orderObject.imageUrl? `<img src="${orderObject.imageUrl}" alt="Uploaded image on tshirt" class="overlayImg"/>` : ""}

                <figcaption style="color: ${orderObject.textColor}">${orderObject.text? orderObject.text : ""}</figcaption>
            </figure>
            <div class="orderSettings">
                <a href="specs.html#${orderObject.id}" class="btn-link">Edit</a>
                <a href="userdata.html#${orderObject.id}" class="btn-link">Order</a>
            </div>
        </div>
        <table>
            <tr>
                <th>Color:</th>
                <td>${orderObject.color}</td>
                <th>Size:</th>
                <td>${orderObject.size}</td>
            </tr>
            <tr>
                <th>Text:</th>
                <td>${orderObject.text? orderObject.text : "None"}</td>
                <th>Image:</th>
                <td>${orderObject.imageUrl? "Yes" : "No"}</td>
            </tr>
            <tr>
                <th>Text color:</th>
                <td>${orderObject.text? orderObject.textColor : "None"}</td>
                <th>Amount:</th>
                <td>1</td>
            </tr>
        </table>
    `

    
    container.appendChild(section);
}
