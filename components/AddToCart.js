import React , {useState} from 'react'
import DefaultBtn from './styled/DefaultBtn';
import {gql, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY, useUser } from './User'
import { useRouter} from 'next/router'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ADD_TO_CART = gql`
mutation ADD_TO_CART($quantity: Int!, $userID: ID!, $productID: ID!) { 
       createCartItem(data: {quantity : $quantity  product: {connect : {id: $productID}} user: {connect:{id:$userID}}}
       ) {
           id quantity 
       }
}
`;
const UPDATE_CART_ITEM = gql`
mutation UPDATE_CART_ITEM($quantity: Int!, $id: ID!) { 
       updateCartItem(id: $id  data: {quantity : $quantity  }
       ) {
           id quantity 
       }
}
`;



function AddToCart({productID , small}) {
  const me = useUser();
  const router = useRouter()
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });
  const [snackState, setSnackState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const [addedToCart, setAddedToCart] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  const [addToCart, {error: addError, loading: addLoading}] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query : CURRENT_USER_QUERY }]
  });
  const [updateCartItem, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_CART_ITEM, {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

  if (addError ) return <p>{addError.message}</p>;


  // Material -ui snackbar implementation
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    snackState && setSnackState({ ...snackState, open: false });
    addedToCart && setAddedToCart({...addedToCart, open: false})
  };



  const handleCLick = () => {
    if (me) {
      const [exisitigCartItem] = me.cart.filter(cartItem => cartItem.product.id === productID )
      console.log(exisitigCartItem);
      exisitigCartItem? updateCartItem({
          variables: {
            quantity: exisitigCartItem.quantity + 1,
            id: exisitigCartItem.id
          },
        }) : (
          addToCart({
  variables: {
    quantity: 1,
    userID: me?.id,
    productID: productID,
  },
})
        )
       /* if (exisitigCartItem) {
         console.log(exisitigCartItem,'updating quantity');
        updateCartItem({
          variables: {
            quantity: exisitigCartItem.quantity + 1,
            id: exisitigCartItem.id
          },
        });
      } else {
        console.log(exisitigCartItem,'add new one');
addToCart({
  variables: {
    quantity: 1,
    userID: me?.id,
    productID: productID,
  },
});
} */
setAddedToCart({ open: true, vertical: 'top', horizontal: 'right' });
        
    } else {
      setSnackState({ open: true, vertical: 'top', horizontal: 'right' });
    }
    
      
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: snackState.vertical,
          horizontal: snackState.horizontal,
        }}
        key={'infoSNack'}
        open={snackState.open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
          You Must be Signed In To do this action!
          <br />
          <DefaultBtn onClick={() => router.push({ pathname: '/signin' })}>
            Sign In
          </DefaultBtn>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: addedToCart.vertical,
          horizontal: addedToCart.horizontal,
        }}
        key={'addSnack'}
        open={addedToCart.open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Product Added To Your Cart
        </Alert>
      </Snackbar>
      <DefaultBtn disabled={updateLoading || addLoading} onClick={handleCLick} small>
        Add{addLoading || updateLoading ? 'ing' : ' '} to Cart
      </DefaultBtn>
    </>
  );
}

export default AddToCart
