import { useState } from 'react';

import Input from './CustomInput';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');

  // work with state using alternative combined state
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    // or We can merge the didBlur or didEdit on email too
    /* email: {
      value: '',
      didEdit: false
    }, */
    password: '',
  });
  // or we can use extra state to manage didBlur
  // here we're keeping track of whether the inputs have been edited which in
  // this case simply means that they lost focus. so the user intracted with them
  // and then they lost focus.
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted!');

    // perform submission validation here ...
    // ...

    console.log(enteredValues);
    /*
    setEnteredValues({
      email: '',
      password: '',
    }); */
  }

  // also needs identifier of the input for which the event occurred when using
  // combined state
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    // using function form so that we don't lose any data
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      // dynamically target a property and set it to true because this
      // handleInputBlur will be fired when an input is blurred which
      // initially is false
      [identifier]: true,
    }));
  }

  /*
  function handleEmailChange(event) {
    setEnteredEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setEnteredPassword(event.target.value);
  }
*/

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          onBlur={() => handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please enter a valid email!'}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
          onBlur={() => handleInputBlur('password')}
          value={enteredValues.password}
          error={passwordIsInvalid && 'Please enter a valid password!'}
        />
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
