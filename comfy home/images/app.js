//variables

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartToTal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
// cart 
let cart = [];
// buttons
let buttonsDOM = []; 
// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch("products.json");
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const {title, price } = items.fields;
                const { id } = item.sys;
                const image = image.fields.image.fields.file.url;
                return { title, price, id, image};
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}
//display products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            
            result +=`
            <!--single product-->
            <article class="product">
                <div class="img-container">
                    <img src="${product.image}" alt="product" 
                    class="product-img">
                    <button class="bag-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>${product.price}</h4>
            </article>
            <!--end of single product-->
            `;
        });
        productsDOM.innerHTML =  result;
    }
    getBagButtons(){
        const btns = [...document.querySelectorAll(".bag-btn")];
       buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
           let inCart = cart.find(item => item.id === id);
           if (inCart) {
            button.disabled = true
           }
            button.addEventListener('click', (event)=>{
                event.target.innerText = "In Cart"
                event.target.disabled = true;
                //get product from products
                let cartItem = {...Storage.getProduct(id), 
                    amount:1};
                

                //add product to the cart
                cart = [...cart, cartItem];
                //save cart in local storage
                Storage.saveCart(cart)
                //set cart values
                this.setCartValues(cart);
                //add cart values
                //display cart item
                this.addCartItem(cartItem);
                //show the cart
                 this.showCart();   
            });
           
        });
    }
    setCartValues(cart){
    letTempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
        tempTotal += item.price * item.amount;
        itemsTotal = item.amount;
    });
    cartToTal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = ` <img src="${item.image}" alt="product"> 
        <div>
         <h4>${item.title}</h4>
         <h5>${item.price}</h5>
         <span class="remove-item" data-id=#${item.id}>remove</span>
        </div>
         </div>
         <i class="fas fa-chevron-up" data-id=${item.id}></i>
         <p class="item-amount">${item.amount}</p>
         <i class="fas fa-chevron-down" data-id${item.id}></i>
        </div>`
        cartContent.appendChild(div);
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }

}


//local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));

    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product.id === id)
    }
}

document .addEventListener("DOMContentLoaded", ()=>{
     const ui = new UI();
     const products = new Products();

// get all products
products
.getProducts().
then(products =>{
    ui.displayProducts(products);
    Storage.saveProducts(products);
})
   .then(() => {
    ui.getBagButtons();
   });
});
