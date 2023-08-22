import { styled } from 'styled-components';
import { FormLink } from '../../Pages/Logins/Login';

const FormLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  margin: 2px 0px;
  padding: 0px 2px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px 9px;
  font-size: 13px;
  border: ${(props) =>
    props.error ? '1px solid #DD4F54' : '1px solid #babfc4'};
  border-radius: 5px;
`;

const ErrorP = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #d0393e;
  margin: 2px 0px;
  padding: 2px;
`;

const Form = ({ label, size, onChange, errorMsg }) => {
  let lower = label.toLowerCase();

  return (
    <div>
      {label === 'Password' && size === '25' ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormLabel>{label}</FormLabel>
          <FormLink>Forgot password?</FormLink>
        </div>
      ) : (
        <FormLabel>{label}</FormLabel>
      )}
      <div style={{ position: 'relative' }}>
        <FormInput
          type={lower}
          size={size}
          onChange={onChange}
          error={errorMsg}
        ></FormInput>
        {errorMsg ? (
          <svg
            aria-hidden="true"
            className="s-input-icon js-alert-icon svg-icon iconAlertCircle"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="red"
            style={{ position: 'absolute', top: '20%', right: '5%' }}
          >
            <path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8ZM8 4v6h2V4H8Zm0 8v2h2v-2H8Z" />
          </svg>
        ) : null}
      </div>
      {errorMsg ? <ErrorP>{errorMsg}</ErrorP> : null}
    </div>
  );
};

export default Form;
