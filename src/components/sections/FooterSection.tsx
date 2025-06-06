"use client"

export function FooterSection() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-slate-800">
          {/* Logo and Description */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
            <div className="text-2xl font-bold text-white mb-4">AcadMeter</div>
            <p className="text-slate-400 mb-6 text-sm sm:text-base">
              Empowering educational institutions with smart analytics and management tools.
            </p>
            <div className="space-y-2">
              <a href="/contact" className="block text-sm text-slate-400 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="tel:+1234567890" className="block text-sm text-slate-400 hover:text-white transition-colors">
                +1 (234) 567-890
              </a>
              <a href="mailto:info@acadmeter.com" className="block text-sm text-slate-400 hover:text-white transition-colors">
                info@acadmeter.com
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/case-studies" className="text-sm text-slate-400 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="/testimonials" className="text-sm text-slate-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="/demo" className="text-sm text-slate-400 hover:text-white transition-colors">Request Demo</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About</a></li>
              <li><a href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/careers" className="text-sm text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="/partners" className="text-sm text-slate-400 hover:text-white transition-colors">Partners</a></li>
              <li><a href="/press" className="text-sm text-slate-400 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/docs" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/help" className="text-sm text-slate-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/support" className="text-sm text-slate-400 hover:text-white transition-colors">Support</a></li>
              <li><a href="/webinars" className="text-sm text-slate-400 hover:text-white transition-colors">Webinars</a></li>
              <li><a href="/tutorials" className="text-sm text-slate-400 hover:text-white transition-colors">Tutorials</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms</a></li>
              <li><a href="/security" className="text-sm text-slate-400 hover:text-white transition-colors">Security</a></li>
              <li><a href="/compliance" className="text-sm text-slate-400 hover:text-white transition-colors">Compliance</a></li>
              <li><a href="/accessibility" className="text-sm text-slate-400 hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} AcadMeter. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/acadmeter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="X (formerly Twitter)"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/company/acadmeter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <a
              href="https://github.com/acadmeter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            <a
              href="https://facebook.com/acadmeter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>

            <a
              href="https://instagram.com/acadmeter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Additional Footer Links */}
        <div className="py-4 border-t border-slate-800 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
          <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="/cookies" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          <a href="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</a>
          <a href="/accessibility" className="hover:text-slate-300 transition-colors">Accessibility</a>
          <a href="/legal" className="hover:text-slate-300 transition-colors">Legal</a>
        </div>
      </div>
    </footer>
  )
}