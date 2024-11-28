import DetailFooter from '@/app/[locale]/jobs/[id]/components/detail-footer';
import Banner from '@/components/home/banner';
import FAQ from '@/components/home/faq';
import GetInTouch from '@/components/home/getintouch';
import Hero from '@/components/home/hero/Hero';
import Jobs from '@/components/home/jobs';
import Journey from '@/components/home/journey/Journey';
import NewsLetter from '@/components/home/newsletter';
import WhyChooseUs from '@/components/home/whychooseus';
import Nav from '@/components/nav';
import React from 'react';
import JplusNews from '@/components/home/JplusNews';
import AdviseJplus from '@/components/home/AdviseJplus';
import AboutJplus from '@/components/home/AboutJplus';

const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Banner />
      <Jobs />
      {/* <CTA /> remove */}
      <WhyChooseUs />
      <NewsLetter />
      <Journey />
      <AboutJplus/>
      <JplusNews />
      <AdviseJplus/>
      {/* <ANC /> */}
      <FAQ />
      <GetInTouch />
      {/* <Footer remove/> */}
      <DetailFooter/>
    </div>
  );
};

export default Home;
