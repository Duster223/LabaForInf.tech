// Находим элементы на странице
const colorBlock = document.getElementById('colorBlock');
const colorBtn = document.getElementById('colorBtn');

// Обработчик клика по кнопке
colorBtn.addEventListener('click', function () {
    // Меняем цвет фона на синий
    colorBlock.style.backgroundColor = 'blue';
    // Меняем цвет текста на белый
    colorBlock.style.color = 'white';
});