const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const callLinks = document.querySelectorAll('a[href="tel:+18339122378"]');
const copyButtons = document.querySelectorAll("[data-copy-target]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 520);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

callLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.add("is-calling");
    window.setTimeout(() => document.body.classList.remove("is-calling"), 900);
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    const originalText = button.textContent;
    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      button.textContent = "Copied";
      button.classList.add("is-copied");
      window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("is-copied");
      }, 1400);
    } catch {
      button.textContent = "Select text";
      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1400);
    }
  });
});
