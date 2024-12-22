import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { projects } from './constants';
import { Menu, Home, Clock, ThumbsUp, PlaySquare, Bookmark, History, VideoIcon, Search, X } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const searchPath = searchQuery ? `/?q=${encodeURIComponent(searchQuery)}` : '/';
    navigate(searchPath);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#0F0F0F] text-white relative">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-30 w-64 bg-[#0F0F0F] transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none lg:flex-shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-r border-gray-800 h-full">
          <div className="flex items-center gap-2 mb-8">
            <button onClick={toggleSidebar} className="lg:hidden">
              <X size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <VideoIcon className="text-red-600" size={28} />
              <span className="ml-2 text-xl font-semibold">MyTube</span>
            </Link>
          </div>
          
          <nav className="space-y-2">
            <Link to="/" className="flex items-center gap-3 p-2 bg-red-600/10 text-red-500 rounded-lg">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/history" className="flex items-center gap-3 p-2 hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-colors">
              <History size={20} />
              <span>History</span>
            </Link>
            <Link to="/watch-later" className="flex items-center gap-3 p-2 hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-colors">
              <Clock size={20} />
              <span>Watch Later</span>
            </Link>
            <Link to="/liked" className="flex items-center gap-3 p-2 hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-colors">
              <ThumbsUp size={20} />
              <span>Liked Videos</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full">
        <header className="sticky top-0 bg-[#0F0F0F] p-4 border-b border-gray-800 z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <button onClick={toggleSidebar} className="lg:hidden">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold">My Projects</h1>
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-4 relative w-full sm:w-auto">
              <div className={`flex items-center bg-gray-800 rounded-full transition-all w-full sm:w-auto ${isFocused ? 'ring-1 ring-red-500' : ''}`}>
                <div className="pl-4">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search projects..."
                  className="px-4 py-2 bg-transparent outline-none w-full sm:w-64 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="pr-4 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </header>

        {/* Video Grid */}
        <div className="max-w-[2400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6">
            {filteredProjects.map((project) => (
              <Link to={`/watch/${project.id}`} key={project.id} className="group">
                <div className="w-full">
                  <div className="relative w-full pt-[56.25%] overflow-hidden rounded-xl">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="absolute top-0 left-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium text-base line-clamp-2 group-hover:text-[#ff0000]">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <span>{project.views} views</span>
                      <span>•</span>
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* No Results Message */}
          {searchQuery && filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No projects found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;