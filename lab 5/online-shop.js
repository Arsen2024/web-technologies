// Структури даних
let productCatalog = new Map(); // Для зберігання продуктів
let orderHistory = new Set();  // Для зберігання замовлень
let productHistory = new WeakMap(); // Для зберігання історії змін продуктів
let userOrders = new WeakSet(); // Для відстеження користувачів, які зробили замовлення

// Додавання продукту
document.getElementById("add-product").addEventListener("click", function () {
    let productName = document.getElementById("product-name").value;
    let productPrice = parseFloat(document.getElementById("product-price").value);
    let productQuantity = parseInt(document.getElementById("product-quantity").value);

    let productId = productName.toLowerCase().replace(/\s+/g, '-'); // Простий ID на основі назви

    let product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity
    };

    // Додавання продукту до каталогу
    productCatalog.set(productId, product);

    // Створення історії змін для продукту
    productHistory.set(product, { created: new Date() });

    // Виведення продуктів в каталозі
    displayProducts();
});

// Видалення продукту
function deleteProduct(productId) {
    productCatalog.delete(productId);
    productHistory.delete(productId); // Видалити історію змін продукту
    displayProducts();
}

// Оновлення інформації про продукт
function updateProduct(productId) {
    let product = productCatalog.get(productId);
    if (product) {
        // Вводимо нові ціни та кількість
        let newPrice = parseFloat(prompt("Введіть нову ціну:", product.price));
        let newQuantity = parseInt(prompt("Введіть нову кількість:", product.quantity));

        product.price = newPrice;
        product.quantity = newQuantity;

        // Оновлюємо історію
        productHistory.set(product, { updated: new Date() });

        // Виводимо оновлений список продуктів
        displayProducts();
    } else {
        alert("Продукт не знайдений!");
    }
}

// Пошук продукту за назвою
document.getElementById("search-product").addEventListener("click", function () {
    let searchName = document.getElementById("search-name").value.toLowerCase();
    let found = false;

    productCatalog.forEach((product, id) => {
        if (product.name.toLowerCase().includes(searchName)) {
            found = true;
            alert(`Знайдений продукт: ${product.name}, ціна: ${product.price} грн, кількість: ${product.quantity}`);
        }
    });

    if (!found) {
        alert("Продукт не знайдений!");
    }
});

// Відстеження замовлень
document.getElementById("make-order").addEventListener("click", function () {
    let productName = document.getElementById("order-product-id").value.toLowerCase(); // Назва продукту
    let orderQuantity = parseInt(document.getElementById("order-quantity").value); // Кількість для замовлення

    // Знайдемо продукт по назві
    let foundProduct = null;
    productCatalog.forEach((product, id) => {
        if (product.name.toLowerCase() === productName) {
            foundProduct = product;
        }
    });

    if (foundProduct) {
        // Перевірка на наявність достатньої кількості
        if (foundProduct.quantity >= orderQuantity) {
            foundProduct.quantity -= orderQuantity; // Зменшуємо кількість продукту
            orderHistory.add({ productName, quantity: orderQuantity, date: new Date() }); // Додаємо до історії замовлень
            userOrders.add(foundProduct); // Відстежуємо замовлення
            alert(`Замовлення на ${orderQuantity} одиниць ${foundProduct.name} успішно оформлено!`);
        } else {
            alert("Недостатньо продуктів на складі!");
        }
    } else {
        alert("Продукт не знайдений!");
    }

    displayProducts(); // Оновлення списку продуктів
    displayOrders();   // Оновлення історії замовлень
});

// Виведення всіх продуктів
function displayProducts() {
    let catalogDiv = document.getElementById("product-catalog");
    catalogDiv.innerHTML = "<h2>Продукти в каталозі:</h2>";

    productCatalog.forEach((product, productId) => {
        catalogDiv.innerHTML += `
            <div>
                <p><strong>${product.name}</strong> — ${product.price} грн, ${product.quantity} на складі</p>
                <button onclick="deleteProduct('${productId}')">Видалити</button>
                <button onclick="updateProduct('${productId}')">Оновити</button>
            </div>
        `;
    });
}

// Виведення історії замовлень
function displayOrders() {
    let orderDiv = document.getElementById("order-history");
    orderDiv.innerHTML = "<h2>Історія замовлень:</h2>";

    orderHistory.forEach(order => {
        let capitalizedProductName = order.productName.charAt(0).toUpperCase() + order.productName.slice(1).toLowerCase();
        orderDiv.innerHTML += `<p>Продукт: ${capitalizedProductName}, Кількість: ${order.quantity}, Дата: ${order.date}</p>`;
    });
}

// Додавання продукту для тесту
productCatalog.set("apple", { name: "Яблуко", price: 30, quantity: 100 });
displayProducts();
