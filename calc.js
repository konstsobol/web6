// Цены за каждый тип услуги
const servicePrices = {
    type1: 45,
    type2: 120,
    type3: 100
};

// Дополнительные опции и их влияния на цену для услуги 2
const optionPrices = {
    option_1: 0,
    option_2: 120,
    option_3: 330
};

// Доплата за свойство для услуги 3
const additionPrice = 30;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calc-form');
    const quantityInput = document.getElementById('quantity');
    const productNameInputs = document.querySelectorAll('input[name="productName"]');
    const optionsContainer = document.getElementById('options-container');
    const optionsSelect = document.getElementById('options');
    const AdditionContainer = document.getElementById('addition-container');
    const additionCheckbox = document.getElementById('addition');
    const TotalPrice = document.getElementById('total');

    // Функция пересчета цены
    function Calculator() {
        const quantity = parseInt(quantityInput.value, 10);
        const selectedproductName = document.querySelector('input[name="productName"]:checked').value;
        let basePrice = servicePrices[selectedproductName];
        
        // Если выбрана услуга 2, учитываем опцию
        if (selectedproductName === 'type2') {
            const selectedOption = optionsSelect.value;
            basePrice += optionPrices[selectedOption];
        }
        
        // Если выбрана услуга 3, учитываем свойство
        if (selectedproductName === 'type3' && additionCheckbox.checked) {
            basePrice += additionPrice;
        }

        // Рассчитываем общую стоимость
        const totalPrice = basePrice * quantity;
        if(isNaN(totalPrice)){
            TotalPrice.textContent = '0';
        }
        else if(totalPrice<0){
            TotalPrice.textContent = `ВЫ НЕ МОЖЕТЕ КУПИТЬ ОТРИЦАТЕЛЬНОЕ ЧИСЛО ЧЕГО ЛИБО`;
        }
        else{
            TotalPrice.textContent = totalPrice;
        }
    }

    // Функция для управления отображением опций/свойств в зависимости от типа услуги
    function handleproductNameChange() {
        const selectedproductName = document.querySelector('input[name="productName"]:checked').value;

        // Для Услуги 1: скрыть оба контейнера
        if (selectedproductName === 'type1') {
            optionsContainer.classList.add('hidden');
            AdditionContainer.classList.add('hidden');
        }

        // Для Услуги 2: показать селект с опциями, скрыть чекбокс
        if (selectedproductName === 'type2') {
            optionsContainer.classList.remove('hidden');
            AdditionContainer.classList.add('hidden');
        }

        // Для Услуги 3: показать чекбокс для свойства, скрыть селект
        if (selectedproductName === 'type3') {
            optionsContainer.classList.add('hidden');
            AdditionContainer.classList.remove('hidden');
        }

        Calculator();
    }

    // Обработчики для смены типа услуги
    productNameInputs.forEach(input => {
        input.addEventListener('change', handleproductNameChange);
    });

    // Обработчик для изменения количества
    quantityInput.addEventListener('input', Calculator);

    // Обработчик для изменения опции
    optionsSelect.addEventListener('change', Calculator);

    // Обработчик для изменения свойства
    additionCheckbox.addEventListener('change', Calculator);

    // Начальный расчет и установка правильного отображения при загрузке
    handleproductNameChange();
});