import React from 'react';
import './App.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header.js';
import Body from '../Body/Body.js';
import Footer from '../Footer/Footer.js';
import { defaultClothingItems } from '../../utils/constants';

export default function App() {
  const userName = "(V);,,;(V)";
  const location = "Bedlam";
  const temperature = "HECKINGHOT";
  //const isDay = true;
  return (
    <div className='page'>
      <Header locationName={location} userName={userName}/>
      <Body items={defaultClothingItems} temperature={temperature}/>
      <Footer />
    </div>
  );
}
