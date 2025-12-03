'use client';

export default function HowItWorks() {
    return (
        <div className="bg-white border-t-4 border-b-4 border-black py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-black text-center mb-12 uppercase tracking-wide">How It Works</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-blue-300 border-3 border-black text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-[4px_4px_0px_0px_#000] group-hover:scale-110 transition-transform">1</div>
                        <h3 className="font-bold text-xl mb-2">Describe Your Job</h3>
                        <p className="text-black font-medium">Tell us what you need done. Our AI understands complex requests.</p>
                    </div>
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-yellow-300 border-3 border-black text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-[4px_4px_0px_0px_#000] group-hover:scale-110 transition-transform">2</div>
                        <h3 className="font-bold text-xl mb-2">AI Matches Pros</h3>
                        <p className="text-black font-medium">Get matched with top-rated contractors based on skills & availability.</p>
                    </div>
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-pink-300 border-3 border-black text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-[4px_4px_0px_0px_#000] group-hover:scale-110 transition-transform">3</div>
                        <h3 className="font-bold text-xl mb-2">Schedule & Book</h3>
                        <p className="text-black font-medium">Pick a time that works for you. Instant confirmation.</p>
                    </div>
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-green-300 border-3 border-black text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-[4px_4px_0px_0px_#000] group-hover:scale-110 transition-transform">4</div>
                        <h3 className="font-bold text-xl mb-2">Pay Securely</h3>
                        <p className="text-black font-medium">Payment held safely until job is complete to your satisfaction.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
