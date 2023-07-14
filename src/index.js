window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import "bootstrap/scss/bootstrap.scss";
import "./css/index.css";
import "@fortawesome/fontawesome-free/js/all.min";
const Swal = require('sweetalert2');
import "./sass/styles.scss"

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

// إظهار المدن  بناءا على الدول
const citiesByCountry = {
  eg: ["القاهرة", "الإسكندرية", "سوهاج", "أسوان"],
  sa: ["جدة", "المدينة المنورة"],
  uae: ["أبو ظبي", "دبي"],
  kuw: ["الأندلس", "الصباحية"]
}
document.querySelectorAll('select[name="country"]').forEach(item => {
  item.addEventListener("change", () => {
    const country = item.value;
    const cities = citiesByCountry[country];

    document.querySelectorAll("#payment-cities option").forEach(option => option.remove());

    const firstOption = document.createElement('option');
    const fOptionText = document.createTextNode('أختر مدينة');
    firstOption.appendChild(fOptionText);
    firstOption.setAttribute('value', '');
    firstOption.setAttribute('disabled', 'true');
    firstOption.setAttribute('selected', 'true');

    const citiesOption = document.getElementById('payment-cities');
    citiesOption.appendChild(firstOption);

    cities.forEach(city => {
      const newOption = document.createElement('option');
      const nOptionText = document.createTextNode(city);
      newOption.appendChild(nOptionText);
      newOption.setAttribute('value', city);
      citiesOption.appendChild(newOption)
    })
  })
})

// التبديل بين الدفع بالبطاقة او عند الاستلام
document.querySelectorAll('#form-checkout input[name="payment-method"]').forEach(method => {
  method.addEventListener("change", () => {
    const paymentMethod = method.value;
    const creditCardInputs = document.querySelectorAll('#credit-card-info input');
    if (paymentMethod === 'on-delivery') {
      creditCardInputs.forEach(input => {
        input.style.display = "none"
      })
    } else {
      creditCardInputs.forEach(input => {
        input.style.display = "block"
      })
    }
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
