export default function Footer() {
  return (
    <footer className="bg-black py-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-bold text-black text-sm">
                A
              </div>
              <span className="text-xl font-bold">AniFlix</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your destination for unlimited anime streaming.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Browse</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/anime" className="hover:text-white transition-colors">All Anime</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Popular</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Genres</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 border-t border-white/10">
          <p>&copy; 2024 AniFlix. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors">Twitter</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Instagram</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}