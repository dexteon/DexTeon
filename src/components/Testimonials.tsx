import React from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  recoveryDetails: {
    dataRemoved: number;
    timeToSafety: string;
    threatLevel: string;
  };
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'John Mitchell',
      role: 'Identity Theft Victim',
      content: "After my personal data was compromised in a major breach, I felt vulnerable and lost. BreachHound not only erased my data but also provided the support I needed to feel secure again. They turned my digital nightmare into a manageable situation.",
      rating: 5,
      avatar: 'https://images.pexels.com/photos/3767398/pexels-photo-3767398.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      recoveryDetails: {
        dataRemoved: 127,
        timeToSafety: '3 weeks',
        threatLevel: 'High'
      }
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'Small Business Owner',
      content: "BreachHound's proactive monitoring caught a data broker selling my information before it could cause serious damage. Their team was professional, thorough, and most importantly, effective. I now have peace of mind.",
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      recoveryDetails: {
        dataRemoved: 89,
        timeToSafety: '2 weeks',
        threatLevel: 'Medium'
      }
    },
    {
      id: '3',
      name: 'Marcus Johnson',
      role: 'Corporate Executive',
      content: "The comprehensive approach BreachHound takes is impressive. They didn't just remove my data from obvious sources - they found exposures on the dark web I never would have discovered. The legal recovery support was invaluable.",
      rating: 5,
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      recoveryDetails: {
        dataRemoved: 203,
        timeToSafety: '5 weeks',
        threatLevel: 'Critical'
      }
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Success Stories</h3>
        <p className="text-gray-600 mt-1">Real recoveries from real people</p>
      </div>
      
      <div className="p-6">
        {/* Main Testimonial */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{current.name}</h4>
                <p className="text-sm text-gray-600">{current.role}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
            </div>
          </div>
          
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
            <p className="text-gray-700 pl-6 italic leading-relaxed">"{current.content}"</p>
          </div>
        </div>

        {/* Recovery Details */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6">
          <h5 className="font-semibold text-gray-900 mb-3">{current.name}'s Journey to Security</h5>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{current.recoveryDetails.dataRemoved}</div>
              <div className="text-xs text-gray-600">Records Removed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{current.recoveryDetails.timeToSafety}</div>
              <div className="text-xs text-gray-600">Time to Safety</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${
                current.recoveryDetails.threatLevel === 'Critical' ? 'text-red-600' :
                current.recoveryDetails.threatLevel === 'High' ? 'text-orange-600' :
                'text-yellow-600'
              }`}>
                {current.recoveryDetails.threatLevel}
              </div>
              <div className="text-xs text-gray-600">Initial Threat</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevTestimonial}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Ready to start your journey to digital security?</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Start Your Protection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;