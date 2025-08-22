import React, { useState } from 'react';
import { Search, Filter, Download, Globe, Database, Shield } from 'lucide-react';

interface ScanResult {
  id: string;
  source: string;
  type: 'data_broker' | 'public_web' | 'dark_web';
  status: 'found' | 'removed' | 'pending';
  exposedData: string[];
  lastScanned: string;
  riskLevel: 'high' | 'medium' | 'low';
}

const DataTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const scanResults: ScanResult[] = [
    {
      id: '1',
      source: 'PeopleDataHub.com',
      type: 'data_broker',
      status: 'removed',
      exposedData: ['Name', 'Address', 'Phone', 'Email'],
      lastScanned: '2024-01-15 10:30 AM',
      riskLevel: 'high'
    },
    {
      id: '2',
      source: 'InfoTracker.net',
      type: 'data_broker',
      status: 'pending',
      exposedData: ['Name', 'Age', 'Relatives'],
      lastScanned: '2024-01-15 09:15 AM',
      riskLevel: 'medium'
    },
    {
      id: '3',
      source: 'PublicRecords.gov',
      type: 'public_web',
      status: 'found',
      exposedData: ['Name', 'Address', 'Phone'],
      lastScanned: '2024-01-15 08:45 AM',
      riskLevel: 'high'
    },
    {
      id: '4',
      source: 'DataLeak_2024.onion',
      type: 'dark_web',
      status: 'found',
      exposedData: ['Email', 'Password Hash', 'Credit Card'],
      lastScanned: '2024-01-14 11:20 PM',
      riskLevel: 'high'
    }
  ];

  const filteredResults = scanResults.filter(result => {
    const matchesSearch = result.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.exposedData.some(data => data.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
    const matchesType = typeFilter === 'all' || result.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'removed': return 'bg-green-100 text-green-800';
      case 'found': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'data_broker': return <Database className="w-4 h-4" />;
      case 'public_web': return <Globe className="w-4 h-4" />;
      case 'dark_web': return <Shield className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Data Tracker</h3>
            <p className="text-gray-600 mt-1">Monitor scan progress and compromised data findings</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sources or data types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
            
            {/* Filters */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="found">Found</option>
              <option value="pending">Pending</option>
              <option value="removed">Removed</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Sources</option>
              <option value="data_broker">Data Brokers</option>
              <option value="public_web">Public Web</option>
              <option value="dark_web">Dark Web</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scan Progress */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Current Scan Progress</span>
          <span className="text-sm text-gray-600">73% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '73%' }}></div>
        </div>
        <p className="text-xs text-gray-600 mt-2">Scanning 247 data brokers and public databases...</p>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exposed Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Scanned</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{result.source}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(result.type)}
                    <span className="text-sm text-gray-900 capitalize">{result.type.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(result.status)}`}>
                    {result.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {result.exposedData.map((data, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {data}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-semibold ${getRiskColor(result.riskLevel)} capitalize`}>
                    {result.riskLevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {result.lastScanned}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredResults.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No results found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTracker;