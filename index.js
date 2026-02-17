const loadHomeAllProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then(data => displayHomeAllProducts(data))
};

const loadProductDetail = async(id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayProductDetails(details);
}

const displayProductDetails = (details) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
        <div>
            <div class="text-2xl font-bold mb-2">
              ${details.title}
            </div>
            <div class="text-gray-500">
              <i class="fa-solid fa-star text-warning"></i> ${details.rating.rate} (${details.rating.count})
            </div>
          </div>
          <div class="text-md font-medium text-gray-600">
            ${details.description}
          </div>
          <div class="text-3xl font-bold">$${details.price}</div>
          <button class="btn btn-primary">Buy Now</button>
    `;

    document.getElementById("my_modal").showModal();
}

const displayHomeAllProducts = (allproducts) => {
    const productContainer = document.getElementById("products-container");
    productContainer.innerHTML = "";

     const firstThree = allproducts.slice(0, 3);

    firstThree.forEach((product) => {
        const allproductcard = document.createElement("div");
        allproductcard.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                        <figure class="bg-[#E5E7EB] p-3">
                            <img class="h-80" src="${product.image}"
                                alt="Shoes" />
                        </figure>
                        <div class="card-body">
                            <div class="badge-rating flex justify-between items-center mb-4">
                                <div class="badge badge-soft badge-primary">${product.category}</div>
                                <div class="text-gray-500"><i class="fa-solid fa-star text-warning"></i> ${product.rating.rate} (${product.rating.count})</div>
                            </div>
                            <h2 class="card-title truncate font-medium text-2xl block">${product.title}</h2>
                            <div class="product-price font-bold text-xl">$${product.price}</div>
                            <div class="card-actions mt-6">
                                <button onclick="loadProductDetail(${product.id})" class="btn btn-outline flex-1"><i class="fa-regular fa-eye"></i> Details</button>
                                <button class="btn btn-primary flex-1"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                            </div>
                        </div>
                    </div>
        `;

        productContainer.append(allproductcard)
    })
} 

loadHomeAllProducts();