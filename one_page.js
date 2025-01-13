const container = document.querySelector('.header');
const spheres = document.querySelectorAll('.movie');

// Устанавливаем начальные координаты и направление для каждой сферы
spheres.forEach(sphere => {
    sphere.x = Math.random() * (container.clientWidth - 50);
    sphere.y = Math.random() * (container.clientHeight - 50);
    sphere.dx = (Math.random() * 2 - 1)*2; // Случайное изменение по X
    sphere.dy = (Math.random() * 2 - 1)*2; // Случайное изменение по Y
    sphere.style.left = `${sphere.x}px`;
    sphere.style.top = `${sphere.y}px`;
});

// Функция для проверки столкновений
function checkCollision(sphere1, sphere2) {
    const dx = sphere1.x - sphere2.x;
    const dy = sphere1.y - sphere2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = 200; // Минимальное расстояние между сферами

    if (distance < minDistance) {
        // Отталкивание в разные стороны
        sphere1.dx = -sphere1.dx;
        sphere1.dy = -sphere1.dy;
        sphere2.dx = -sphere2.dx;
        sphere2.dy = -sphere2.dy;
    }
}

// Функция для анимации
function animateSpheres() {
    spheres.forEach(sphere => {
        sphere.x += sphere.dx;
        sphere.y += sphere.dy;

        // Проверяем границы контейнера
        if (sphere.x < 0 || sphere.x > container.clientWidth - 50) {
            sphere.dx = -sphere.dx; // Отражаем по оси X
        }
        if (sphere.y < 0 || sphere.y > container.clientHeight - 50) {
            sphere.dy = -sphere.dy; // Отражаем по оси Y
        }

        sphere.style.left = `${sphere.x}px`;
        sphere.style.top = `${sphere.y}px`;
    });

    // Проверяем столкновения между сферами
    for (let i = 0; i < spheres.length; i++) {
        for (let j = i + 1; j < spheres.length; j++) {
            checkCollision(spheres[i], spheres[j]);
        }
    }

    requestAnimationFrame(animateSpheres); // Продолжаем анимацию
}

// Начинаем анимацию
animateSpheres();

const scrollPhoto = document.querySelector('.photo');
let currentIndex = 0;
let isScrolling = false; // флаг, показывающий, происходит ли скроллинг

function handleScroll(event) {
    if (isScrolling) return; // Если идёт скроллинг, игнорируем событие

    if (event.deltaY > 0) {
        // Прокрутка вниз
        if (currentIndex < scrollPhoto.children.length - 1) {
            isScrolling = true; // Устанавливаем флаг

            currentIndex++;
            scrollPhoto.style.transform = `translateX(-${currentIndex * 10}vw)`;
            setTimeout(() => {
                isScrolling = false; // Сбрасываем флаг через 500ms
            }, 500); // Длительность анимации
        }
    } else {
        // Прокрутка вверх
        if (currentIndex > 0) {
            isScrolling = true; // Устанавливаем флаг

            currentIndex--;
            scrollPhoto.style.transform = `translateX(-${currentIndex * 10}vw)`;
            setTimeout(() => {
                isScrolling = false; // Сбрасываем флаг через 500ms
            }, 500); // Длительность анимации
        }
    }
}

// Добавляем обработчик события прокрутки
window.addEventListener('wheel', handleScroll);


