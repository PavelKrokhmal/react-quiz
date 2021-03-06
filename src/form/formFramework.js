export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false, 
    value: ''
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validate(value, validation = null) {
  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.email) {
    isValid = validateEmail(value)
  }

  if (validation.minLength) {
    isValid = value.trim().length >= validation.minLength && isValid
  } 

  return isValid
}

export function validateForm(formControls) {
  let isFormValid = true
  Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
  })

  return isFormValid
}