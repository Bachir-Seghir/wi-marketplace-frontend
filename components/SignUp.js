import React , {useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';

import logo from '../public/amazon_logo-black.svg';
import Link from 'next/link'
import DefaultBtn from './styled/DefaultBtn';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;


function SignUp() {

   // Material -ui snackbar implementation  
    const [snackState, setSnackState] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, open } = snackState;
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
    });
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackState({ ...snackState, open: false });
    };

    const { inputs, handleChange, resetForm } = useForm({
        name: '',
        email: '',
        password: ''
    })

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
        refetchQueries : [{ query : CURRENT_USER_QUERY}]
    });

    async function handleSubmit(e) {
        e.preventDefault()
         await signup().catch(console.error)
         resetForm()
         setSnackState({ open: true, vertical: 'top', horizontal: 'center' });
    }
    return (
      <div className='signup'>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}>
            Signed Up successfully - Welcome To Amazon !
          </Alert>
        </Snackbar>
        <div className='signup__wrap'>
          <div className='signup__logo'>
            <Link href='/'>
              <img src={logo} alt='logo' />
            </Link>
          </div>
          <form method='POST' className='signup__form' onSubmit={handleSubmit}>
            <h1 className='form__header'>Create account</h1>
            {error && <p>{error.message}</p>}
            <fieldset disabled={loading}>
              <label htmlFor='name'>
                Your name
                <input
                  type='name'
                  name='name'
                  placeholder='user name'
                  value={inputs.name}
                  onChange={handleChange}
                />
              </label>
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
              <DefaultBtn submit>Sign Up</DefaultBtn>
              <p>
                By creating an account, you agree to Amazon's{' '}
                <a href='/'> Conditions of Use </a>
                and <a href='/'> Privacy Notice </a>.
              </p>
              <div className='divider-section'></div>
              <h5 className='signup__redirect-signin'>
                Already have an account? <Link href='/signin'> Sign-In</Link>
              </h5>
            </fieldset>
          </form>
        </div>
      </div>
    );
}

export default SignUp
