// Las constantes que llevan $ son elementos del DOM que se encuentran en el HTML y que se utilizan en el JS
const $products = document.getElementById("products");
const $cardTemplate = document.getElementById("cardTemplate").content;
const $cartTemplate = document.getElementById("cartTemplate").content;
const $footerTemplate = document.getElementById("footerTemplate").content;
const $cartBody = document.getElementById("cartBody");
const $cardFooter = document.getElementById("cardFooter");
const $fragment = document.createDocumentFragment();
const $buscador = document.getElementById("buscador");
const $anterior = document.getElementById("anterior");
const $siguiente = document.getElementById("siguiente");
const $energetica = document.getElementById("energetica");
const $pisco = document.getElementById("pisco");
const $ron = document.getElementById("ron");
const $bebida = document.getElementById("bebida");
const $snack = document.getElementById("snack");
const $cerveza = document.getElementById("cerveza");
const $vodka = document.getElementById("vodka");
const $titulo = document.getElementById("titulo");
const $badgeCart = document.getElementById("badgeCart");

let catalogo = [];
let flag = false;
let page = 0;
let cart = [];

window.onload = function () {
  fetchData(page);
};


const filterItems = (ev) => {
  let spin = true; // Variable boolean para mostrar ion-spinner
  let timeLeft = 1; // Variable number del temporizador, se renueva cada vez que se ejectuta el metodo (al teclear sobre el campo)
  if (!flag) {
    flag = true; // variable boolean para generar un solo intervalo
    interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        spin = false;
        flag = false;
        fetchDataBySearching(ev.target.value, page);
        console.log("Metodo a ejecutar " + ev); // Fracción de código a ejecutar
      }
    }, 500); // Tiempo en ms en que se ejecutará la fracción de código dentro el intervalo cuando dejamos de teclear
  }
};

const showProducts = (data) => {
  $products.innerHTML = "";

  data.rows.map((product) => {
    if (product.url_image === "" || product.url_image === null) {
      product.url_image =
        "https://plantillasdememes.com/img/plantillas/imagen-no-disponible01601774755.jpg";
    }
    $cardTemplate.querySelector("h2").textContent = product.id;
    $cardTemplate.querySelector("h5").textContent = product.name;
    $cardTemplate.querySelector("span").textContent = product.price;
    $cardTemplate.querySelector("img").setAttribute("src", product.url_image);
    $cardTemplate.querySelector("h3").textContent = product.category;
    const clone = $cardTemplate.cloneNode(true);
    $fragment.appendChild(clone);
  });
  $products.appendChild($fragment);
};

const fetchData = async (page = { page }) => {
  try {
    // const response = await fetch('https://servidorcatalogobsal3.herokuapp.com/products');
    const response = await fetch(`http://localhost:3500/products?page=${page}`);
    const data = await response.json();
    catalogo = data;
    showProducts(catalogo);
    // console.log(catalogo);
  } catch (error) {
    console.log(error);
  }
};

const fetchDataBySearching = async (name, page = { page }) => {
  try {
    const response = await fetch(
      `http://localhost:3500/productsBySearchBar?page=${page}&name=${name}`
    );
    const data = await response.json();
    catalogo = data;
    console.log(catalogo);
    showProducts(catalogo);
  } catch (error) {
    console.log(error);
  }
};
const fetchDataByCategory = async (category, page = { page }) => {
  try {
    const response = await fetch(
      `http://localhost:3500/productsByCategory?page=${page}&category=${category}`
    );
    const data = await response.json();
    catalogo = data;
    console.log(catalogo);
    showProducts(catalogo);
  } catch (error) {
    console.log(error);
  }
};

const showCart = () => {
  $cartBody.innerHTML = "";
  cart.map((product) => {
    $cartTemplate.querySelector("th").textContent = product.id;
    $cartTemplate.querySelectorAll("td")[0].textContent = product.name;
    $cartTemplate.querySelectorAll("td")[1].textContent = product.quantity;
    $cartTemplate.querySelector("span").textContent =
      product.quantity * product.price;
    $cartTemplate.querySelector(".btn-info").dataset.id = product.id;
    $cartTemplate.querySelector(".btn-danger").dataset.id = product.id;

    const clone = $cartTemplate.cloneNode(true);
    $fragment.appendChild(clone);
  });
  $cartBody.appendChild($fragment);
  showFooter();
};

const showFooter = () => {
  $cardFooter.innerHTML = "";
  $badgeCart.textContent = "";
  if (cart.length === 0) {
    $cardFooter.innerHTML = `<th scope="row" colspan="5">Añade productos a tu carro!</th>`;
    return;
  }
  const nQuantity = cart.reduce(
    (acumulador, el) => acumulador + el.quantity,
    0
  );
  const nPrice = cart.reduce(
    (acumulador, el) => acumulador + el.quantity * el.price,
    0
  );
  $badgeCart.textContent = nQuantity;
  $footerTemplate.querySelector("td").textContent = nQuantity;
  $footerTemplate.querySelector("span").textContent = nPrice;

  const clone = $footerTemplate.cloneNode(true);
  $fragment.appendChild(clone);
  $cardFooter.appendChild($fragment);
  const $cleanCart = document.getElementById("cleanCart");
  $cleanCart.addEventListener("click", () => {
    cart = [];
    showCart();
  });
  // const $cart = document.getElementById("cart");
  // $badgeCart.addEventListener("change", () => {
  //   if ($badgeCart.textContent !== 0) {
  //     $cart.className += 'cart'
  //   } 
  // });
};

const addToCart = (e) => {
  if (e.target.classList.contains("addButton")) {
    setCart(e.target.parentElement);
  }
  e.stopPropagation(); // Evita que se propague el evento al padre
};

const setCart = (obj) => {
  const product = {
    id: parseInt(obj.querySelector("h2").textContent),
    name: obj.querySelector("h5").textContent,
    price: obj.querySelector("span").textContent,
    quantity: 1,
  };
  if (cart.hasOwnProperty(product.id)) {
    product.quantity = cart[product.id].quantity + 1;
  }
  cart[product.id] = { ...product };
  showCart();
};

const btnActions = (e) => {
  if (e.target.classList.contains("btn-info")) {
    const product = cart[e.target.dataset.id];
    product.quantity++;
    cart[e.target.dataset.id] = { ...product };
    showCart();
  } else if (e.target.classList.contains("btn-danger")) {
    const product = cart[e.target.dataset.id];
    product.quantity--; 
    if (product.quantity === 0) { 
      delete cart[e.target.dataset.id];
    
    }
    showCart();
  }
  e.stopPropagation();
};

$cartBody.addEventListener("click", e => {
  btnActions(e);
});

$buscador.addEventListener("keyup", filterItems);

$energetica.addEventListener("click", () => {
  fetchDataByCategory(1, page);
});
$pisco.addEventListener("click", () => {
  fetchDataByCategory(2, page);
});
$ron.addEventListener("click", () => {
  fetchDataByCategory(3, page);
});
$bebida.addEventListener("click", () => {
  fetchDataByCategory(4, page);
});
$snack.addEventListener("click", () => {
  fetchDataByCategory(5, page);
});
$cerveza.addEventListener("click", () => {
  fetchDataByCategory(6, page);
});
$vodka.addEventListener("click", () => {
  fetchDataByCategory(7, page);
});

$siguiente.addEventListener("click", () => {
  page++;
  fetchData(page);
});

$anterior.addEventListener("click", () => {
  if (page !== 0) {
    page--;
    fetchData(page);
  }
});

$titulo.addEventListener("click", () => {
  page = 0;
  fetchData(page);
});

$products.addEventListener("click", (e) => {
  addToCart(e);
});
