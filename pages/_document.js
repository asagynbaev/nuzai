import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />

                    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-FRZVQX3WXW" />
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() { dataLayer.push(arguments) }
                            gtag('js', new Date());
                            gtag('config', 'G-FRZVQX3WXW');
                        `
                    }}/>

                    {/* <!-- Yandex.Metrika counter --> */}
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            (function(m,e,t,r,i,k,a) {
                                m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) };
                                m[i].l = 1 * new Date();
                                k = e.createElement(t),
                                a = e.getElementsByTagName(t)[0],
                                k.async = 1,
                                k.src = r,
                                a.parentNode.insertBefore(k, a)
                            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
                            ym(83306023, "init", {
                                clickmap: true,
                                trackLinks: true,
                                accurateTrackBounce: true,
                                webvisor: true
                            });
                        `
                    }}/>
                    {/* <!-- /Yandex.Metrika counter --> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* Don't know why it breaks build */}
                    <noscript>
                        <div>
                            <img src="https://mc.yandex.ru/watch/83306023" style={{ position: "absolute", left: "-9999px" }} alt="" />
                        </div>
                    </noscript>
                </body>
            </Html>
        );
    }
}