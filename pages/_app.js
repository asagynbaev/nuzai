import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import "../scss/main.scss";

export default appWithTranslation(function MyApp({ Component, pageProps }) {
	return (<>
        <Head>
            <title>Nuzai Network</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
        </Head>
        <Component { ...pageProps } />
        <script src="https://code.jquery.com/jquery-3.6.0.js" />
	</>);
});