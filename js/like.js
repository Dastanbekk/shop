import { useFetch, addUIData } from "./utils/index.js";

// DOM elementlar
const carts = document.querySelector(".carts");
const likeIcon = document.querySelector(".like-icon");
const likeCounter = document.querySelector(".like-counter");
const likeModal = document.querySelector(".like-modal");
const likedItems = document.querySelector(".liked-items");
const closeModal = document.querySelector(".close-modal");


// Fetch va localStorage
const request = useFetch();
let likes = JSON.parse(localStorage.getItem("likes")) || [];
likeCounter.innerHTML = likes.length;

// Mahsulotlarni olish
request({ url: "products" }).then((data) => getData(data));

function getData(data) {
  data.forEach((value) => {
    addUIData(value, carts);
  });

  let likeButtons = document.querySelectorAll(".btn_like");
  likeButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => toggleLike(data[idx], btn));
  });
}

// Like funksiyasi
function toggleLike(data, btn) {
  const isLiked = likes.some((item) => item.id === data.id);

  if (isLiked) {
    likes = likes.filter((item) => item.id !== data.id);
    alert("Mahsulot like'dan o'chirildi!");
  } else {
    likes.push(data);
    alert("Mahsulot like qilindi!");
  }

  // LocalStorage yangilash
  localStorage.setItem("likes", JSON.stringify(likes));
  likeCounter.innerHTML = likes.length;

  // Tugma rangini o'zgartirish
  const icon = btn.querySelector("i");
  icon.style.color = isLiked ? "black" : "red";
}

// Like oynasini ochish
likeIcon.addEventListener("click", () => {
  likedItems.innerHTML = ""; // Like oynasini tozalash
  likes.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class=' w-full'>
                  <img class="w-[200px]" src="${item.img}" alt="">
      <h3>${item.title}</h3>
      <p>${item.price.toLocaleString("uz-UZ")} so'm</p>
      <button class="remove-like p-3 bg-[crimson] text-white">O'chirish</button>
        </div>
    `;
    likedItems.appendChild(card);

    // Like'dan o'chirish
    card.querySelector(".remove-like").addEventListener("click", () => {
      likes = likes.filter((like) => like.id !== item.id);
      localStorage.setItem("likes", JSON.stringify(likes));
      likeCounter.innerHTML = likes.length;
      card.remove();
    });
  });

  likeModal.classList.remove("hidden");
});

// Like oynasini yopish
closeModal.addEventListener("click", () => {
  likeModal.classList.add("hidden");
});
