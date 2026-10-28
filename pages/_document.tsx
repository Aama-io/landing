import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

export default function Document() {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            // Loaded on first interaction (scroll, touch, key, mouse) or after 5s, whichever comes
            // first. Keeps ~300 KB of tag manager work off the critical path on slow phones while
            // still counting visitors who read without interacting.
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var done=false;function init(){if(done)return;done=true;
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}
              ['scroll','touchstart','keydown','mousemove'].forEach(function(e){
              w.addEventListener(e,init,{once:true,passive:true})});setTimeout(init,5000);
              })(window,document,'script','dataLayer','GTM-PKP7RMR2');`,
          }}
        />
      </Head>
      <body>
        <noscript>
          {/* Google Tag Manager (noscript) */}
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PKP7RMR2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
