const images = Array.from(document.querySelectorAll(".gallery img"));
let currentIndex = 0;

function openLightbox(img) {
  currentIndex = images.indexOf(img);
  updateLightbox();
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function updateLightbox() {
  document.getElementById("lightbox-img").src = images[currentIndex].src;
}

function navigate(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  updateLightbox();
}

function filterImages(category, btn) {
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".image-card").forEach(card => {
    card.style.display =
      category === "all" || card.classList.contains(category)
        ? "block"
        : "none";
  });
}

document.addEventListener("keydown", e => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox.style.display !== "flex") return;

  if (e.key === "ArrowRight") navigate(1);
  if (e.key === "ArrowLeft") navigate(-1);
  if (e.key === "Escape") closeLightbox();
});