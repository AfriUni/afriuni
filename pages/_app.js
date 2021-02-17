import '../styles/tailwind.css';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import client from '../src/apollo/client';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import { Provider } from 'mobx-react';
import Stores from '../src/stores';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider {...Stores}>
        <Head>
          <title>Afriuni.com</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/favicons.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <div className="relative flex flex-col justify-between">
          <Header />

          <Component {...pageProps} />

          <Footer />
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
