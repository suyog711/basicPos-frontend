import React from 'react';

type FooterProps = {
  //
};

const Footer: React.FC<FooterProps | any> = () => {
  return (
    <footer className="main-footer">
      <div className="float-right d-none d-sm-block">
        <b>Version</b> 3.0.2-pre
      </div>
      <strong>
        Copyright © 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.
      </strong>{' '}
      All rights reserved.
    </footer>
  );
};

export default Footer;
