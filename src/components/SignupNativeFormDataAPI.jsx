export default function Signup() {
  function handleSubmit(event) {
    // make sure automatically generated http request is not being sent
    event.preventDefault();

    // the browser actually helps us with handling the form submission and
    // getting hold of all the entered values.
    // It helps us by allowing us to create a special kind of object based
    // on a special kind of constructor function that's built into the browser,
    // the FormData constructor function.
    // FormData is an object that makes it easy to get hold of the different values
    // entered into a form.
    // all those inputs or other fields we want to extract must have a name prop
    // to get access to that input value
    const fd = new FormData(event.target);

    // multi value input fields like checkbox are lost when using entries() fromEntries.
    // But we can easily get them back by manually extracting and storing them.
    // we use getAll() method if we want to get multiple values from one input field
    // which we need if we have multiple checkboxes with same name and we want to get
    // values of all checkboxes
    const acquisitionChannel = fd.getAll('acquisition');

    // const enteredEmail = fd.get('email');
    // const enteredPassword = fd.get('password');
    // That way we would end up with quite a lot of code here
    // Therefore A common pattern thats often used to quickly get hold of
    // all the entered values and group them together into an object is to use an
    // built in Object class provided by browser and call fromEntries() static
    // method on that class and pass the result of calling the entries() on that
    // form date object to object from entries.
    // Calling entries() on Form Data Object will gives us an array of all the input
    // fields and their values
    // And calling object from entries on that array will simply gives us an object
    // where we've key value pairs for all our input fields!
    const data = Object.fromEntries(fd.entries());
    // we could merge that acquisitionChannel on this data object by adding a new
    // property to it which could be called acquisition or like that
    // acquisitionChannel will be an array of all the values selected by the
    // aquisition input
    data.acquisition = acquisitionChannel;

    console.log(data);

    // In this handleSubmit function, we're getting this event object
    // The target of this event object is the underlying form element
    // And this form element has a reset method which we can call
    // which is same thing when we set a button inside form to type='reset'
    // so calling reset on event target is another way of clearing the form!
    // event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' name='email' required />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            minLength={6}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
            required
          />
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' name='first-name' />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' name='last-name' required />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select id='role' name='role' required>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input type='checkbox' id='other' name='acquisition' value='other' />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button type='submit' className='button'>
          Sign up
        </button>
      </p>
    </form>
  );
}
