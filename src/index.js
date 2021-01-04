const getUrlSender = form => {
  let senderPath = '/contact-sender/dist/includes/sender.php';

  let senderAttr = form.getAttribute('data-form-sender') || './';

  if (senderAttr.slice(-1) === '/') senderAttr = senderAttr.slice(0, -1);
  if (senderAttr.slice(-2) === 'cs') senderPath = senderPath.slice(15);
  if (senderAttr.slice(-2) === 'cs') senderAttr = senderAttr.slice(0, -2);
  if (senderPath.slice(15) !== '/contact-sender') senderPath = '..' + senderPath;

  return senderAttr + senderPath;
};

const isValid = field => {
  if (field.checkValidity) return field.checkValidity();

  let isValid = true;
  const { value } = field;
  const type = field.getAttribute('type');
  const isRequired = field.getAttribute('required');

  if (value) isValid = !('email' === type && !/^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i.test(value));

  else if (isRequired) isValid = false;

  field.classList[isValid ? 'remove' : 'add']('is-invalid');

  return isValid;
};

const getFieldsData = fields => {
  let data = [];
  let isValidForm = true;

  fields.forEach(field => {
    if (!isValid(field)) isValidForm = false;

    data.push([
      field.getAttribute('data-form-field') || field.getAttribute('name'),
      field.value
    ]);
  });

  return {
    isValidForm,
    data: JSON.stringify(data),
  };
}

const handleSubmit = async (event, form) => {
  event.preventDefault();

  const senderUrl = getUrlSender(form);

  const fields = form.querySelectorAll('[data-form-field]:not([type="hidden"])');
  const alert = form.querySelector('[data-form-alert]');
  const submit = form.querySelector('[type="submit"]');
  const submitText = submit.innerText;

  form.classList.add('was-validated');

  let { isValidForm, data } = getFieldsData(fields);

  if (!isValidForm) return;

  submit.setAttribute('disabled', 'disabled');
  submit.innerText = 'ENVIANDO...';

  alert.setAttribute('hidden', 'hidden');
  alert.classList.remove(['alert-success', 'alert-danger']);
  fields.forEach(field => field.classList.remove('is-invalid'));

  try {
    await axios
    .post(senderUrl, data)
    .then(({ data: response }) => {
      alert.innerText = response.message;
      alert.classList.add(`alert-${response.class}`);
      alert.removeAttribute('hidden');

      if (response.error) console.error('LTCO Contact Sender:', response.error);
      if (!response.ok) return;

      if (response.ok) fields.forEach(field => field.value = '');
    });
  } catch (error) {
    console.error(error);

    alert.innerText = 'Houve um erro no formulário, por favor, tente novamente mais tarde.';
    alert.classList.add(`alert-danger`);
    alert.removeAttribute('hidden');

    fields.forEach(field => field.value = '');
  } finally {
    form.classList.remove('was-validated');

    submit.removeAttribute('disabled');
    submit.innerText = submitText;
  }

  return;
}

document.querySelectorAll('[data-form-type="ltco_form"]').forEach(form => {
  const submit = form.querySelector('[type="submit"]');

  submit.addEventListener('click', e => handleSubmit(e, form), false);
});
