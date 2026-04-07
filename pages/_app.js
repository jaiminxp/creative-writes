import Layout from "@/components/layout";
import "@/styles/globals.css";
import {ToastContainer} from 'react-toastify'

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <ToastContainer />
            <Component {...pageProps} />
        </Layout>
    );
}
