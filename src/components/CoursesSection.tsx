
import React, { useState } from 'react';
import { CourseGrid } from './CourseGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, TrendingUp, Sparkles } from 'lucide-react';

export const CoursesSection = () => {
  const [activeSubTab, setActiveSubTab] = useState('my-courses');
  const [searchQuery, setSearchQuery] = useState('');

  const subTabs = [
    { id: 'my-courses', label: 'Мои курсы', icon: '📚' },
    { id: 'wishlist', label: 'Избранное', icon: '❤️' },
    { id: 'popular', label: 'Популярные', icon: '🔥' },
    { id: 'new', label: 'Новые', icon: '✨' }
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'my-courses':
        return <CourseGrid />;
      case 'wishlist':
        return (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Избранные курсы</h3>
            <p className="text-gray-300">Здесь будут отображаться ваши избранные курсы</p>
          </div>
        );
      case 'popular':
        return (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Популярные курсы</h3>
            <p className="text-gray-300">Самые популярные курсы среди пользователей</p>
          </div>
        );
      case 'new':
        return (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 mx-auto text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Новые курсы</h3>
            <p className="text-gray-300">Последние добавленные курсы</p>
          </div>
        );
      default:
        return <CourseGrid />;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Поиск курсов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {subTabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            variant={activeSubTab === tab.id ? "default" : "outline"}
            className={`${
              activeSubTab === tab.id
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};
