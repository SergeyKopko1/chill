// pages/about.tsx
import { NextPage } from 'next';

import About from '@/pages/main/about';
import BooksBlock from '@/pages/main/books';
import Footer from '@/pages/main/footer';
import Header from '@/pages/main/header';
import Information from '@/pages/main/information';
import Roadmap from '@/pages/main/roadmap';

const MainPage: NextPage = () => {
  return (
    <>
      <Header />
      <About />
      <BooksBlock />
      <Roadmap />
      <Information />
      <Footer />
    </>
  );
};

export default MainPage;
