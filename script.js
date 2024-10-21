document.addEventListener('DOMContentLoaded', function () {
    const datepicker = flatpickr("#datepicker", {
        mode: "multiple",  // или "range" для выбора диапазона
        onChange: function(selectedDates) {
            console.log(selectedDates); // Выводим выбранные даты в консоль
        },
        dateFormat: "Y-m-d", // Формат даты
    });
});