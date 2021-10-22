import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import DefaultBtn from './styled/DefaultBtn';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION{
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <DefaultBtn onClick={signout}>
      Sign Out
    </DefaultBtn>
  );
}
