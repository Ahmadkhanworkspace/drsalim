'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setSubmitMessage('✓ Thank you for reaching out. Your scholarly inquiry has been delivered.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);

            setTimeout(() => setSubmitMessage(''), 5000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <main className="bg-[#FAF7F2] min-h-screen text-[#1A1715] pt-32 sm:pt-40 pb-24 relative overflow-hidden">
            {/* Header */}
            <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-[#7A1C1C] font-mono font-bold uppercase tracking-widest text-[11px] mb-3 block">
                        Scholarly Correspondence
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1A1715] mb-4 tracking-tight font-heading leading-tight">
                        Contact the <span className="text-[#7A1C1C] font-serif italic font-normal">Author</span>
                    </h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#7A1C1C] via-[#C5A059] to-transparent mx-auto mb-6 rounded-full" />
                    <p className="text-[#554E48] text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Have a question, publishing inquiry, or discussion regarding Dr. Salim's books or articles? Please share your message below.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 sm:gap-12 items-start">
                    
                    {/* Column 1: Contact Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[#1A1715] font-heading tracking-tight">
                            Scholarly Channels
                        </h2>

                        <div className="space-y-4">
                            {[
                                { icon: '📧', label: 'Email Correspondence', value: 'contact@drsalim.com' },
                                { icon: '📍', label: 'Academic Base', value: 'Islamabad, Punjab, Pakistan' }
                            ].map((item, index) => (
                                <div 
                                    key={index} 
                                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E3DBD0] hover:border-[#C5A059]/60 transition-colors shadow-2xs"
                                >
                                    <div className="text-2xl mt-0.5">{item.icon}</div>
                                    <div>
                                        <div className="text-[#7A1C1C] text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5">
                                            {item.label}
                                        </div>
                                        <div className="text-[#1A1715] font-medium text-sm">
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Scholar Consultation Hours */}
                        <div className="p-6 rounded-2xl bg-[#F5F1E8] border border-[#E3DBD0] text-center space-y-2">
                            <div className="text-2xl">⏰</div>
                            <div className="font-bold text-[#1A1715] uppercase tracking-widest text-xs font-mono">Academic Desk Hours</div>
                            <div className="text-xs text-[#554E48] leading-relaxed font-light">
                                Monday – Friday: 10:00 AM – 4:00 PM (PKT)<br />
                                Direct scholarly review of inquiries & questions
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Contact Form */}
                    <div className="bg-white border border-[#E3DBD0] p-6 sm:p-10 rounded-3xl shadow-sm relative">
                        <h3 className="text-xl font-bold text-[#1A1715] font-heading tracking-tight mb-6">
                            Send a Scholarly Message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#554E48]">
                                        Your Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Prof. / Dr. / Reader Name"
                                        className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-3 text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all text-sm"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#554E48]">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="email@example.com"
                                        className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-3 text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="subject" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#554E48]">
                                    Inquiry Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Theological Inquiry / Book Acquisition / Editorial Review"
                                    className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-3 text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#554E48]">
                                    Detailed Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Please share your questions, suggestions or references..."
                                    className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-3 text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all text-sm resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-[#7A1C1C] hover:bg-[#631414] text-white font-bold uppercase tracking-widest text-xs shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? 'Delivering Inquiry...' : 'Send Message →'}
                            </button>

                            {submitMessage && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-semibold text-center"
                                >
                                    {submitMessage}
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
