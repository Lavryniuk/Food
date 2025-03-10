function slider() {

     // Slider

    const leftArrow = document.querySelector(".offer__slider-prev"),
          rightArrow = document.querySelector(".offer__slider-next"),
          slides = document.querySelectorAll(".offer__slide"),
          currentSlide = document.querySelector("#current"),
          totalSlide = document.querySelector("#total"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        totalSlide.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    function updateCounter() {
        currentSlide.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
    };

    updateCounter();

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    rightArrow.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        updateDots();
        updateCounter();
    });

    leftArrow.addEventListener('click', () => {
        if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        updateDots();
        updateCounter();
    });

    // Slider(indicators)

    const slider = document.querySelector('.offer__slider'),
          indicators = document.createElement('div');

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        if (i === 0) {
            dot.style.opacity = '1';
        }

        indicators.append(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            slideIndex = +e.target.getAttribute('data-slide-to');
            offset = (slideIndex - 1) * deleteNotDigits(width);
            slidesField.style.transform = `translateX(-${offset}px)`;

            updateDots();
            updateCounter();
        });
    });
}

module.exports = slider;