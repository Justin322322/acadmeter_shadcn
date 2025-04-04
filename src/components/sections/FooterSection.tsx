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
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#case-studies" className="text-sm text-slate-400 hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About</a></li>
              <li><a href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/careers" className="text-sm text-slate-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/docs" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/help" className="text-sm text-slate-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/support" className="text-sm text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms</a></li>
              <li><a href="/security" className="text-sm text-slate-400 hover:text-white transition-colors">Security</a></li>
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
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
          </div>
        </div>
      </div>
    </footer>
  )
}
