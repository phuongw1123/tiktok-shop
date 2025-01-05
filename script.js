let cart = []; // Mảng chứa các sản phẩm trong giỏ hàng
let customerInfo = {}; // Thông tin khách hàng
let isLoggedIn = false; // Biến kiểm tra trạng thái đăng nhập

// Cập nhật giá và hình ảnh sản phẩm khi chọn
function updatePriceAndImage() {
    const productSelect = document.getElementById("product-list");
    const productPrice = productSelect.value;
    const productImage = productSelect.options[productSelect.selectedIndex].getAttribute("data-img");

    // Cập nhật giá
    document.getElementById("product-price").textContent = `Giá: ${new Intl.NumberFormat().format(productPrice)}đ`;

    // Cập nhật hình ảnh sản phẩm
    const productImageElement = document.getElementById("product-image");
    if (productImage) {
        productImageElement.src = productImage;
        productImageElement.style.display = 'block';
    } else {
        productImageElement.style.display = 'none';
    }
}

// Thêm sản phẩm vào giỏ hàng
function addToCart() {
    if (!isLoggedIn) {
        alert("Vui lòng đăng nhập trước.");
        return;
    }

    const productSelect = document.getElementById("product-list");
    const selectedProduct = productSelect.value;
    const selectedProductName = productSelect.options[productSelect.selectedIndex].text;
    const selectedProductImage = productSelect.options[productSelect.selectedIndex].getAttribute("data-img");

    if (selectedProduct != 0) {
        // Thêm sản phẩm vào giỏ
        cart.push({ name: selectedProductName, price: selectedProduct, image: selectedProductImage });
        updateCartDisplay();
        updateTotalAmount();
    }
}

// Hiển thị sản phẩm trong giỏ hàng
function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = ""; // Clear current list

    cart.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 50px; height: auto; margin-right: 10px;">
            ${product.name} - ${new Intl.NumberFormat().format(product.price)}đ 
            <button onclick="removeFromCart(${index})">Xóa</button>
        `;
        cartItemsList.appendChild(listItem);
    });
}

// Cập nhật tổng tiền
function updateTotalAmount() {
    const totalAmount = cart.reduce((acc, curr) => acc + parseInt(curr.price), 0);
    document.getElementById("total-amount").textContent = `Tổng tiền: ${new Intl.NumberFormat().format(totalAmount)}đ`;
}

// Xóa một sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1); // Xóa sản phẩm tại vị trí index
    updateCartDisplay(); // Cập nhật lại giỏ hàng
    updateTotalAmount(); // Cập nhật lại tổng tiền
}

// Xóa tất cả sản phẩm trong giỏ hàng
function clearCart() {
    cart = [];
    updateCartDisplay();
    updateTotalAmount();
}

// Lưu thông tin khách hàng
function saveCustomerInfo() {
    customerInfo.name = document.getElementById("customer-name").value;
    customerInfo.address = document.getElementById("customer-address").value;
    customerInfo.phone = document.getElementById("customer-phone").value;

    // Hiển thị thông tin khách hàng trong phần người bán
    document.getElementById("order-name").textContent = customerInfo.name;
    document.getElementById("order-address").textContent = customerInfo.address;
    document.getElementById("order-phone").textContent = customerInfo.phone;

    // Hiển thị thông báo trên hệ thống
    document.getElementById("system-message").textContent = "Thông tin khách hàng đã được lưu.";
}

// Tiến hành thanh toán
function proceedToPayment() {
    const totalAmount = cart.reduce((acc, curr) => acc + parseInt(curr.price), 0);
    document.getElementById("order-total").textContent = `${new Intl.NumberFormat().format(totalAmount)}đ`;

    // Hiển thị sản phẩm đã chọn trong phần người bán
    const productNames = cart.map(product => `${product.name} - ${new Intl.NumberFormat().format(product.price)}đ`);
    document.getElementById("order-product").textContent = productNames.join(", ");

    // Hiển thị thông báo trên hệ thống
    document.getElementById("system-message").textContent = "Đơn hàng đang được xử lý. Vui lòng đợi!";
}

// Xác nhận đơn hàng
function acceptOrder() {
    document.getElementById("system-message").textContent = "Đơn hàng đã được chấp nhận!";
}

// Từ chối đơn hàng
function rejectOrder() {
    document.getElementById("system-message").textContent = "Đơn hàng đã bị từ chối!";
}

// Đánh dấu đã giao hàng
function markAsDelivered() {
    // Cập nhật trạng thái trên hệ thống
    document.getElementById("system-message").textContent = "Đã giao hàng";

    // Hiển thị nút "Đã nhận hàng" cho người mua
    document.getElementById("received-btn").style.display = "inline-block";
}

// Người mua nhận hàng
function markAsReceived() {
    // Hiển thị thông báo trên hệ thống
    document.getElementById("system-message").textContent = "Người mua đã nhận hàng";

    // Ẩn nút "Đã nhận hàng" của người mua
    document.getElementById("received-btn").style.display = "none";

    // Cập nhật thông tin cho người bán
    document.getElementById("order-info").innerHTML += "<p><strong>Trạng thái:</strong> Đã nhận hàng</p>";

    // Cập nhật trạng thái đã nhận trên hệ thống
    alert("Người mua đã nhận hàng và hoàn thành đơn hàng!");
}

// Hàm hiển thị tab
function showTab(tabId) {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!isLoggedIn) {
        alert("Vui lòng đăng nhập trước.");
        return;
    }

    // Hide all tab contents
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    // Show the selected tab
    document.getElementById(tabId).style.display = 'block';
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Login successful
        isLoggedIn = true;

        // Ẩn form đăng nhập và hiển thị phần quy trình
        document.getElementById('login-register').style.display = 'none';
        document.getElementById('process-flow').style.display = 'block';

        // Hiển thị tab "Người mua"
        showTab('buyer');
    } else {
        alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
    }
}

// Function to handle registration
function handleRegister(event) {
    event.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-register').style.display = 'none';
    document.getElementById('process-flow').style.display = 'block';
}
// Function to handle registration
function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        // Đăng ký thành công, chuyển đến màn hình quy trình
        isLoggedIn = true; // Giả sử đăng ký thành công, người dùng đã đăng nhập

        // Ẩn form đăng ký và đăng nhập, hiển thị phần quy trình
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-register').style.display = 'none';
        document.getElementById('process-flow').style.display = 'block';

        // Hiển thị tab "Người mua"
        showTab('buyer');
    } else {
        alert('Vui lòng nhập đầy đủ thông tin đăng ký.');
    }
}

