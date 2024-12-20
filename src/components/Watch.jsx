import React from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "./constants";
import { ThumbsUp, ThumbsDown, Share, Bookmark } from "lucide-react";

const WatchPage = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        <h1 className="text-lg">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Container */}
      <div className="max-w-[1800px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={project.videoUrl}
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              allowFullScreen
              title={project.title}
            />
          </div>

          {/* Video Details */}
          <div className="mt-4">
            <h1 className="text-xl font-semibold">{project.title}</h1>

            {/* Engagement Bar */}
            <div className="flex items-center justify-between mt-4 pb-4 border-b border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{project.views} views</span>
                <span>•</span>
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 hover:text-blue-400">
                  <ThumbsUp size={20} />
                  <span className="text-sm">{project.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400">
                  <ThumbsDown size={20} />
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400">
                  <Share size={20} />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400">
                  <Bookmark size={20} />
                  <span className="text-sm">Save</span>
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
                  className="inline-block mt-4 text-blue-400 hover:underline text-sm"
                >
                  View on GitHub →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Related Videos */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="space-y-3">
            {projects
              .filter((p) => p.id !== id)
              .map((relatedProject) => (
                <Link
                  to={`/watch/${relatedProject.id}`}
                  key={relatedProject.id}
                  className="flex gap-3 group"
                >
                  <div className="flex-shrink-0 relative w-40 h-24">
                    <img
                      src={relatedProject.thumbnail}
                      alt={relatedProject.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-400">
                      {relatedProject.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {relatedProject.views} views
                    </p>
                    <p className="text-xs text-gray-400">{relatedProject.date}</p>
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
