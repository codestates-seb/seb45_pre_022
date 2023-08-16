import { styled } from 'styled-components';

export const FormLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  margin: 2px 0px;
  padding: 0px 2px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px 9px;
  font-size: 13px;
  border: 1px solid #babfc4;
  border-radius: 5px;
`;

const Form = ({ label, size, onChange }) => {
  let lower = label.toLowerCase();

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <FormInput type={lower} size={size} onChange={onChange}></FormInput>
    </div>
  );
};

export default Form;
