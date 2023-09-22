export const handleValidation = (formData, setErrorMessage) => {
  const errors = {};

  if (!formData.user.firstName) {
    errors.firstName = 'First name is required';
  }
  if (!formData.user.lastName) {
    errors.lastName = 'Last name is required';
  }
  if (!formData.user.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.user.email)) {
    errors.email = 'Email address is invalid';
  } 
  if (!formData.user.phone) {
    errors.phone = 'Phone number is required';
  } else if (formData.user.phone.length !== 10) {
    errors.phone = 'Phone number should be 10 digits';
  } else if (!/^[0-9]+$/.test(formData.user.phone)) {
    errors.phone = 'Phone number should be numeric characters';
  } else if (formData.user.phone.charAt(0) === '+') {
    errors.phone = 'Phone number should not start with +';
  }

  if (!formData.client.organizationName) {
    errors.organizationName = 'Organization name is required';
  }
  if (!formData.client.industry) {
    errors.industry = 'Industry is required';
  }
  if (!formData.user.password) {
    errors.password = 'Password is required';
  } else if (formData.user.password.length < 6) {
    errors.password = 'Password must be 6 or more characters';
  } else if (!/\d/.test(formData.user.password)) {
    errors.password = 'Password must contain at least one number';
  } else if (!/[!@#$%^&*]/.test(formData.user.password)) {
    errors.password = 'Password must contain at least one special character';
  } else if (!/[a-z]/.test(formData.user.password)) {
    errors.password = 'Password must contain at least one lowercase letter';
  } else if (!/[A-Z]/.test(formData.user.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  }

  if (!formData.user.passwordrewrite) {
    errors.passwordrewrite = 'Password rewrite is required';
  } else if (formData.user.passwordrewrite !== formData.user.password) {
    errors.passwordrewrite = 'Password rewrite does not match';
  }

  if (!formData.user.country) {
    errors.country = 'Country is required';
  }

  setErrorMessage(errors);
  return Object.keys(errors).length === 0;
};
