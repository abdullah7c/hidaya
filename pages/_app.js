import React, {useEffect} from 'react';
import ClientLayout from '../components/Shared/ClientLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import '/styles/globals.css'
import '/styles/main.scss';
import { useRouter } from 'next/router'
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import SSRProvider from 'react-bootstrap/SSRProvider';

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  
  return(
    <div>
    <Provider store={store}>
    <SSRProvider>
    {(router.pathname!='/admin' && router.pathname!='/') &&
        <ClientLayout>
            <Component {...pageProps} />
        </ClientLayout>
    }
    { router.pathname=='/' && <Component {...pageProps} /> }
    { router.pathname=='/admin' && <Component {...pageProps} /> }
    </SSRProvider>
    </Provider>
    </div>
  )
}

export default MyApp