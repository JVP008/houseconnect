import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white text-black border-t-4 border-black pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-yellow-300 border-3 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                                <i className="fas fa-home text-black text-lg"></i>
                            </div>
                            <span className="text-2xl font-black tracking-tight uppercase">HomeConnect</span>
                        </div>
                        <p className="text-black font-medium mb-6">
                            Connecting homeowners with trusted professionals for all their home improvement needs.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-blue-400 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] transition-all">
                                <i className="fab fa-twitter text-black"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-blue-400 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] transition-all">
                                <i className="fab fa-facebook-f text-black"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-blue-400 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] transition-all">
                                <i className="fab fa-instagram text-black"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6 uppercase tracking-wide">Services</h4>
                        <ul className="space-y-4 text-black font-bold">
                            <li><Link href="/contractors?service=plumbing" className="hover:underline decoration-2 decoration-black underline-offset-2 transition">Plumbing</Link></li>
                            <li><Link href="/contractors?service=electrical" className="hover:underline decoration-2 decoration-black underline-offset-2 transition">Electrical</Link></li>
                            <li><Link href="/contractors?service=cleaning" className="hover:underline decoration-2 decoration-black underline-offset-2 transition">Cleaning</Link></li>
                            <li><Link href="/contractors?service=hvac" className="hover:underline decoration-2 decoration-black underline-offset-2 transition">HVAC</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6 uppercase tracking-wide">Company</h4>
                        <ul className="space-y-4 text-black font-bold">
                            <li><Link href="/about" className="hover:underline decoration-2 decoration-black underline-offset-2 transition">About Us</Link></li>
                            <li><Link href="/careers" className="hover:underline decoration-2 decoration-black underline-offset-2 transition">Careers</Link></li>
                            <li><Link href="/privacy" className="hover:underline decoration-2 decoration-black underline-offset-2 transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:underline decoration-2 decoration-black underline-offset-2 transition">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6 uppercase tracking-wide">Contact</h4>
                        <ul className="space-y-4 text-black font-medium">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt mt-1 text-xl"></i>
                                <span>123 Home Street,<br />San Francisco, CA 94105</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-phone text-xl"></i>
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-envelope text-xl"></i>
                                <span>support@homeconnect.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t-2 border-black border-dashed pt-8 text-center text-black font-bold">
                    <p>&copy; {new Date().getFullYear()} HomeConnect Pro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
