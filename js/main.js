import { useFetch, addUIData } from "./utils/index.js";
const carts = document.querySelector(".carts");
let counter = document.querySelector(".counter");
const user = document.getElementById("user")
const request = useFetch();
let cart = JSON.parse(localStorage.getItem("carts")) || [];
let counterLength = JSON.parse(localStorage.getItem("carts"))?.length || 0;

counter.innerHTML = counterLength;
request({ url: "products" }).then((data) => getData(data));
function getData(data) {
  data.forEach((value) => {
    addUIData(value, carts);
  });
  let buttons = document.querySelectorAll(".btn_shop");
  buttons.forEach((value, idx) => {
    value.addEventListener("click", () => {
      addToCart(data[idx]);
    });
  });
}
function addToCart(data) {
  // if()
  if (cart.find((value) => value.id === data.id)) {
    cart = cart.map((value) => {
      if (value.id === data.id) {
        return { ...value, count: (value.count += 1) };
      }
      return value;
    });
    localStorage.setItem("carts", JSON.stringify(cart));
    return;
  }
  cart = [...cart, { ...data, count: 1 },];
  localStorage.setItem("carts", JSON.stringify(cart));
  counterLength = cart.length;
  counter.innerHTML = counterLength;
}



// const productWrap = document.querySelector(".product-wrap")
// const userModal = document.querySelector(".user-modal")

// user.addEventListener("click",()=>{
//   productWrap.style.display = "none"
//   userModal.style.display = "block"
// })


// DOM elementlarni olish
const userIcon = document.querySelector(".user-icon");
const modal = document.querySelector(".modal");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#login-btn");
const errorMsg = document.querySelector("#error-msg");
const userEmailDisplay = document.querySelector(".user-email");

// Foydalanuvchi ma'lumotlari (oldindan saqlangan)
const validUser = {
  email: "user@example.com",
  password: "123456"
};

// Modalni ochish
userIcon.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Modalni yopish
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Kirish tugmasi
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Email va parolni tekshirish
  if (email === validUser.email && password === validUser.password) {
    // Tizimga muvaffaqiyatli kirish
    alert("Tizimga muvaffaqiyatli kirdingiz!");
    userEmailDisplay.textContent = email;
    userEmailDisplay.classList.remove("hidden");
    modal.classList.add("hidden");
  } else if (email === validUser.email && password !== validUser.password) {
    // Parol noto'g'ri
    errorMsg.textContent = "Parol noto'g'ri!";
  } else {
    // Noto'g'ri email yoki parol
    alert("Noto'g'ri ma'lumotlar!");
    modal.classList.add("hidden");
  }
});
