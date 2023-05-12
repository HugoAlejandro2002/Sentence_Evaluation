import React, { useState } from 'react';

const FormularioHCI = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    subscription: false,
    promo: false,
  });

  const [formError, setFormError] = useState({});

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      if (formData[name] !== value) { // Comprobamos si el valor ha cambiado
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar el formulario
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = 'Please enter your first name.';
    }

    if (!formData.lastName) {
      errors.lastName = 'Please enter your last name.';
    }

    if (!formData.email) {
      errors.email = 'Please enter a valid email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email.';
    }

    if (!formData.password) {
      errors.password = 'Please enter a password.';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className='bg-white/70 rounded-lg shadow p-8 max-w-md w-full'>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="my-2">
            <label htmlFor="firstName" className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {!formData.firstName && (
              <p className="text-red-500 mt-1">Please enter an first name</p>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="lastName" className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {!formData.lastName && (
              <p className="text-red-500 mt-1">Please enter last name</p>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {!formData.email && (
              <p className="text-red-500 mt-1">Please enter an email address</p>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="password" className="block font-medium mb-1 ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
          </div>
          <div className="my-2">
            <label htmlFor="confirmPassword" className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="my-2">
            <input
              type="checkbox"
              name="subscription"
              checked={formData.subscription}
              onChange={handleInputChange}
              className="mr-1"
            />
            <label htmlFor="subscription" className="font-medium">Subscribe to our newsletter</label>
          </div>
          <div className="my-2">
            <input
              type="checkbox"
              name="promo"
              checked={formData.promo}
              onChange={handleInputChange}
              className="mr-1"
            />
            <label htmlFor="promo" className="font-medium">Receive promotional emails</label>
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Sign Up</button>
        </form>
      </div>

    </div>
  );
};

export default FormularioHCI;
