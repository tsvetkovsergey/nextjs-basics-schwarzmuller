import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // You can wrap all your pages
    // with your component containing
    // navbar or footer for example.
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
