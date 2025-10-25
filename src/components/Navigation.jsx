import { Link } from 'react-router-dom';
export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
          <span className="text-2xl font-bold text-gray-800">MindBloom</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/student/login" className="text-sm font-medium">Student</Link>
          <Link to="/admin/login" className="text-sm font-medium">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
