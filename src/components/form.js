import React, { useRef } from 'react';

const MyForm = () => {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check form validity
    if (formRef.current.checkValidity()) {
      // If the form is valid, perform your custom logic here
      console.log('Form submitted');
    } else {
      // If the form is invalid, you can handle errors or display messages
      console.log('Validation error: Please fill in all required fields');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* Input fields go here */}
      <label>
        Email:
        <input type="email" required />
      </label>
      <br />

      <label>
        Password:
        <input type="password" required />
      </label>
      <br />

      {/* Add more input fields as needed */}

      {/* Submit button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
