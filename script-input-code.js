//собития кастомного инпута кода по смс
const $inputElements = $('.js-input-code-item');
const codeBackspace = 8;
const $inputResult = $('.js-input-code');
const $inputError = $('.js-error-field');
const $errorWrapper = $('.js-error-wrapper');
const testInputCode ='1234';

$inputElements.each((index, element) => {
    $(element).on('paste', (event) => {
        event.preventDefault();
        const pasteValue = event.originalEvent.clipboardData.getData('text');
        const pasteValueArray = pasteValue.split('');
        pasteValueArray.forEach((item, index) => {
            if ($inputElements[index]) {
                $($inputElements[index]).val(item);
            }
        });
    });
    $(element).on('input', (event) => {

        const valuesEventTarget = String($(event.target).val()).split('');

        if (valuesEventTarget[0]) {
            $(event.target).val(valuesEventTarget[0]);
        } else {
            $(event.target).val('');
        }

        if((index !== $inputElements.length - 1) && typeof valuesEventTarget[0] !== 'undefined') {
            $inputElements[index+1].focus();
            const nextInput =  $inputElements[index+1];
            $(nextInput).val('');
            $inputElements[index+1].dispatchEvent(new Event('input'));
        }
    });
    $(element).on('keydown', (event) => {
        if (event.keyCode === codeBackspace ) {

            $(event.target).val('');
            $inputElements[Math.max(0, index - 1)].focus();
        }
    });
    $(element).on('focus', () => {
        clearError();
    })
});

$('.js-submit-button').on('click', (event) => {
    event.preventDefault();
    const values = [];
    $inputElements.each((index, item) => {
        values.push($(item).val().toString());
    });
    $inputResult.val(values.join(''));
    if ($inputResult.val() !== testInputCode) {
        shwError($inputResult.val());
    } else {
        alert('Успешно');
    }
});

const shwError = (value) => {
    $errorWrapper.addClass('error');
    if (value.length === 0) {
        $inputError.text('Поле обязательно для запонения');
    } else {
        $inputError.text('Введен не верный код');
    }
}

const clearError = () => {
    $errorWrapper.removeClass('error');
    $inputError.text();
}

$('.js-popup-close').on('click', () => {
    clearError();
    $inputElements.val('');
});