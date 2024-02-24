import { useState } from 'react';

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');

  // work with state using alternative combined state
  const [enteredValues, setEnteredValues] = useState({
    email: {
      value: '',
      didEdit: false,
    },
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

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted!');

    console.log(enteredValues);
    setEnteredValues({
      email: '',
      password: '',
    });
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
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange('email', event.target.value)}
            value={enteredValues.email}
          />
          <div className='control-error'>
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
