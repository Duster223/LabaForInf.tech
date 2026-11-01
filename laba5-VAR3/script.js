// Находим элементы формы
const form = document.getElementById('feedback-form');
const liveRegion = document.getElementById('live-region');

// Правила валидации для каждого поля
const validators = {
    name: (value) => {
        if (!value.trim()) return 'Пожалуйста, укажите ваше имя.';
        if (value.trim().length < 2) return 'Имя должно содержать не менее 2 символов.';
        return '';
    },
    email: (value) => {
        if (!value.trim()) return 'Пожалуйста, укажите электронную почту.';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(value)) return 'Введите корректный адрес электронной почты.';
        return '';
    },
    topic: (value) => {
        if (!value) return 'Пожалуйста, выберите тему обращения.';
        return '';
    },
    message: (value) => {
        if (!value.trim()) return 'Пожалуйста, введите сообщение.';
        if (value.trim().length < 10) return 'Сообщение должно содержать не менее 10 символов.';
        return '';
    },
    consent: (value, checked) => {
        if (!checked) return 'Необходимо согласие на обработку персональных данных.';
        return '';
    }
};

// Показать ошибку для поля
function showError(fieldName, message) {
    const errorEl = document.getElementById(`${fieldName}-error`);
    if (!errorEl) return;

    if (message) {
        errorEl.textContent = message;
        errorEl.hidden = false;
        const input = document.getElementById(fieldName);
        if (input) input.setAttribute('aria-invalid', 'true');
    } else {
        errorEl.textContent = '';
        errorEl.hidden = true;
        const input = document.getElementById(fieldName);
        if (input) input.removeAttribute('aria-invalid');
    }
}

// Проверка одного поля
function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    if (!input) return true;

    const isCheckbox = input.type === 'checkbox';
    const value = isCheckbox ? '' : input.value;
    const checked = isCheckbox ? input.checked : false;

    const validator = validators[fieldName];
    const error = validator ? validator(value, checked) : '';

    showError(fieldName, error);
    return !error;
}

// Проверка всех полей
function validateForm() {
    const fields = ['name', 'email', 'topic', 'message', 'consent'];
    let isValid = true;
    let firstInvalid = null;

    fields.forEach((field) => {
        const ok = validateField(field);
        if (!ok) {
            isValid = false;
            if (!firstInvalid) firstInvalid = document.getElementById(field);
        }
    });

    return { isValid, firstInvalid };
}

// Валидация при потере фокуса
['name', 'email', 'topic', 'message'].forEach((field) => {
    const input = document.getElementById(field);
    if (input) {
        input.addEventListener('blur', () => validateField(field));
        input.addEventListener('input', () => {
            // Убираем ошибку, как только пользователь начал исправлять
            const errorEl = document.getElementById(`${field}-error`);
            if (errorEl && !errorEl.hidden) validateField(field);
        });
    }
});

// Валидация чекбокса
const consent = document.getElementById('consent');
if (consent) {
    consent.addEventListener('change', () => validateField('consent'));
}

// Отправка формы
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const { isValid, firstInvalid } = validateForm();

    if (!isValid) {
        liveRegion.textContent = 'Форма содержит ошибки. Пожалуйста, проверьте выделенные поля.';
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    // Имитация успешной отправки
    liveRegion.textContent = 'Форма успешно отправлена. Мы свяжемся с вами в ближайшее время.';
    form.reset();

    // Сброс визуальных состояний ошибок
    ['name', 'email', 'topic', 'message', 'consent'].forEach((f) => showError(f, ''));

    // Очистка live-region через 5 секунд
    setTimeout(() => {
        liveRegion.textContent = '';
    }, 5000);
});