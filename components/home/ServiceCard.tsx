'use client';

import { memo } from 'react';

interface ServiceCardProps {
    name: string;
    icon: string;
    color: string;
    onClick: (name: string) => void;
}

const ServiceCard = memo(({ name, icon, color, onClick }: ServiceCardProps) => {
    // Map color names to Tailwind classes for bg and text
    const colorMap: Record<string, { bg: string, text: string }> = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
        green: { bg: 'bg-green-100', text: 'text-green-600' },
        cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
        pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
        emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    };

    const styles = colorMap[color] || colorMap.blue;

    return (
        <div onClick={() => onClick(name)} className="bg-white p-6 border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#000] transition-all cursor-pointer text-center group">
            <div className={`w-20 h-20 ${styles.bg} border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_#000] group-hover:scale-110 transition-transform`}>
                <i className={`fas ${icon} text-3xl text-black`}></i>
            </div>
            <h3 className="font-black text-xl uppercase tracking-wide">{name}</h3>
        </div>
    );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
