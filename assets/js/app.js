const API_URL = "https://dummyjson.com/products?limit=10";
const productBody = document.getElementById("productBody");

//Global variable to track the row being edited
let editRow = null;

//Load Products on page load
window.onload = loadProducts;

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        productBody.innerHTML = "";

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

// Add / Update product (UI + API simulated)
async function addProduct() {
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;

    if (!title || !category || !price) {
        alert("Please fill all fields");
        return;
    }

    if (editRow) {
        // If editing, update the existing row
        editRow.children[1].textContent = title;
        editRow.children[2].textContent = "$" + price;
        editRow.children[3].textContent = category;

        alert("Product Updated");
        editRow = null; // reset editRow
    } else {
        // Add new product via API (simulated)
        const newProduct = {
            title: title,
            category: category,
            price: price
        };

        try {
            const response = await fetch("https://dummyjson.com/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });

            const result = await response.json();
            console.log(result);

            // Add new row to table
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="https://via.placeholder.com/50"></td>
                <td>${title}</td>
                <td>$${price}</td>
                <td>${category}</td>
                <td>
                    <button class="edit" onclick="editProduct(this)">Edit</button>
                    <button class="delete" onclick="deleteProduct(this)">Delete</button>
                </td>
            `;
            productBody.prepend(row);

            alert("Product Added");

        } catch (error) {
            alert("Add product failed");
            console.error(error);
        }
    }

    // Clear form
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
}


