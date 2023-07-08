window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import "@fortawesome/fontawesome-free/js/all.min";
const Swal = require('sweetalert2');

// الرسالة المنبثقة من عربة الشراء
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = tooltipTriggerList.forEach(el => {
  new bootstrap.Tooltip(el);
});

// الرسالة بعد الضغط علي زر اضافة للعربة
document.querySelectorAll(".add-cart-btn").forEach(el => {
  el.addEventListener("click", function () {
    Swal.fire("تمت الإضافة بنجاح 🧡");
  });
});

// التحقق من صحة البريد الالكترونى
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

// لاضافة السنة في الحقوق محفوظة
document.getElementById("fullYear").innerHTML = new Date().getFullYear();

// حساب اجمالي عربة الشراء
function calculateTotalOrder() {
  let totalPriceForAll = 0
  document.querySelectorAll('[data-product-info]').forEach(product => {
    const quantity = product.querySelector('[data-product-quantity]').value;
    const price = product.getAttribute('data-product-price');
    const total = quantity * price;
    totalPriceForAll += total;
  })
  document.getElementById('total-productions-price').innerHTML = totalPriceForAll + "$"
}

// حساب السعر الاجمالي للمنتجات
document.querySelectorAll('[data-product-quantity]').forEach(item => {
  item.addEventListener('change', () => {
    const newQuantity = item.value;
    const parent = item.closest('[data-product-info]');
    const price = parent.getAttribute('data-product-price');
    const totalPriceForProduct = newQuantity * price;
    parent.querySelector(".total-price-for-product").innerHTML = totalPriceForProduct + "$";

    calculateTotalOrder()

  })
})

// زر حذف المنتجات
document.querySelectorAll('[data-remove-btn]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('[data-product-info]').remove()
    // تحديث حساب اجمالي عربة الشراء
    calculateTotalOrder()
  })
})

// تغير تنسيق المقاسات والاحجام
let sizeOption = document.querySelectorAll(".size-option");
let sizeRadios = document.querySelectorAll(".size-option input[type='radio']");
sizeRadios.forEach(item => {
  item.addEventListener("click", () => {
    sizeOption.forEach(i => {
      i.classList.remove("active");
    })
    item.parentNode.parentNode.classList.add("active")
  })
})

let colorOption = document.querySelectorAll(".color-option");
let colorRadios = document.querySelectorAll(".color-option input[type='radio']");
colorRadios.forEach(item => {
  item.addEventListener("click", () => {
    colorOption.forEach(i => {
      i.classList.remove("active");
    })
    item.parentNode.parentNode.classList.add("active")
  })
})
