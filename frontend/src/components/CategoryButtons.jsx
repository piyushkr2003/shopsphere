import React from 'react';
import { categories } from '../data/products';

const CategoryButtons = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap gap-2.5">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
            ${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
