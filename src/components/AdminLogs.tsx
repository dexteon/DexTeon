import React, { useState } from 'react';
import { X, Activity, Database, Shield, Clock, Filter, Search, Download } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  service: string;
  endpoint: string;
  statusCode: number;
  responseTime: number;
  userAgent?: string;
  details: string;
}

interface AdminLogsProps {
  onClose: () => void;
}

const AdminLogs: React.FC<AdminLogsProps> = ({ onClose }) => {
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const logEntries: LogEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:32:15',
      level: 'info',
      service: 'Optery API',
      endpoint: 'GET /v1/members/john-mitchell-uuid',
      statusCode: 200,
      responseTime: 245,
      details: 'Retrieved member profile successfully'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:31:48',
      level: 'success',
      service: 'Optery API',
      endpoint: 'POST /v1/optouts/john-mitchell-uuid',
      statusCode: 200,
      responseTime: 1200,
      details: 'Opt-out request submitted to PeopleDataHub.com'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:30:22',
      level: 'warning',
      service: 'Data Scanner',
      endpoint: 'SCAN /dark-web/breach-databases',
      statusCode: 206,
      responseTime: 5500,
      details: 'Partial scan completed - 2 sources unreachable'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:29:33',
      level: 'error',
      service: 'Optery API',
      endpoint: 'GET /v1/optouts/invalid-uuid/statistics',
      statusCode: 404,
      details: 'Member not found - invalid UUID provided'
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:28:17',
      level: 'info',
      service: 'Authentication',
      endpoint: 'POST /auth/validate-token',
      statusCode: 200,
      responseTime: 89,
      details: 'JWT token validated successfully'
    },
    {
      id: '6',
      timestamp: '2024-01-15 14:27:45',
      level: 'success',
      service: 'Data Removal',
      endpoint: 'VERIFY /removal-confirmation/peopledatahub',
      statusCode: 200,
      responseTime: 2100,
      details: 'Data removal verified - screenshot captured'
    },
    {
      id: '7',
      timestamp: '2024-01-15 14:26:12',
      level: 'warning',
      service: 'Rate Limiter',
      endpoint: 'Multiple API calls from user-session-xyz',
      statusCode: 429,
      responseTime: 50,
      details: 'Rate limit exceeded - 35 requests in 30 seconds'
    },
    {
      id: '8',
      timestamp: '2024-01-15 14:25:33',
      level: 'info',
      service: 'Monitoring',
      endpoint: 'HEALTH /system-status',
      statusCode: 200,
      responseTime: 12,
      details: 'All systems operational - 99.8% uptime'
    }
  ];

  const filteredLogs = logEntries.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesService = filterService === 'all' || log.service === filterService;
    const matchesSearch = searchTerm === '' || 
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesLevel && matchesService && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600';
    if (statusCode >= 300 && statusCode < 400) return 'text-blue-600';
    if (statusCode >= 400 && statusCode < 500) return 'text-yellow-600';
    if (statusCode >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case 'optery api': return <Database className="w-4 h-4" />;
      case 'data scanner': return <Search className="w-4 h-4" />;
      case 'authentication': return <Shield className="w-4 h-4" />;
      case 'monitoring': return <Activity className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const uniqueServices = [...new Set(logEntries.map(log => log.service))];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Admin System Logs</h2>
              <p className="text-sm text-gray-600">Real-time API traffic and system monitoring</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search endpoints or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
              
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Services</option>
                {uniqueServices.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {filteredLogs.length} of {logEntries.length} entries
              </span>
              
              <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-auto max-h-96">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 font-mono">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded border ${getLevelColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getServiceIcon(log.service)}
                      <span className="text-sm text-gray-900">{log.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-700 max-w-xs truncate">
                    {log.endpoint}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${getStatusColor(log.statusCode)}`}>
                      {log.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                    {log.responseTime}ms
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-700 max-w-md truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No log entries found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>System Healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Live Monitoring Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;