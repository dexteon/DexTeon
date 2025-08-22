import React from 'react';
import { Bell, Shield, AlertTriangle, TrendingUp, Eye } from 'lucide-react';

interface Alert {
  id: string;
  type: 'threat' | 'success' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

const OngoingMonitoring: React.FC = () => {
  const recentAlerts: Alert[] = [
    {
      id: '1',
      type: 'threat',
      title: 'New Dark Web Exposure',
      description: 'Your email found on newly discovered breach database',
      timestamp: '5 min ago',
      priority: 'high'
    },
    {
      id: '2',
      type: 'success',
      title: 'Data Removed Successfully',
      description: 'PeopleDataHub.com removal confirmed',
      timestamp: '1 hour ago',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Verification Required',
      description: 'Additional verification needed for PublicRecords.gov',
      timestamp: '3 hours ago',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'info',
      title: 'Scheduled Scan Complete',
      description: 'Weekly scan completed - 2 new findings',
      timestamp: '6 hours ago',
      priority: 'low'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'threat':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'success':
        return <Shield className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <Bell className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string, priority: string) => {
    if (priority === 'high') {
      return 'border-l-red-500 bg-red-50';
    }
    
    switch (type) {
      case 'threat':
        return 'border-l-red-500 bg-red-50';
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Protection Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-blue-600" />
          Live Monitoring
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <div>
              <div className="font-semibold text-green-900">Active Protection</div>
              <div className="text-sm text-green-700">247 sources monitored</div>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <div className="text-sm text-gray-600">Protection Score</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Active Threats</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-600" />
              Recent Alerts
            </h3>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
              1 High Priority
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 pl-4 py-3 ${getAlertColor(alert.type, alert.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {alert.title}
                        {alert.priority === 'high' && (
                          <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            HIGH
                          </span>
                        )}
                      </h4>
                      <p className="text-gray-700 text-sm mt-1">{alert.description}</p>
                      <p className="text-gray-500 text-xs mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium">
              View All Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
            Request Erasure
          </button>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
            Schedule Deep Scan
          </button>
          
          <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors">
            View Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default OngoingMonitoring;