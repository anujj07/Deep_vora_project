import React from 'react';
import { PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';
import { X, MapPin, ArrowRight } from 'lucide-react';

interface MultiProjectIndexProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (proj: ProjectLocation) => void;
  selectedProjectId: string;
}

export const MultiProjectIndex: React.FC<MultiProjectIndexProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  selectedProjectId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-end transition-opacity duration-300">
      <div className="w-full max-w-2xl h-full bg-[#fcfbf9] overflow-y-auto p-6 md:p-12 flex flex-col justify-between shadow-2xl border-l border-black/10 animate-slideLeft">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-black/[0.08] pb-6 mb-8">
            <div>
              <div className="text-[10px] font-mono-tech tracking-[0.2em] text-[#888880] uppercase">
                ATELIER ARCHITECT
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111111]">
                PROJECTS INDEX
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Projects List Cards */}
          <div className="space-y-6">
            {PROJECTS_REGISTRY.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <button
                  type="button"
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    onClose();
                  }}
                  aria-pressed={isSelected}
                  className={`group relative w-full p-5 rounded-lg border text-left transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                    isSelected
                      ? 'bg-white border-black shadow-md ring-1 ring-black'
                      : 'bg-white/60 border-black/[0.06] hover:border-black/30 hover:bg-white'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <div className="w-full sm:w-32 h-24 rounded-md overflow-hidden bg-neutral-200 shrink-0">
                      <img
                        src={proj.heroImage}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 text-[10px] font-mono-tech text-[#888880] mb-1">
                        <span>{proj.year}</span>
                        <span>•</span>
                        <span>{proj.category}</span>
                      </div>

                      <h3 className="text-base font-bold text-[#111111] group-hover:text-black transition-colors">
                        {proj.title}
                      </h3>

                      <p className="text-xs font-mono-tech text-[#666660] mt-0.5">
                        {proj.client} — {proj.area}, {proj.city}
                      </p>

                      <div className="flex items-center space-x-3 mt-3 text-[10px] font-mono-tech text-[#888880]">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-red-600" />
                          <span>{proj.coords.lat}</span>
                        </span>
                        <span className="text-black font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                          <span>FOCUS MAP</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-black/[0.08] pt-6 mt-8 text-xs font-mono-tech text-[#888880] flex justify-between">
          <span>CARTOGRAPHIC SPATIAL VIEWER</span>
          <span>{PROJECTS_REGISTRY.length} ACTIVE MONOGRAPHS</span>
        </div>
      </div>
    </div>
  );
};
