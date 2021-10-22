import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import Router from 'next/router';
import Page from '../components/Page';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';
import '../styles/App.css';
import SideBarStateProvider from '../contexts/sidebarState';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <SideBarStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </SideBarStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
