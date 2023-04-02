// var id = "id=" + Math.random().toString(16).slice(2)

// // switch case based on url path

// const path = window.location.pathname;
// console.log(path)

// // create order object to eventually send to localstorage
// let order = {
//     id: '',
//     size: '',
//     type: '',
//     color: '',
//     text: '',
//     textColor: '',
//     imageUrl: '',
// };

// let orderId = '';
// let orderExists = '';

// switch (path) {
//     case "/":
//     case "/index.html":
//         console.log("hi")
//         const designUrl = document.querySelector('.specsLink');
//         console.log(designUrl)
//         designUrl.href = `specs.html#${id}`;
//         break;
//     case "/specs.html":

//         orderId = window.location.hash.substring(1);
//         orderExists = JSON.parse(localStorage.getItem(`order${orderId}`));
        
//         const specsForm = document.querySelector('form');

//         if(orderExists){
//             console.log("order id exists");

//             console.log(specsForm.size.value)
//             console.log(orderExists.size)
//             console.log(orderExists)

//             specsForm.size.value = orderExists.size;
//             specsForm.type.value = orderExists.type;

//             specsForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 console.log('form submitted');
                
//                 // add form values to order object
//                 orderExists.size = specsForm.size.value;
//                 orderExists.type = specsForm.type.value;
    
//                 orderExists.id = orderId;
    
//                 // add order object to localstorage
//                 localStorage.setItem(`order${orderId}`, JSON.stringify(orderExists));
//                 console.log(order);
    
//                 // redirect to designer.html
//                 window.location.href = `designer.html#${orderId}`;
//             });
//         }else {
//             specsForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 console.log('form submitted');
                
//                 // add form values to order object
//                 order.size = specsForm.size.value;
//                 order.type = specsForm.type.value;
    
//                 order.id = orderId;
    
//                 // add order object to localstorage
//                 localStorage.setItem(`order${orderId}`, JSON.stringify(order));
//                 console.log(order);
    
//                 // redirect to designer.html
//                 window.location.href = `designer.html#${orderId}`;
//             });
//         }
        
//         break;
//     case "/designer.html":
//         // get order object from localstorage
//         orderId = window.location.hash.substring(1);
//         orderExists = JSON.parse(localStorage.getItem(`order${orderId}`));
//         const designForm = document.querySelector('form');

//         if(orderExists){
//             console.log("order id exists");

//             designForm.color.value = orderExists.color;
//             designForm.text.value = orderExists.text;
//             designForm.textColor.value = orderExists.textColor;
//             // designForm.image.value = orderExists.imageUrl;
//         }


//         const figure = document.querySelector('figure');
//         const shirtImage = document.querySelector('figure > img');
//         const colorInputs = document.querySelectorAll('input[name="color"]');
        
//         // change img src based on color input
//         colorInputs.forEach(input => {
//             if(input.checked){
//                 shirtImage.src = `images/tshirt-${input.value}-large.png`;
//             }
//             input.addEventListener('change', (e) => {
//                 shirtImage.src = `images/tshirt-${e.target.value}-large.png`;
//             });
//         });

//         const shirtText = document.querySelector('figure > figcaption');
//         const shirtTextInput = document.querySelector('#text');
//         shirtText.textContent = shirtTextInput.value;
//         const shirtTextColor = document.querySelector('#textColor');
//         document.documentElement.style.setProperty('--textColor', shirtTextColor.value);

//         // change text color based on color input
//         shirtTextColor.addEventListener('change', (e) => {
//             document.documentElement.style.setProperty('--textColor', e.target.value);
//         });
        
//         // change text content based on text input
//         shirtTextInput.addEventListener('input', (e) => {
//             shirtText.textContent = e.target.value;
//         });


//         const fileInput = document.querySelector('#image');
//         const uploadImage = document.querySelector(".overlayImg");
//         uploadImage.src = orderExists.imageUrl;

//         fileInput.addEventListener('change', (e) => {

//             const file = fileInput.files[0];
//             const reader = new FileReader();
//             reader.addEventListener('load', (e) => {
//                 const image = e.target.result;
//                 orderExists.imageUrl = image;
//                 console.log(image)
//             });
//             reader.readAsDataURL(file);
//             uploadImage.src = URL.createObjectURL(file);
//         });


//         designForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             console.log('form submitted');

//             // add form values to order object
//             orderExists.color = designForm.color.value;
//             orderExists.text = designForm.text.value;
//             orderExists.textColor = designForm.textColor.value;
//             // orderExists.imageUrl = designForm.image.value;
    
//             // edit order object to localstorage

//             localStorage.setItem(`order${orderId}`, JSON.stringify(orderExists));

//             // redirect to overview.html

//             window.location.href = 'overview.html';

//         });

//         break;
//     case "/overview.html":
//         // get all order objects from localstorage which start with "order"

//         const orders = Object.keys(localStorage)
//             .filter(key => key.includes("order"))
//             .map(key => JSON.parse(localStorage.getItem(key)));

//         const orderContainer = document.querySelector('.orders');

//         if(orders){
//             console.log("order object exists");

//             orders.forEach(order => {
//                 createOrderTable(order, orderContainer);
//             });


//         }else {
//             console.log("order object does not exist");
            
//             const emptyContainer = document.createElement("section")
//             const emptyMessage = document.createElement("p");
//             emptyMessage.textContent = "No orders found";
//             const emptyLink = document.createElement("a");
//             emptyLink.href = "index.html";
//             emptyLink.textContent = "Go to homepage";
//             emptyContainer.appendChild(emptyMessage);
//             emptyContainer.appendChild(emptyLink);

//             orderContainer.appendChild(emptyContainer);
//         }
//         break;
//     default:
//         // do something
// }


// function createOrderTable(orderObject, container) {
//     const section = document.createElement("section");

//     section.innerHTML = `
//         <h2>${orderObject.type} T-shirt</h2>
//         <figure>
//             <img src="images/tshirt-${orderObject.color}-large.png" alt="example of designed tshirt"/>

//             ${orderObject.imageUrl? `<img src="${orderObject.imageUrl}" alt="Uploaded image on tshirt" class="overlayImg"/>` : ""}

//             <figcaption style="color: ${orderObject.textColor}">${orderObject.text? orderObject.text : ""}</figcaption>
//         </figure>
//         <table>
//             <tr>
//                 <th>Color:</th>
//                 <td>${orderObject.color}</td>
//                 <th>Size:</th>
//                 <td>${orderObject.size}</td>
//             </tr>
//             <tr>
//                 <th>Text:</th>
//                 <td>${orderObject.text? orderObject.text : "None"}</td>
//                 <th>Image:</th>
//                 <td>${orderObject.imageUrl? "Yes" : "No"}</td>
//             </tr>
//             <tr>
//                 <th>Text color:</th>
//                 <td>${orderObject.text? orderObject.textColor : "None"}</td>
//                 <th>Amount:</th>
//                 <td>1</td>
//             </tr>
//         </table>
//         <a href="specs.html#${orderObject.id}">Edit</a>
//     `

    
//     container.appendChild(section);
// }
