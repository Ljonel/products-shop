document.addEventListener("DOMContentLoaded", function () {
    let products = []
    getProducts();

    async function getProducts() {
        const response = await fetch("products.json")
        products = await response.json();
        showProducts(products);
    }

    const select = document.querySelector(".select-category");
    select.addEventListener("change", filterProducts)

    const container = document.querySelector(".products-container");
    const filter = document.querySelector(".sort");
    filter.addEventListener("click", () => {
        container.classList.toggle("sorted")
    })

    function showProducts(products) {
        container.innerHTML = ""
        Object.values(products).map(el => {
            const status = el.prod_status.split(",");
            let div = document.createElement("div")
            div.classList.add("wrap");
            console.log(el);
            div.innerHTML = `
                    <div class="product-card" title="Kliknij">
                        <div class="card-img">
                            <img src="img/model.png" alt="">
                            ${el.prod_oldprice ? ` <div class="card-promotion">-${Math.round((el.prod_oldprice-el.prod_price)*100/el.prod_oldprice)}%</div>` : ''}
                            <ul>
                                ${status.map(x => x ? `<li>${x}</li>` : "").join('')}
                            </ul>
                        </div>
                        <div class="card-content">
                            <h3>${el.prod_name}</h3>
                            <h1>${el.prod_price}zł</h1>
                        ${el.prod_oldprice ? `<h4>${el.prod_oldprice}zł</h4>` : ""} 
                        </div>
                    </div>
                    <div class="back">
                        <h1>Producent: ${el.prd_name}</h1>
                        <div class="back-content">
                            <div class="back-element">
                            <img src="img/view.png"/>
                            <p class="views"> ${el.prod_views}</p>
                            </div>
                            <div class="back-element">
                                <img src="img/avaible.png"/>
                                <p class="views">${el.prod_availability_status_id} szt.</p>

                            </div>
                            <div class="back-element">
                                <img src="img/business.png"/>
                                <p class="views">${el.prod_weight}g</p>

                            </div>
                        </div>
                        <div class="buy-container"></div>
                       
                    </div>
               `
            container.appendChild(div);

            div.addEventListener("click", () => {
                div.classList.toggle("active");
            });
        })
    }

    function filterProducts() {
        const actuallFilterValue = select.value;
        let arr = []
        Object.values(products).filter(product => {
            if (product.prod_status.includes(actuallFilterValue)) {
                arr.push(product);
                showProducts(arr)
                console.log(product);
            }
            if (actuallFilterValue === "all") {
                showProducts(products)
            }
        })
    }

})