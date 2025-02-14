const music = document.getElementById('bgMusic');
        const startButton = document.querySelector('.start-button');
        let swiper;

        startButton.addEventListener('click', () => {
            music.play();
            startButton.style.display = 'none';
            showNext('card1');
        });

        function showNext(elementId) {
            // Ocultar todas las tarjetas
            document.querySelectorAll('.card, .swiper').forEach(el => {
                el.style.display = 'none';
            });
            
            if (elementId === 'carousel') {
                document.querySelector('.swiper').style.display = 'block';
                initSwiper();
            } else {
                const card = document.getElementById(elementId);
                card.style.display = 'block';
                // Forzar un reflow
                card.offsetHeight;
                card.classList.add('active');
            }
        }

        function initSwiper() {
            swiper = new Swiper('.swiper', {
                effect: 'cards',
                grabCursor: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                on: {
                    slideChange: function() {
                        updatePhotoCounter();
                    },
                    reachEnd: function() {
                        setTimeout(() => {
                            const nextButton = document.createElement('button');
                            nextButton.className = 'nav-button';
                            nextButton.textContent = 'Ver mensaje final 💌';
                            nextButton.onclick = () => showNext('finalCard');
                            nextButton.style.position = 'absolute';
                            nextButton.style.bottom = '20px';
                            nextButton.style.left = '50%';
                            nextButton.style.transform = 'translateX(-50%)';
                            document.querySelector('.swiper').appendChild(nextButton);
                        }, 500);
                    }
                }
            });
            updatePhotoCounter();
        }

        function updatePhotoCounter() {
            const counter = document.querySelector('.photo-counter');
            if (swiper) {
                counter.textContent = `${swiper.activeIndex + 1}/7`;
            }
        }