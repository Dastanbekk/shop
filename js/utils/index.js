let BASE_URL = "https://676afc4abc36a202bb83d19d.mockapi.io/api/v20";

// Fetch funksiyasi
const useFetch = () => {
  const response = ({ url, method = "GET", data }) => {
    return fetch(`${BASE_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((data) => data.json())
      .catch((error) => console.log(error));
  };
  return response;
};

// Like ma'lumotlarini localStorage orqali boshqarish
let likes = JSON.parse(localStorage.getItem("likes")) || [];

// UI yaratish funksiyasi
function addUIData(value, carts) {
  let card = document.createElement("div");

  // Mahsulot like qilinganligini tekshirish
  const isLiked = likes.some((item) => item.id === value.id);

  // Kartaning HTML kodlari
  card.innerHTML = `
      <div>
            <img
              class="w-full"
              src=${value.img}
              alt=""
            />
          </div>
          <div>
            <h2 class="text-[14px]">${value.title.slice(0, 60) + "..."}</h2>
            <p><i class="bx bxs-star text-[gold]"></i>${value.rate}</p>
            <h3>${value.month
              .toLocaleString("uz-UZ")
              .replace(/,/g, " ")} so'm/oyiga</h3>
            <div class="flex items-center justify-between">
              <h2>${value.price
                .toLocaleString("uz-UZ")
                .replace(/,/g, " ")} so'm</h2>
             <!-- Savat tugmasi -->
             <button class="btn_shop"><i class="bx bx-shopping-bag text-2xl"></i></button>
             <!-- Like tugmasi -->
             <button class="btn_like" data-id="${value.id}">
                <i class="bx bx-heart text-2xl" style="color: ${
                  isLiked ? "red" : "black"
                }"></i>
             </button>
            </div>
          </div>
      `;
  carts.append(card);

  // Like tugmasi bosilganda
  let likeBtn = card.querySelector(".btn_like");
  likeBtn.addEventListener("click", () => toggleLike(value, likeBtn));
}

// Like funksiyasi
function toggleLike(data, btn) {
  const isLiked = likes.some((item) => item.id === data.id);

  if (isLiked) {
    // Like'dan o'chirish
    likes = likes.filter((item) => item.id !== data.id);
    alert("Mahsulot like'dan o'chirildi!");
  } else {
    // Like'ga qo'shish
    likes.push(data);
    alert("Mahsulot like qilindi!");
  }

  // LocalStorage yangilash
  localStorage.setItem("likes", JSON.stringify(likes));

  // Tugma rangini o'zgartirish
  const icon = btn.querySelector("i");
  icon.style.color = isLiked ? "black" : "red";
}

export { useFetch, addUIData };
