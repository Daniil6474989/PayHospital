


document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) {
        other.classList.remove('active');
        }
      });
    item.classList.toggle('active');
  });
});

//slider


    const slider = document.getElementById('slider-process');
    const cards = document.querySelectorAll('.step-card');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    let isDragging = false;
    let startX;
    let scrollLeft;

    //активный слайд — первый
    let currentIndex = 0;
    updateActiveCard();

    // Перемещение по кнопкам
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        scrollToCard(currentIndex);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        scrollToCard(currentIndex);
      }
    });

    // Прокрутка к нужной карточке
    function scrollToCard(index) {
      const cardWidth = cards[0].offsetWidth + 20; // 20 — gap
      slider.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      updateActiveCard();
    }

    // Обновление активной карточки
    function updateActiveCard() {
      cards.forEach((card, i) => {
        card.classList.toggle('active', i === currentIndex);
      });
    }

    // Drag & Drop
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.classList.add('dragging');
    });

    slider.addEventListener('mouseleave', () => {
      isDragging = false;
      slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', () => {
      isDragging = false;
      slider.classList.remove('dragging');

      const cardWidth = cards[0].offsetWidth + 20;
      const currentScroll = slider.scrollLeft;
      const closestIndex = Math.round(currentScroll / cardWidth);
      currentIndex = Math.min(Math.max(closestIndex, 0), cards.length - 1);
      scrollToCard(currentIndex);
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // скорость 
      slider.scrollLeft = scrollLeft - walk;
    });


    slider.addEventListener('scroll', () => {
      const cardWidth = cards[0].offsetWidth + 20;
      const scrollPos = slider.scrollLeft + cardWidth / 2;
      const newIndex = Math.floor(scrollPos / cardWidth);
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateActiveCard();
      }
    });

