import { FormInput, FormLabel } from '../../Pages/Logins/Login';

const Form = ({ label }) => {
  console.log(label);
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <FormInput type={label.toLowerCase()} size="30"></FormInput>
    </div>
  );
};

export default Form;
