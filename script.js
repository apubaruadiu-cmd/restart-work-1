function removeActiveClass(){
    const activeBtn = document.getElementsByClassName("active");
    for(let btn of activeBtn){
        btn.classList.remove("active");
    }
}


const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data));
};

const loadAllProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayAllProducts(data)
    });
};

const displayAllProducts = (allproducts) => {
    const productContainer = document.getElementById("products-container");
    productContainer.innerHTML = "";

    allproducts.forEach((product) => {
        const allproductcard = document.createElement("div");
        allproductcard.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                        <figure class="bg-[#E5E7EB] p-3">
                            <img class="h-80" src="${product.image}"
                                alt="Shoes" />
                        </figure>
                        <div class="card-body">
                            <div class="badge-rating flex justify-between items-center mb-4">
                                <div class="badge badge-soft badge-primary">Mens Clothing</div>
                                <div class="text-gray-500"><i class="fa-solid fa-star text-warning"></i> 3.9 (120)</div>
                            </div>
                            <h2 class="card-title truncate font-medium text-2xl block">${product.title}</h2>
                            <div class="product-price font-bold text-xl">$${product.price}</div>
                            <div class="card-actions mt-6">
                                <button class="btn btn-outline flex-1"><i class="fa-regular fa-eye"></i> Details</button>
                                <button class="btn btn-primary flex-1"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                            </div>
                        </div>
                    </div>
        `;

        productContainer.append(allproductcard)
    })
} 

const loadProductCategory = (category) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;
  fetch(url)
    .then((res) => res.json())
    // .then((data) => displayProductCategory(data));
    .then((data) => {
        removeActiveClass();
        const clickedBtn =  document.getElementById(`${category}`);
        clickedBtn.classList.add("active");
        displayProductCategory(data)
    });
};

const displayProductCategory = (products) => {
  const productContainer = document.getElementById("products-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                        <figure class="bg-[#E5E7EB] p-3">
                            <img class="h-80" src="${product.image}"
                                alt="Shoes" />
                        </figure>
                        <div class="card-body">
                            <div class="badge-rating flex justify-between items-center mb-4">
                                <div class="badge badge-soft badge-primary">Mens Clothing</div>
                                <div class="text-gray-500"><i class="fa-solid fa-star text-warning"></i> 3.9 (120)</div>
                            </div>
                            <h2 class="card-title truncate font-medium text-2xl block">${product.title}</h2>
                            <div class="product-price font-bold text-xl">$${product.price}</div>
                            <div class="card-actions mt-6">
                                <button class="btn btn-outline flex-1"><i class="fa-regular fa-eye"></i> Details</button>
                                <button class="btn btn-primary flex-1"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                            </div>
                        </div>
                    </div>
        `;

    productContainer.append(productCard);
  });
};

const displayCategories = (categories) => {
  const tabContainer = document.getElementById("tab-container");
//   tabContainer.innerHTML = "";

  categories.forEach((category) => {
    const tabBtn = document.createElement("div");
    tabBtn.innerHTML = `
                <button id="${category}" class="btn hover:bg-primary hover:text-white">${category}</button>
        `;
    tabBtn.addEventListener("click", () => {
      loadProductCategory(category);
    });

    tabContainer.append(tabBtn);
  });
};

loadCategories();
loadAllProducts();
