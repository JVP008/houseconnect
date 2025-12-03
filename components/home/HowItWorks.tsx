'use client';

export default function HowItWorks() {
    return (
        <div className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                        <h3 className="font-semibold mb-2">Describe Your Job</h3>
                        <p className="text-gray-600 text-sm">Tell us what you need done. Our AI understands complex requests.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                        <h3 className="font-semibold mb-2">AI Matches Pros</h3>
                        <p className="text-gray-600 text-sm">Get matched with top-rated contractors based on skills, reviews & availability.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                        <h3 className="font-semibold mb-2">Schedule & Book</h3>
                        <p className="text-gray-600 text-sm">Pick a time that works for you. Instant confirmation.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                        <h3 className="font-semibold mb-2">Pay Securely</h3>
                        <p className="text-gray-600 text-sm">Payment held safely until job is complete to your satisfaction.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
