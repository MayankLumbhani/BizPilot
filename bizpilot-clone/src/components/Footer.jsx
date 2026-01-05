import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-lg mb-4">
            <div className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
            </div>
            BizPilot
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Empowering businesses to reach new heights through simplified management and powerful insights.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#" className="hover:text-primary">Features</a></li>
            <li><a href="#" className="hover:text-primary">Pricing</a></li>
            <li><a href="#" className="hover:text-primary">Security</a></li>
            <li><a href="#" className="hover:text-primary">Roadmap</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#" className="hover:text-primary">About Us</a></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
            <li><a href="#" className="hover:text-primary">Blog</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 text-xs text-muted">
        © 2025 BizPilot Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;