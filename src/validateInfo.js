export default function validateInfo(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = 'Username required';
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.height) {
    errors.height = 'height required';
  }

  if (!values.weight) {
    errors.weight = 'weight is required';
  }

  if (!values.gpa) {
    errors.gpa = 'gpa is required';
  }

  if (!values.award) {
    errors.award = 'award is required';
  }

  if (!values.contact) {
    errors.contact = 'contact is required';
  }
  return errors;
}
