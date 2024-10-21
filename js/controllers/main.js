import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {

    const card = document.createElement("div");

    card.classList.add("card")
    card.innerHTML = `
        
                <div class="producto">   
                    <img src="${image}" alt="${name}">                  
                </div>

                <div class="producto-container--info">
                    <p>${name}</p>
                    <div>
                        <p>$ ${price}</p>
                        <button class="delete-button" data-id="${id}">
                            <img src="./assets/lixeira.png" alt="Deletar">
                        </button>

                    </div>


                </div>
    `;

    productContainer.appendChild(card);
    return card;

}


const render = async() => { 

    try {

        const listProducts = await servicesProducts.productList();
        console.log(listProducts) 
        
        listProducts.forEach(product => {
            productContainer.appendChild(

                createCard(

                    product.name,
                    product.price,
                    product.image,
                    product.id
                )

            )
            
        });

    } catch (error) {
        
        console.log(error); 
    }
};

form.addEventListener("submit", (event) =>{

    event.preventDefault(); 

    const name = document.querySelector("[data-name]").value; 
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price, image).then((res) =>console.log(res)).catch((err)=>
    console.log(err));

} )

document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector('.contenedor-productos');
    const form = document.querySelector('[data-form]');
    const clearButton = document.querySelector('.limpar-input');

    const handleDeleteProduct = async (event) => {
        const button = event.target.closest('.delete-button');
        if (!button) return;
        
        const id = button.getAttribute('data-id');
        if (id) {
            await servicesProducts.deleteProducts(id);
            button.closest('.card').remove();
        }
    };

    productContainer.addEventListener('click', handleDeleteProduct);

    const handleClearForm = () => {
        form.reset();
    };

    clearButton.addEventListener('click', handleClearForm);

    const addProductToDOM = (product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        productCard.setAttribute('data-id', product.id);
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>Precio: $${product.price}</p>
            <button class="delete-button" data-id="${product.id}">
                <img src="assets/lixeira.png" alt="deletar">
            </button>
        `;
        productContainer.appendChild(productCard);
    };

    const loadProducts = async () => {
        const products = await servicesProducts.productList();
        products.forEach(addProductToDOM);
    };

    loadProducts();
});