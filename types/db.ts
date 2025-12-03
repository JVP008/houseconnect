export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    name: string
                    email: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    created_at?: string
                }
            }
            contractors: {
                Row: {
                    id: number
                    name: string
                    service: string
                    rating: number
                    reviews: number
                    price: string | null
                    image: string | null
                    available: boolean
                    verified: boolean
                    location: string | null
                    response_time: string | null
                    completed_jobs: number
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    service: string
                    rating?: number
                    reviews?: number
                    price?: string | null
                    image?: string | null
                    available?: boolean
                    verified?: boolean
                    location?: string | null
                    response_time?: string | null
                    completed_jobs?: number
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    service?: string
                    rating?: number
                    reviews?: number
                    price?: string | null
                    image?: string | null
                    available?: boolean
                    verified?: boolean
                    location?: string | null
                    response_time?: string | null
                    completed_jobs?: number
                    description?: string | null
                    created_at?: string
                }
            }
            jobs: {
                Row: {
                    id: string
                    user_id: string
                    category: string
                    description: string
                    location: string
                    urgency: string
                    budget_min: number | null
                    budget_max: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    category: string
                    description: string
                    location: string
                    urgency: string
                    budget_min?: number | null
                    budget_max?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    category?: string
                    description?: string
                    location?: string
                    urgency?: string
                    budget_min?: number | null
                    budget_max?: number | null
                    created_at?: string
                }
            }
            bookings: {
                Row: {
                    id: string
                    user_id: string
                    contractor_id: number | null
                    date: string
                    time: string
                    notes: string | null
                    status: string | null
                    price: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    contractor_id?: number | null
                    date: string
                    time: string
                    notes?: string | null
                    status?: string | null
                    price?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    contractor_id?: number | null
                    date?: string
                    time?: string
                    notes?: string | null
                    status?: string | null
                    price?: number | null
                    created_at?: string
                }
            }
            disputes: {
                Row: {
                    id: string
                    user_id: string
                    booking_id: string | null
                    type: string
                    description: string
                    status: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    booking_id?: string | null
                    type: string
                    description: string
                    status?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    booking_id?: string | null
                    type?: string
                    description?: string
                    status?: string | null
                    created_at?: string
                }
            }
        }
    }
}
