// Flip card interaction for touch devices and keyboard accessibility
document.addEventListener('DOMContentLoaded', function () {
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    // Flip on click (touch/mobile)
    card.addEventListener('click', function (e) {
      // Prevent double flip on keyboard (Enter/Space triggers click)
      if (e.detail === 0) return;
      this.querySelector('.flip-card-inner').classList.toggle('flipped');
    });
    // Flip on Enter/Space (keyboard accessibility)
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.querySelector('.flip-card-inner').classList.toggle('flipped');
      }
    });
    // Remove flip when focus is lost
    card.addEventListener('blur', function () {
      this.querySelector('.flip-card-inner').classList.remove('flipped');
    });
  });
});
