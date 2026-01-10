const API_URL="https://dummyjson.com/products?limit=10";
const productBody=document.getElementById("productBody");

//Global variable to track the row being edited
let editRow=null;

//Load Products on page load
window.onload=loadProducts;

async function loadProducts(){
    try{
        const response=await fetch(API_URL);
        const data=await response.json();

        productBody.innerHTML="";

                data.products.forEach(product => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><img src="${product.thumbnail}" width="50"></td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
                <td>
                    <button class="edit" onclick="editProduct(this)">Edit</button>
                    <button class="delete" onclick="deleteProduct(this)">Delete</button>
                </td>
            `;

            productBody.appendChild(row);
        });

    } catch (error) {
        alert("Failed to load products");
        console.error(error);
    }
}
