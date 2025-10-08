const shareBtn = document.getElementById("openShare");
const modal = document.getElementById("shareModal");
const closeBtn = modal.querySelector(".share-modal__close");
const fbLink = document.getElementById("shareFacebook");
const twLink = document.getElementById("shareTwitter");
const liLink = document.getElementById("shareLinkedIn");

shareBtn.addEventListener("click", () => {
  // hardcoded to surveys page for now - TODO: make this dynamic if more shared pages are added
  const pageUrl = "https://prosperxo.com/surveys"; 
  fbLink.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=Shape%20your%20future%2C%20share%20your%20voice%20%E2%80%94%20take%20this%20quick%20survey!`;
  twLink.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=Shape+your+future,+share+your+voice+—+take+this+quick+survey!`;
  liLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
  modal.classList.add("is-open");
});

closeBtn.addEventListener("click", () => modal.classList.remove("is-open"));
modal
  .querySelector(".share-modal__backdrop")
  .addEventListener("click", () => modal.classList.remove("is-open"));
