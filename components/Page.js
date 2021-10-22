import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header';

function Page({ children }) {
  
  return (
    <>
      <Sidebar />
      <Header />
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};

export default Page;
