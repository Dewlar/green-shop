import React, { useState } from 'react';
import MobileMenu from './mobile-menu';
import Header from './header';

const HeaderWidthMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MobileMenu open={open} setOpen={setOpen}></MobileMenu>
      <Header open={open} setOpen={setOpen}></Header>
    </>
  );
};

export default HeaderWidthMobile;
