import React, { useState, useMemo } from 'react';
import type { HardwareItem } from '../types/hardware';

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

  // Filter items based on search query and categories
  const filteredItems = useMemo(() => {
    return items.filter(item => {
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
          <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            coming soon
          </span>
        );
      case 'maintenance':
        return (
          <span className="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-1 rounded">
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
            className="w-full px-4 py-3 font-mono text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
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
          <div 
            key={item.id} 
            className="border border-gray-200 rounded-lg p-6 fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-center mb-4">
              <img
                src={getImagePath(item.image)}
                alt={item.name}
                className="w-32 h-32 object-contain"
                loading="lazy"
                decoding="async"
                width="128"
                height="128"
              />
            </div>
            <h3 className="font-mono text-lg text-gray-900 mb-3 text-center">{item.name}</h3>
            {item.status !== 'available' && (
              <div className="text-center mb-2">
                {getStatusBadge(item.status)}
              </div>
            )}
            <p className="font-sans text-sm text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>
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
            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-mono text-sm transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HardwareSearch;
