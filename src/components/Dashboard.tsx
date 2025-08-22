import React, { useState } from 'react';
import WelcomePanel from './WelcomePanel';
import DataTracker from './DataTracker';
import ErasureStatus from './ErasureStatus';
import OngoingMonitoring from './OngoingMonitoring';
import SupportCenter from './SupportCenter';
import Testimonials from './Testimonials';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Panel */}
      <WelcomePanel />
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Data Tracker */}
        <div className="lg:col-span-2">
          <DataTracker />
        </div>
        
        {/* Right Column - Ongoing Monitoring */}
        <div>
          <OngoingMonitoring />
        </div>
      </div>
      
      {/* Erasure Status Timeline */}
      <ErasureStatus />
      
      {/* Support and Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SupportCenter />
        <Testimonials />
      </div>
    </div>
  );
};

export default Dashboard;