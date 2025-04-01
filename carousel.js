        const track = document.querySelector('.carousel-track');
        const imageCards = document.querySelectorAll('.image-card');
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');
        const carouselContainer = document.querySelector('.carousel-container');
        let currentIndex = 0;
        let imageWidth = 0;
        const totalImages = imageCards.length;
        let autoScrollInterval = null;
        const autoScrollDelay = 3000;

        function calculateImageWidth() {
            if (imageCards.length > 0) {
                imageWidth = imageCards[0].offsetWidth + 20; // Width + margin
            }
        }

        function updateButtonVisibility() {
            leftArrow.disabled = currentIndex === 0;
            rightArrow.disabled = currentIndex === totalImages - 1;
            leftArrow.style.opacity = leftArrow.disabled ? 0.3 : 1;
            rightArrow.style.opacity = rightArrow.disabled ? 0.3 : 1;
        }

        function updateCarousel() {
            calculateImageWidth();
            const containerWidth = carouselContainer.offsetWidth;
            const offset = (containerWidth / 2) - (imageWidth / 2) - (currentIndex * imageWidth);
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(${offset}px)`;
            updateButtonVisibility();
        }

        function startAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(() => {
                if (currentIndex < totalImages - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            }, autoScrollDelay);
        }

        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        window.addEventListener('load', () => {
            updateCarousel();
            startAutoScroll();
        });
        window.addEventListener('resize', updateCarousel);

        rightArrow.addEventListener('click', () => {
            stopAutoScroll();
            if (currentIndex < totalImages - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        leftArrow.addEventListener('click', () => {
            stopAutoScroll();
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        let inactivityTimeout = null;
        function resetInactivityTimer() {
            if (inactivityTimeout) clearTimeout(inactivityTimeout);
            inactivityTimeout = setTimeout(startAutoScroll, 5000);
        }

        leftArrow.addEventListener('click', resetInactivityTimer);
        rightArrow.addEventListener('click', resetInactivityTimer);
  