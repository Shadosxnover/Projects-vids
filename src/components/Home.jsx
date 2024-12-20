import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from './constants';
import { Menu, Home, Clock, ThumbsUp, PlaySquare, Bookmark, History, VideoIcon } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex h-screen bg-[#0F0F0F] text-white">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r border-gray-800">
        <div className="flex items-center gap-2 mb-8">
          <Menu size={24} />
          <Link to="/" className="flex items-center">
            <VideoIcon className="text-red-600" size={28} />
            <span className="ml-2 text-xl font-semibold">MyTube</span>
          </Link>
        </div>
        
        <nav className="space-y-2">
          <Link to="/" className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/history" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg">
            <History size={20} />
            <span>History</span>
          </Link>
          <Link to="/watch-later" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg">
            <Clock size={20} />
            <span>Watch Later</span>
          </Link>
          <Link to="/liked" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg">
            <ThumbsUp size={20} />
            <span>Liked Videos</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 bg-[#0F0F0F] p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">My Projects</h1>
            <div className="flex items-center gap-4">
              <input
                type="search"
                placeholder="Search projects..."
                className="px-4 py-2 bg-gray-800 rounded-full outline-none"
              />
            </div>
          </div>
        </header>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {projects.map((project) => (
            <Link to={`/watch/${project.id}`} key={project.id} className="group">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                {/* Displaying thumbnail only */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold group-hover:text-blue-400">{project.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{project.description}</p>
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
      </div>
    </div>
  );
};

export default HomePage;
