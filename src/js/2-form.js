const refs = {
  form: document.querySelector('.js-feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

// Оновлюємо з лс
const fillFormFromLS = form => {
  const dataFromFormLs = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (dataFromFormLs === null) {
    return;
  } else {
    const dataFromFormLsKeys = Object.keys(dataFromFormLs);

    dataFromFormLsKeys.forEach(key => {
      form.elements[key].value = dataFromFormLs[key];
      formData[key] = dataFromFormLs[key];
    });
  }
};

fillFormFromLS(refs.form);

// Додаємо до лс
const onFormInput = event => {
  const formField = event.target;
  const formFieldValue = formField.value.trim();

  formData[formField.name] = formFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

refs.form.addEventListener('input', onFormInput);

// Валідація форми
const onFormBtnSubmit = event => {
  event.preventDefault();

  const hasEmptyValues = Object.values(formData).some(value => value === '');
  if (hasEmptyValues) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  refs.form.reset();
};
refs.form.addEventListener('submit', onFormBtnSubmit);
