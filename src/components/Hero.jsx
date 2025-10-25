import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The Easiest Way to Track Your Moods Online
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Track feelings, spot patterns, and get simple insights. Start a private mood journal or invite students to use the tracker.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/choose/role')}>Start tracking</Button>
              <a className="text-sm underline" href="#features">Learn more</a>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-full max-w-md h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Illustration</div>
          </div>
        </div>
      </div>
    </section>
  );
}
