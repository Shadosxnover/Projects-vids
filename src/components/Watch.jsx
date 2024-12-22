import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from './constants';
import { ThumbsUp, ThumbsDown, Share, Bookmark, Menu, VideoIcon, Search, X } from 'lucide-react';

const WatchPage = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id) || projects[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 bg-[#0F0F0F] border-b border-gray-800 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Menu size={24} />
              <Link to="/" className="flex items-center">
                <VideoIcon className="text-red-600" size={28} />
                <span className="ml-2 text-xl font-semibold">MyTube</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="md:hidden"
              >
                <Search size={24} />
              </button>
              <div className={`
                absolute top-0 left-0 right-0 bg-[#0F0F0F] p-4 md:relative md:block
                ${showSearch ? 'block' : 'hidden'}
              `}>
                <div className={`flex items-center bg-gray-800 rounded-full transition-all ${isFocused ? 'ring-1 ring-red-500' : ''}`}>
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
                    className="px-4 py-2 bg-transparent outline-none w-full md:w-64 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="pr-4 hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Video and Content Container */}
      <div className="max-w-[1800px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column - Video and Info */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={project.videoUrl}
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              allowFullScreen
              title={project.title}
            />
          </div>

          {/* Video Info */}
          <div className="mt-4">
            <h1 className="text-xl font-semibold">{project.title}</h1>
            
            {/* Engagement Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pb-4 border-b border-gray-700 gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{project.views} views</span>
                <span>•</span>
                <span>{project.date}</span>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-6">
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <ThumbsUp size={20} />
                  <span className="text-sm">{project.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <ThumbsDown size={20} />
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Share size={20} />
                  <span className="text-sm hidden sm:inline">Share</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Bookmark size={20} />
                  <span className="text-sm hidden sm:inline">Save</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-4 bg-gray-800/50 rounded-xl">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-300">{project.description}</p>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-red-500 hover:text-red-400 text-sm"
                >
                  View on GitHub →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Related Videos */}
        <div className="w-full lg:w-[400px] lg:flex-shrink-0">
          <div className="space-y-3">
            {projects.filter(p => p.id !== id).map((project) => (
              <Link 
                to={`/watch/${project.id}`} 
                key={project.id} 
                className="flex gap-3 group"
              >
                <div className="flex-shrink-0 relative w-40 h-24">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-red-500">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{project.views} views</p>
                  <p className="text-xs text-gray-400">{project.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;