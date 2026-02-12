import React, { useState, useMemo } from 'react';
import type { HardwareItem } from '../types/hardware';
import {AdvancedImage} from '@cloudinary/react';
import {fit} from "@cloudinary/url-gen/actions/resize";
import {cloudinary} from "../data/cloudinary";

interface HardwareSearchProps {
  items: HardwareItem[];
}

const HardwareSearch: React.FC<HardwareSearchProps> = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique categories from all items
  const categories = useMemo(() => {
    const allCategories = items.flatMap(item => item.categories);
    const uniqueCategories = [...new Set(allCategories)];
    return uniqueCategories.sort();
  }, [items]);

  // Filter items based on search query and categories, then sort with new items first
  const filteredItems = useMemo(() => {
    const filtered = items.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categories.some(category => 
          category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(selectedCategory => 
          item.categories.includes(selectedCategory)
        );
      
      return matchesSearch && matchesCategory;
    });

    // Sort: coming-soon first, then new items, then by availableSince (newest first)
    return filtered.sort((a, b) => {
      // Coming soon items first
      if (a.status === 'coming-soon' && b.status !== 'coming-soon') return -1;
      if (a.status !== 'coming-soon' && b.status === 'coming-soon') return 1;
      
      // Then new items
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      
      // Then sort by availableSince (newest first)
      if (a.availableSince && b.availableSince) {
        return new Date(b.availableSince).getTime() - new Date(a.availableSince).getTime();
      }
      
      return 0;
    });
  }, [items, searchQuery, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'coming-soon':
        return (
          <span className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-1">
            coming soon
          </span>
        );
      case 'maintenance':
        return (
          <span className="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-1">
            maintenance
          </span>
        );
      default:
        return null;
    }
  };

  const getImagePath = (imageName: string) => {
    // For deployment, images should be in the public folder
    // Move images from src/assets to public/images for proper deployment
    return `/images/${imageName}`;
  };

  const truncateDescription = (text: string, wordLimit: number = 25) => {
    const words = text.split(' ');
    return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 font-mono text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 text-xs font-mono  transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


      {/* Hardware List */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <a
            key={item.id}
            href={`/hardware/${item.id}`}
            className="block group"
          >
            <div className="py-2">
              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="flex gap-3 mb-3 items-center">
                  {(item.images && item.images.length > 0) || item.cloudinaryPublicId ? (
                    <div className="flex-shrink-0">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded"
                        />
                      ) : item.cloudinaryPublicId ? (
                        <AdvancedImage
                          cldImg={cloudinary
                            .image(item.cloudinaryPublicId)
                            .resize(fit().width(128).height(128))}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded"
                        />
                      ) : null}
                    </div>
                  ) : null}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-display mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      {item.categories.map((category, idx) => (
                        <span key={category}>
                          <span className="font-mono text-gray-600 bg-gray-100 px-2 py-0.5">
                            {category}
                          </span>
                          {idx < item.categories.length - 1 && (
                            <span className="font-mono text-gray-400 ml-1.5">|</span>
                          )}
                        </span>
                      ))}
                      {(item.status === 'coming-soon' || item.status === 'maintenance' || item.isNew) && (
                        <>
                          {item.categories.length > 0 && <span className="font-mono text-gray-400">|</span>}
                          {item.status === 'coming-soon' && (
                            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 font-mono font-semibold">
                              coming soon
                            </span>
                          )}
                          {item.status === 'maintenance' && (
                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 font-mono font-semibold">
                              maintenance
                            </span>
                          )}
                          {item.isNew && (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 font-mono font-semibold">
                              new
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <p className="font-sans text-sm text-gray-700 break-words">{truncateDescription(item.description)}</p>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex gap-4 items-center">
                {(item.images && item.images.length > 0) || item.cloudinaryPublicId ? (
                  <div className="flex-shrink-0">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-32 h-32 object-contain rounded"
                      />
                    ) : item.cloudinaryPublicId ? (
                      <AdvancedImage
                        cldImg={cloudinary
                          .image(item.cloudinaryPublicId)
                          .resize(fit().width(256).height(256))}
                        alt={item.name}
                        className="w-32 h-32 object-contain rounded"
                      />
                    ) : null}
                  </div>
                ) : null}
                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl font-display mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {item.categories.map((category, idx) => (
                      <span key={category}>
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1">
                          {category}
                        </span>
                        {idx < item.categories.length - 1 && (
                          <span className="text-sm font-mono text-gray-400 ml-2">|</span>
                        )}
                      </span>
                    ))}
                    {(item.status === 'coming-soon' || item.status === 'maintenance' || item.isNew) && (
                      <>
                        {item.categories.length > 0 && <span className="text-sm font-mono text-gray-400">|</span>}
                        {item.status === 'coming-soon' && (
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-mono text-sm font-semibold">
                            coming soon
                          </span>
                        )}
                        {item.status === 'maintenance' && (
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-mono text-sm font-semibold">
                            maintenance
                          </span>
                        )}
                        {item.isNew && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-mono text-sm font-semibold">
                            new
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="font-sans text-gray-700">{truncateDescription(item.description)}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-mono">No hardware items match your search criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategories([]);
            }}
            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono text-sm transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HardwareSearch;
