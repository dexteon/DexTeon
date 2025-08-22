import React from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const WelcomePanel: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold mb-2">Welcome back, John</h2>
          <p className="text-blue-100 text-lg">Your digital security is actively protected</p>
          <p className="text-sm text-blue-200 mt-2">Last scan completed 2 hours ago</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Scan Now</span>
          </button>
          
          <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>View Report</span>
          </button>
        </div>
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-300" />
            <div>
              <p className="text-sm text-blue-200">Data Removed</p>
              <p className="text-2xl font-bold">247</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-orange-300" />
            <div>
              <p className="text-sm text-blue-200">Active Threats</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <div>
              <p className="text-sm text-blue-200">Protection Score</p>
              <p className="text-2xl font-bold">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;