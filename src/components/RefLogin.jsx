import { useRef } from 'react';

export default function Login() {
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted!');

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);

    // resetting those values (email, password) in a clean way using Refs
    // is a bit harder because we're actually discouraged to use Refs for
    // manipulating the DOM
    // so resetting like this would work but actually not recommended or
    // at least something we should use with care!
    // and ofcourse we might end up with quite a lot of refs if we have
    // complex forms and we have to setup and connect all those refs step by step
    // which can be quite some work if we're dealing with multiple input elements.

    // But this is a solution we should use with care because typically we should
    // leave up to React to update the DOM and we should not imperatively perform
    // updates or changes as we're doing it here.
    // It might be just a small update but it is an update to the DOM and
    // therefore not really recommended!
    /*
    email.current.value = '';
    password.current.value = '';
*/

    // Instead here when working with Refs, its typically better to reset the
    // form as we can also do it when using that Form Data approach for extracting
    // the values
    // Calling reset on event target is another way of clearing the form!
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={email} />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' ref={password} />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
