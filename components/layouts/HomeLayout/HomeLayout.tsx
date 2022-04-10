import React from 'react';
import dynamic from 'next/dynamic';
// import { useSelector } from 'react-redux'
// import { IStates } from 'stores/root.reducer'
import { Box } from '@material-ui/core';

const Header = dynamic(import('../Header'));
const Footer = dynamic(import('../Footer'));

const Layout = (props: any) => {
  // const { display,fontsize } = useSelector((state: IStates) => state.globalReducer)
  const { children } = props;

  const renderArticle = () => {
    return (
      <>
        <Box>
          <Box>
            <Header />
            <article>{children}</article>
            <Footer />
          </Box>
        </Box>
      </>
    );
  };

  return <>{renderArticle()}</>;
};

export default Layout;
