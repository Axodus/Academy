(function () {
  "use strict";

  const ctaButtons = document.querySelectorAll("[data-cta]");

  function trackCta(event) {
    const element = event.currentTarget;
    const detail = {
      name: element.getAttribute("data-cta"),
      href: element.getAttribute("href") || ""
    };

    window.dispatchEvent(new CustomEvent("academy:cta", { detail }));

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "academy_cta_click",
        cta_name: detail.name,
        cta_href: detail.href
      });
    }
  }

  ctaButtons.forEach((button) => button.addEventListener("click", trackCta));
})();
