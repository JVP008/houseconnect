'use client';

import { useRouter } from 'next/navigation';
import ServiceCard from './ServiceCard';

export default function Services() {
    const router = useRouter();

    const handleServiceClick = (service: string) => {
        // Navigate to post-job with service pre-selected (can be done via query param)
        router.push(`/post-job?service=${service}`);
    };

    const services = [
        { name: 'Plumbing', icon: 'fa-wrench', color: 'blue' },
        { name: 'Electrical', icon: 'fa-bolt', color: 'yellow' },
        { name: 'Cleaning', icon: 'fa-broom', color: 'green' },
        { name: 'HVAC', icon: 'fa-fan', color: 'cyan' },
        { name: 'Painting', icon: 'fa-paint-roller', color: 'pink' },
        { name: 'Landscaping', icon: 'fa-leaf', color: 'emerald' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                {services.map((s) => (
                    <ServiceCard
                        key={s.name}
                        name={s.name}
                        icon={s.icon}
                        color={s.color}
                        onClick={handleServiceClick}
                    />
                ))}
            </div>
        </div>
    );
}
