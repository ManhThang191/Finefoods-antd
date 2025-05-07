import { useRegister } from '@refinedev/core';
import React from 'react';

type RegisterVariables = {
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    console.log('values', values);

    register(values);
  };
  const { mutate: register } = useRegister<RegisterVariables>();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input name="email" value="test@refine.com" />
        <label>Password</label>
        <input name="password" value="refine" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
