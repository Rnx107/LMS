import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Branding */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-600">LMS-Pro</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering teachers and students with the world's most 
              intuitive learning management system. Built for the future of education.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition">All Courses</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Teacher Dashboard</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Student Portal</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2026 LMS-Pro Inc. All rights reserved.
          </p>
          
          {/* Social Icons Placeholder */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="w-5 h-5 bg-gray-200 rounded-full"></span>
            <span className="w-5 h-5 bg-gray-200 rounded-full"></span>
            <span className="w-5 h-5 bg-gray-200 rounded-full"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;