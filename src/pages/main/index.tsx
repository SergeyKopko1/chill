// pages/about.tsx
import { NextPage } from 'next';
import { Header } from '@/pages/main/header';
import { About } from '@/pages/main/about';
import { BooksBlock } from '@/pages/main/books';
import { Roadmap } from '@/pages/main/roadmap';
import { Information } from '@/pages/main/information';
import { Footer } from '@/pages/main/footer';

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
