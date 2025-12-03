import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <i className="fas fa-home text-white text-sm"></i>
                            </div>
                            <span className="text-xl font-bold">HomeConnect</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Connecting homeowners with trusted professionals for all their home improvement needs.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Services</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/contractors?service=plumbing" className="hover:text-white transition">Plumbing</Link></li>
                            <li><Link href="/contractors?service=electrical" className="hover:text-white transition">Electrical</Link></li>
                            <li><Link href="/contractors?service=cleaning" className="hover:text-white transition">Cleaning</Link></li>
                            <li><Link href="/contractors?service=hvac" className="hover:text-white transition">HVAC</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt mt-1"></i>
                                <span>123 Home Street,<br />San Francisco, CA 94105</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-phone"></i>
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-envelope"></i>
                                <span>support@homeconnect.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} HomeConnect Pro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
