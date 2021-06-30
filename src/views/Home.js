import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTilesHeader from '../components/sections/FeaturesTilesHeader';

import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = () => {

  return (
    <>
      <Hero className="" />
      <FeaturesTilesHeader bottomDivider />
      <FeaturesTiles  />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Cta split />
    
    </>
  );
}

export default Home;