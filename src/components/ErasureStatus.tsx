import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, ArrowRight } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  timestamp: string;
  source: string;
  details?: string;
}

const ErasureStatus: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'Data Removal Completed',
      description: 'Personal information successfully removed from PeopleDataHub.com',
      status: 'completed',
      timestamp: '2024-01-15 2:30 PM',
      source: 'PeopleDataHub.com',
      details: 'Removed: Name, Address, Phone, Email'
    },
    {
      id: '2',
      title: 'Removal Request Submitted',
      description: 'Opt-out request sent to InfoTracker.net',
      status: 'in_progress',
      timestamp: '2024-01-15 1:15 PM',
      source: 'InfoTracker.net',
      details: 'Estimated completion: 7-14 business days'
    },
    {
      id: '3',
      title: 'Verification In Progress',
      description: 'Confirming identity with PublicRecords.gov',
      status: 'in_progress',
      timestamp: '2024-01-15 12:45 PM',
      source: 'PublicRecords.gov',
      details: 'Additional verification may be required'
    },
    {
      id: '4',
      title: 'Dark Web Monitoring Active',
      description: 'Continuous monitoring for data leaks on dark web marketplaces',
      status: 'in_progress',
      timestamp: '2024-01-15 9:00 AM',
      source: 'Dark Web Monitoring',
      details: 'Real-time alerts enabled'
    },
    {
      id: '5',
      title: 'Scan Completed',
      description: 'Deep scan identified 15 data brokers with your information',
      status: 'completed',
      timestamp: '2024-01-15 8:30 AM',
      source: 'BreachHound Scanner',
      details: 'Found on 15 of 247 scanned sources'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in_progress':
        return 'border-blue-200 bg-blue-50';
      case 'pending':
        return 'border-yellow-200 bg-yellow-50';
      case 'failed':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Erasure Status</h3>
            <p className="text-gray-600 mt-1">Track data removal progress across all sources</p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Completed (1)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">In Progress (3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Pending (0)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600">11</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline line */}
              {index < timelineEvents.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}
              
              <div className={`relative flex items-start space-x-4 p-4 rounded-lg border ${getStatusColor(event.status)}`}>
                <div className="flex-shrink-0">
                  {getStatusIcon(event.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-gray-900">{event.title}</h4>
                    <span className="text-sm text-gray-500">{event.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-700 mt-1">{event.description}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Source:</span>
                      <span className="text-sm text-gray-900">{event.source}</span>
                    </div>
                    
                    {event.details && (
                      <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {event.details && (
                    <div className="mt-2 p-3 bg-white/50 rounded border border-gray-200">
                      <p className="text-sm text-gray-600">{event.details}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Request Manual Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErasureStatus;