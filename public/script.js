const ctaButtons = document.querySelectorAll('[data-cta]');

function trackClick(event) {
  const label = event.currentTarget.getAttribute('data-cta');
  if (!label) return;
  console.log('CTA click:', label);
}

ctaButtons.forEach((button) => button.addEventListener('click', trackClick));
