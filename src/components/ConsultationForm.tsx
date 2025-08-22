import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, AlertCircle, FileText, ArrowRight, CheckCircle } from 'lucide-react';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
  breachDetails: {
    incidentType: string;
    dateSuspected: string;
    affectedAccounts: string[];
    description: string;
  };
  impactAssessment: {
    financialImpact: string;
    identityTheft: boolean;
    creditImpact: boolean;
    emotionalImpact: string;
  };
  previousActions: {
    reportedToPolice: boolean;
    contactedBanks: boolean;
    changedPasswords: boolean;
    frozenCredit: boolean;
    otherActions: string;
  };
}

const ConsultationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    breachDetails: {
      incidentType: '',
      dateSuspected: '',
      affectedAccounts: [],
      description: ''
    },
    impactAssessment: {
      financialImpact: '',
      identityTheft: false,
      creditImpact: false,
      emotionalImpact: ''
    },
    previousActions: {
      reportedToPolice: false,
      contactedBanks: false,
      changedPasswords: false,
      frozenCredit: false,
      otherActions: ''
    }
  });

  const steps = [
    { number: 1, title: 'Personal Information', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Breach Details', icon: <AlertCircle className="w-5 h-5" /> },
    { number: 3, title: 'Impact Assessment', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Previous Actions', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const incidentTypes = [
    'Data breach notification received',
    'Unauthorized financial transactions',
    'Identity theft discovered',
    'Suspicious online activity',
    'Personal information found online',
    'Dark web monitoring alert',
    'Other'
  ];

  const accountTypes = [
    'Bank accounts',
    'Credit cards',
    'Email accounts',
    'Social media',
    'Online shopping',
    'Government accounts',
    'Healthcare portals',
    'Other'
  ];

  const updateFormData = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAccountTypeChange = (accountType: string, checked: boolean) => {
    const currentAccounts = formData.breachDetails.affectedAccounts;
    if (checked) {
      updateFormData('breachDetails', 'affectedAccounts', [...currentAccounts, accountType]);
    } else {
      updateFormData('breachDetails', 'affectedAccounts', currentAccounts.filter(acc => acc !== accountType));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('Consultation request submitted successfully! Our team will contact you within 24 hours.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultation Intake</h1>
        <p className="text-gray-600 text-lg">Help us understand your situation so we can provide the best protection</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.icon}
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 rounded ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => updateFormData('personalInfo', 'firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => updateFormData('personalInfo', 'lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => updateFormData('personalInfo', 'dateOfBirth', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Breach Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Breach Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type of Incident</label>
              <select
                value={formData.breachDetails.incidentType}
                onChange={(e) => updateFormData('breachDetails', 'incidentType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select incident type</option>
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">When did you first suspect the breach?</label>
              <input
                type="date"
                value={formData.breachDetails.dateSuspected}
                onChange={(e) => updateFormData('breachDetails', 'dateSuspected', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Which types of accounts may be affected?</label>
              <div className="grid grid-cols-2 gap-3">
                {accountTypes.map((accountType) => (
                  <label key={accountType} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.breachDetails.affectedAccounts.includes(accountType)}
                      onChange={(e) => handleAccountTypeChange(accountType, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{accountType}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
              <textarea
                value={formData.breachDetails.description}
                onChange={(e) => updateFormData('breachDetails', 'description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Please describe what happened, any suspicious activities you've noticed, and any other relevant details..."
              ></textarea>
            </div>
          </div>
        )}

        {/* Step 3: Impact Assessment */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Impact Assessment</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Financial Impact</label>
              <select
                value={formData.impactAssessment.financialImpact}
                onChange={(e) => updateFormData('impactAssessment', 'financialImpact', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select financial impact</option>
                <option value="none">No financial loss detected</option>
                <option value="under-500">Under $500</option>
                <option value="500-2000">$500 - $2,000</option>
                <option value="2000-10000">$2,000 - $10,000</option>
                <option value="over-10000">Over $10,000</option>
                <option value="unknown">Unknown at this time</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Have you experienced any of the following?</h3>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.impactAssessment.identityTheft}
                  onChange={(e) => updateFormData('impactAssessment', 'identityTheft', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Identity theft (accounts opened in your name)</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.impactAssessment.creditImpact}
                  onChange={(e) => updateFormData('impactAssessment', 'creditImpact', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Impact to credit score or credit report</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emotional Impact Level</label>
              <select
                value={formData.impactAssessment.emotionalImpact}
                onChange={(e) => updateFormData('impactAssessment', 'emotionalImpact', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select impact level</option>
                <option value="minimal">Minimal - Minor concern</option>
                <option value="moderate">Moderate - Some anxiety and stress</option>
                <option value="significant">Significant - High stress and worry</option>
                <option value="severe">Severe - Major life disruption</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Previous Actions */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Previous Actions Taken</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">What steps have you already taken?</h3>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.previousActions.reportedToPolice}
                  onChange={(e) => updateFormData('previousActions', 'reportedToPolice', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Reported to police or law enforcement</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.previousActions.contactedBanks}
                  onChange={(e) => updateFormData('previousActions', 'contactedBanks', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Contacted banks and financial institutions</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.previousActions.changedPasswords}
                  onChange={(e) => updateFormData('previousActions', 'changedPasswords', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Changed passwords on affected accounts</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.previousActions.frozenCredit}
                  onChange={(e) => updateFormData('previousActions', 'frozenCredit', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Placed credit freeze with credit bureaus</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Actions Taken</label>
              <textarea
                value={formData.previousActions.otherActions}
                onChange={(e) => updateFormData('previousActions', 'otherActions', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Describe any other steps you've taken to address this situation..."
              ></textarea>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous</span>
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submitForm}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              <span>Submit Consultation</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;