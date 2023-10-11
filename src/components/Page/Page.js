import React from 'react';
import './Page.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header.js';
import Body from '../Body/Body.js';
import Footer from '../Footer/Footer.js';
import { defaultClothingItems as defaultItems } from '../../utils/constants.js';



function Page() {
  const userName = 'Kani (V);,,;(V)';
  const locationName = 'Bedlam';

  return (
    <div className='page'>
      <Header locationName={locationName} userName={userName}/>
      <Body items={defaultItems}/>
      <Footer />
    </div>
  );
}

export default Page;
