import React, {useState} from 'react'
import { gql, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import logo from '../public/amazon_logo-black.svg';
import Link from 'next/link'
import DefaultBtn from './styled/DefaultBtn';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY } from './User';

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
  ) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;


function Signin() {
  const router = useRouter();

  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
const error =
  data?.authenticateUserWithPassword.__typename ===
  'UserAuthenticationWithPasswordFailure'
    ? data?.authenticateUserWithPassword
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
   const res = await signin().catch(console.error);
    console.log(res);
    resetForm();
        res?.data?.authenticateUserWithPassword.__typename ===
          'UserAuthenticationWithPasswordSuccess' &&
          router.replace({ pathname: '/' });
  }
  return (
    <div className='signup'>
      
      <div className='signup__wrap'>
        <div className='signup__logo'>
          <Link href='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <form method='POST' className='signup__form' onSubmit={handleSubmit}>
          <h1 className='form__header'>Sign-In</h1>
          {error && <h3>{error.message}</h3>}
          <fieldset>
            <label htmlFor='email'>
              Email
              <input
                type='email'
                name='email'
                placeholder='email'
                autoComplete='email'
                value={inputs.email}
                onChange={handleChange}
              />
            </label>

            <label htmlFor='password'>
              Password
              <input
                type='password'
                name='password'
                placeholder='At least 8 characters'
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
            <DefaultBtn type={'submit'}>Sign in</DefaultBtn>
          </fieldset>
        </form>
        <div className='signin__actions'>
          <div className='divider-break'>
            <h5>New to Amazon ?</h5>
          </div>
          <DefaultBtn blue onClick={() => router.push({ pathname: '/signup' })}>
            Create your Amazon account
          </DefaultBtn>
        </div>
      </div>
    </div>
  );
}

export default Signin
