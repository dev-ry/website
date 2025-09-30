document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".header-menu");
  const body = document.body;

  hamburger.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");

    // Toggle body scroll lock when menu is open
    if (isOpen) {
      body.style.overflow = "hidden";
      // Save current scroll position
      body.style.position = "fixed";
      body.style.top = `-${window.scrollY}px`;
      body.style.width = "100%";
    } else {
      // Restore scroll position
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  });
});

// Video controls functionality
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("terminalVideo");
  const controls = document.querySelector(".video-controls");
  const btn = document.getElementById("playPauseBtn");
  const wrapper = video?.closest(".tv-video");

  if (video && controls && btn && wrapper) {
    // ▶︎ click: hide controls & play (with sound)
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      controls.classList.add("controls--hidden");
      video.muted = false; // Enable sound
      video.play();
    });

    // wrapper click: if playing, pause & show ▶︎
    wrapper.addEventListener("click", () => {
      if (!video.paused) {
        video.pause();
        controls.classList.remove("controls--hidden");
        btn.textContent = "PLAY ▶︎";
      }
    });

    // Reset button to ▶︎ when video ends
    video.addEventListener("ended", () => {
      controls.classList.remove("controls--hidden");
      btn.textContent = "PLAY ▶︎";
    });
  }
});
