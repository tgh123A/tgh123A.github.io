document.querySelectorAll('.flip-card').forEach(function(card) {
    card.addEventListener('click', function() {
        this.querySelector('.flip-card-inner').classList.toggle('flipped');
    });
});
