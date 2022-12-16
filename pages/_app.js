// Resetting css styles
import '../styles/reset.css';
import '../styles/globals.css';
import  styled from 'styled-components';
import { useState } from 'react';
import { ThemeProvider } from "styled-components";
import { light, dark } from '../styles/themes';
import Layout from './layout';
import { GlobalStyle } from '../styles/globals';



function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');
  const isDarkTheme = theme === 'dark';
  const handleThemeChange = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  }

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light} handleThemeChange={handleThemeChange} isDarkTheme={isDarkTheme}>
      <GlobalStyle/>
      <Layout handleThemeChange={handleThemeChange} isDarkTheme={isDarkTheme}>
        <Component {...pageProps} />
      </Layout>
  </ThemeProvider>
  )
}

export default MyApp
