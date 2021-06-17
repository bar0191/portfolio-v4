import * as React from 'react';
import '../styles/styles.scss';
import type { AppProps } from 'next/app';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Head from 'next/head';
import { RecoilRoot, useRecoilValue } from 'recoil';
import dynamic from 'next/dynamic'
import Grid from '../components/Grid';
import Hamburger from '../components/Hamburger';
import { isGlLoaded, isPageGlLoaded } from '../store';
import Mouse from '../components/Mouse';
import Logo from '../components/Logo';
import Nav from '../components/Nav';

const RenderGL = dynamic(
  () => import('../components/renderGL.js'),
  { ssr: false }
)

const RenderCursor = dynamic(
  () => import('../components/cursor.js'),
  { ssr: false }
)

function AppWrapper({ Component, pageProps }: AppProps) : JSX.Element {
  const isLoaded = useRecoilValue(isGlLoaded);
  const isPageLoaded = useRecoilValue(isPageGlLoaded);

  if (!isLoaded) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <>
      <Logo />
      <Nav />
      <Hamburger />
      <Grid />
      <Mouse />
      <RenderCursor />
      <Component {...pageProps} />
    </>
  );
}

function AppRoute(props: AppProps): JSX.Element {

  return (
    <AnimateSharedLayout>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/Odachi.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>
      <div id="scene-container" />
      <div className="cursor" />
      <div id="cursor">
        <div className="cursor-circle" />
      </div>
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
