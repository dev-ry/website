const shareBtn = document.getElementById("openShare");
const modal = document.getElementById("shareModal");
const closeBtn = modal.querySelector(".share-modal__close");
const fbLink = document.getElementById("shareFacebook");
const twLink = document.getElementById("shareTwitter");
const liLink = document.getElementById("shareLinkedIn");

shareBtn.addEventListener("click", () => {
  const pageUrl = window.location.href;
  fbLink.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  twLink.href = `https://twitter.com/intent/tweet?url=${pageUrl}`;
  liLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
  modal.classList.add("is-open");
});

closeBtn.addEventListener("click", () => modal.classList.remove("is-open"));
modal
  .querySelector(".share-modal__backdrop")
  .addEventListener("click", () => modal.classList.remove("is-open"));
