import * as React from 'react';
import '../styles/styles.scss';
import type { AppProps } from 'next/app';
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import Head from 'next/head';
import Script from 'next/script';
import { RecoilRoot, useRecoilValue } from 'recoil';
import dynamic from 'next/dynamic'
import Grid from '../components/Grid';
import Hamburger from '../components/Hamburger';
import { isGlLoaded, isPageGlLoaded } from '../store';
import Mouse from '../components/Mouse';
import Logo from '../components/Logo';
import Nav from '../components/Nav';
import Loader from '../components/Loader';

const RenderGL = dynamic(
  () => import('../components/renderGL.js'),
  { ssr: false }
);

const RenderCursor = dynamic(
  () => import('../components/cursor.js'),
  { ssr: false }
);

const variants = {
  enter: { opacity: 1 },
  center: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.4 }}
}

function AppWrapper({ Component, pageProps }: AppProps) : JSX.Element {
  const [init, setInit] = React.useState(false);
  const isLoaded = useRecoilValue(isGlLoaded);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isPageLoaded = useRecoilValue(isPageGlLoaded);

  React.useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setInit(true);
      }, 2500);
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      { !init ? (
        <motion.div
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          style={{
            zIndex: 50,
            position: 'absolute',
            width:'100%',
            height: '100%',
            background: 'black',
          }}
        >
          <Loader />
        </motion.div>
      ) : (
        <>
          <Logo />
          <Nav />
          <Hamburger />
          <Grid />
          <Mouse />
          <RenderCursor />
          <Component {...pageProps} />
        </>
      )}
    </AnimatePresence>
  );
}

function AppRoute(props: AppProps): JSX.Element {

  return (
    <AnimateSharedLayout>
      <Head>
        <title>Brandon Reid - Portfolio</title>
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/24726378?v=4" />
        <meta name="description" content="Brandon Reid is a jack of all trades, specializing in software engineering, web and creative development based out of Salzburg, Austria." />
        <meta name="keywords" content="Software, Engineering, Freelance, Developer, Javascript, React, Three JS, Javascript, Rails, 3D, Web, Dev, Go, GoLang, Ruby on Rails" />
        <meta name="author" content="Brandon Reid" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/Odachi.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-0VKS8XYC6H" />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0VKS8XYC6H');
            `
        }}
      />
      <div id="scene-container" />
      <div className="cursor" />
      <div id="cursor">
        <div className="cursor-circle" />
      </div>
      <div className="bg-noise" />
      <AppWrapper { ...props } />
      <RenderGL { ...props } />
    </AnimateSharedLayout>
  );
}

function MyApp(props: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <AppRoute { ...props } />
    </RecoilRoot>
  );
}

export default MyApp;
