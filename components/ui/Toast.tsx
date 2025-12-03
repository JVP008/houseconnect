'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
        message: '',
        type: 'success',
        visible: false,
    });

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        setToast({ message, type, visible: true });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast.visible && (
                <div className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg border-3 border-black shadow-[4px_4px_0px_0px_#000] z-50 flex items-center text-black font-bold animate-bounce-in ${toast.type === 'error' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                    <i className={`fas ${toast.type === 'error' ? 'fa-exclamation-circle text-red-600' : 'fa-check-circle text-green-600'} mr-3 text-2xl`}></i>
                    <span className="uppercase tracking-wide">{toast.message}</span>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
