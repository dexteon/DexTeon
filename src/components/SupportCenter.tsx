import React from 'react';
import { MessageCircle, FileText, Phone, DollarSign, Scale, BookOpen } from 'lucide-react';

const SupportCenter: React.FC = () => {
  const supportOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat Support',
      description: 'Get instant help from our security experts',
      action: 'Start Chat',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Emergency Hotline',
      description: '24/7 support for urgent security threats',
      action: 'Call Now',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Legal Recovery',
      description: 'Connect with legal experts for identity theft recovery',
      action: 'Get Legal Help',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Financial Recovery',
      description: 'Assistance with fraud monitoring and recovery',
      action: 'Financial Support',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  const resources = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Privacy Guide',
      description: 'Complete guide to protecting your digital privacy'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Knowledge Base',
      description: 'Common questions and detailed explanations'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: 'Community Forum',
      description: 'Connect with other users and share experiences'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Support Center</h3>
        <p className="text-gray-600 mt-1">Get help with recovery and ongoing protection</p>
      </div>
      
      <div className="p-6">
        {/* Progress Update */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Case Update</h4>
              <p className="text-blue-800 text-sm mt-1">
                Your identity theft recovery case #BH-2024-001 is progressing well. 
                Our legal team has successfully disputed 2 fraudulent accounts.
              </p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                View Full Update →
              </button>
            </div>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {supportOptions.map((option, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 p-2 ${option.color} text-white rounded-lg`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{option.title}</h4>
                  <p className="text-gray-600 text-xs mt-1">{option.description}</p>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-2">
                    {option.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resources */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Helpful Resources</h4>
          <div className="space-y-3">
            {resources.map((resource, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="flex-shrink-0 text-blue-600">
                  {resource.icon}
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">{resource.title}</h5>
                  <p className="text-gray-600 text-xs">{resource.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 text-sm mb-2">Emergency Contacts</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>24/7 Hotline:</strong> 1-800-BREACH-HOUND</div>
            <div><strong>Emergency Email:</strong> emergency@breachhound.com</div>
            <div><strong>Legal Team:</strong> legal@breachhound.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;