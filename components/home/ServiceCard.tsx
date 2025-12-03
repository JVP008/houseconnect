'use client';

interface ServiceCardProps {
    name: string;
    icon: string;
    color: string;
    onClick: (name: string) => void;
}

export default function ServiceCard({ name, icon, color, onClick }: ServiceCardProps) {
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
        <div onClick={() => onClick(name)} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer text-center card-hover">
            <div className={`w-16 h-16 ${styles.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`fas ${icon} text-2xl ${styles.text}`}></i>
            </div>
            <h3 className="font-semibold">{name}</h3>
        </div>
    );
}
