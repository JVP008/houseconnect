'use client';

import { useRouter } from 'next/navigation';
import ServiceCard from './ServiceCard';

export default function Services() {
    const router = useRouter();

    const handleServiceClick = (service: string) => {
        // Navigate to contractors list with service filter
        router.push(`/contractors?service=${service.toLowerCase()}`);
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
            <h2 className="text-4xl font-black text-center mb-12 uppercase tracking-wide">Our Services</h2>
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
