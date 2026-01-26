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

    // Sort: coming-soon first, then new items, then others
    return filtered.sort((a, b) => {
      // Coming soon items first
      if (a.status === 'coming-soon' && b.status !== 'coming-soon') return -1;
      if (a.status !== 'coming-soon' && b.status === 'coming-soon') return 1;
      
      // Then new items
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      
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
          <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1">
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
            className="w-full px-4 py-3 font-mono text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


      {/* Hardware Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <a 
            key={item.id}
            href={`/hardware/${item.id}`}
            className="border border-gray-200 p-6 fade-in flex flex-col relative cursor-pointer hover:border-indigo-600 transition-colors"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {item.status === 'coming-soon' && (
              <span className="absolute top-4 right-4 text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1">
                coming soon
              </span>
            )}
            {item.status === 'maintenance' && (
              <span className="absolute top-4 right-4 text-xs font-mono text-orange-600 bg-orange-50 px-2 py-1">
                maintenance
              </span>
            )}
            {item.isNew && (
              <span className="absolute top-4 right-4 text-xs font-mono text-green-600 bg-green-50 px-2 py-1">
                new
              </span>
            )}
            <div className="flex items-center justify-center mb-4">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-32 h-32 object-contain"
                />
              ) : item.cloudinaryPublicId ? (
                <AdvancedImage
                  cldImg={cloudinary
                    .image(item.cloudinaryPublicId)
                    .resize(fit().width(256).height(256))}
                  alt={item.name}
                  className="w-32 h-32 object-contain"
                />
              ) : null}
            </div>
            <h3 className="font-mono text-lg text-gray-900 mb-3 text-center">{item.name}</h3>
            <p className="font-sans text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
              {truncateDescription(item.description)}
            </p>
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
