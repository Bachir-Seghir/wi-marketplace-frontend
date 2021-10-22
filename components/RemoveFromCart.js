import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';


const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    
  });
  return (
    <button
      className='cartItem__removeItem'
      onClick={removeFromCart}
      disabled={loading}
      type='button'
      title='Remove This Item from Cart'>
      Delete
    </button>
  );
}
