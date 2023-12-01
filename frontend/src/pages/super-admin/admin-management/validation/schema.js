import * as yup from 'yup'

const validationSchemaUser = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  address: yup.string().required(),
  number_phone: yup.string().required(),
  phone_country_code: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8),
})

export { validationSchemaUser }
