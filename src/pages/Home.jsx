import Navigation from '../components/Navigation.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import Reviews from '../components/Reviews.jsx';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Reviews />
      <footer className="py-6 text-center text-sm text-gray-500">© 2025 MindBloom. All Rights Reserved.</footer>
    </div>
  );
}
