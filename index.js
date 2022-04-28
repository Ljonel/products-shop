const getProducts = async () => {
    const response = await fetch("products.json")
    return response.json();
}

const filterProducts = (products, actuallFilterValue) => {
    return Object.values(products).reduce((acc, item) => {
        if (item.prod_status.includes(actuallFilterValue)) {
            acc.push(item);
        }

        return acc;
    }, [])
}

const getDiscount = (oldPrice, price) => {
    return Math.round((oldPrice - price) * 100 / oldPrice);
}

document.addEventListener("DOMContentLoaded", async () => {
    const select = document.querySelector(".select-category");
    const container = document.querySelector(".products-container");
    const filter = document.querySelector(".sort");

    let products = await getProducts();

    select.addEventListener("change", () => {
        if (select.value === "all") {
            showProducts(products)
        } else {
            showProducts(filterProducts(products, select.value));
        }
    });

    filter.addEventListener("click", () => {
        container.classList.toggle("sorted")
    })

    function showProducts(products) {
        container.innerHTML = ""

        Object.values(products).map(el => {
            const status = el.prod_status.split(",");
            let div = document.createElement("div")
            div.classList.add("wrap");
            const discount = getDiscount(el.prod_oldprice, el.prod_price);

            div.innerHTML = `
                    <div class="product-card" title="Kliknij">
                        <div class="card-img">
                            <img src="img/model.png" alt="">
                            ${el.prod_oldprice ? ` <div class="card-promotion">-${discount}%</div>` : ''}
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
                container.classList.contains("sorted") ? div.removeEventListener("click", () => {}) : div.classList.toggle("active");
            });
        })
    }

    showProducts(products);
})