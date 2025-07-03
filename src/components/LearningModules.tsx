import React, { useState } from 'react';
import { BookOpen, Clock, Users, Award, ArrowRight, Play, CheckCircle, Lock } from 'lucide-react';
import { modules } from '../data/mockData';
import * as LucideIcons from 'lucide-react';

const LearningModules: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const categories = ['All', 'Email Security', 'Account Security', 'Privacy', 'Financial Security'];
  
  const filteredModules = selectedCategory === 'All' 
    ? modules 
    : modules.filter(module => module.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="h-6 w-6 text-white" /> : <BookOpen className="h-6 w-6 text-white" />;
  };

  if (selectedModule) {
    const module = modules.find(m => m.id === selectedModule);
    if (!module) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedModule(null)}
            className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Modules</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Module Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`${module.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      {renderIcon(module.icon)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{module.title}</h1>
                      <p className="text-blue-100">{module.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{module.lessons.length} lessons</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                  <div className="space-y-3">
                    {module.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                              </span>
                              <span className="capitalize">{lesson.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {index === 0 ? (
                            <Play className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Lock className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Course Progress</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-gray-600">Lessons Complete</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-gray-600">Quiz Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Learning Button */}
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Learning</span>
              </button>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="h-8 w-8 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">First Steps</div>
                      <div className="text-sm text-gray-500">Complete your first lesson</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg opacity-50">
                    <Award className="h-8 w-8 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Module Master</div>
                      <div className="text-sm text-gray-500">Complete all lessons</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Learning Modules
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master cybersecurity through engaging, gamified lessons designed for all skill levels.
            Earn badges, track progress, and become a cyber expert.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Modules Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">7</div>
              <div className="text-gray-600">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
              <div className="text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedModule(module.id)}
            >
              <div className={`${module.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    {renderIcon(module.icon)}
                  </div>
                  <span className={`px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium`}>
                    {module.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <p className="text-white/80 text-sm">{module.description}</p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{module.lessons.length} lessons</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Progress: 0%
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 font-medium group">
                    <span>Start Learning</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <Award className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">Earn Certificates & Badges</h2>
            <p className="text-purple-100 mb-6 text-lg">
              Complete modules to earn official certificates and badges that showcase your cybersecurity knowledge.
              Share your achievements and build your professional profile.
            </p>
            <div className="flex justify-center space-x-4">
              {['🏆', '🛡️', '🔒', '⭐', '🎯'].map((emoji, index) => (
                <div key={index} className="text-4xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModules;