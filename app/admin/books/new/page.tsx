'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBook } from '@/app/lib/actions';
import Link from 'next/link';

export default function NewBookPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        amazonLink: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await createBook(formData);
            if (res.success) {
                alert('Book created successfully!');
                router.push('/admin/books');
                router.refresh();
            } else {
                alert('Failed to create book: ' + (res.error || 'Unknown error'));
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem',
                gap: '1rem'
            }}>
                <Link href="/admin/books" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
                    ←
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                    Add New Book
                </h1>
            </div>

            <form onSubmit={handleSubmit} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>
                        Book Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>
                        Description
                    </label>
                    <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '1rem',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>
                            Amazon Link
                        </label>
                        <input
                            type="url"
                            name="amazonLink"
                            required
                            value={formData.amazonLink}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSaving}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        cursor: isSaving ? 'not-allowed' : 'pointer',
                        opacity: isSaving ? 0.7 : 1,
                        transition: 'opacity 0.2s'
                    }}
                >
                    {isSaving ? 'Creating Book...' : 'Create Book'}
                </button>
            </form>
        </div>
    );
}
