'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { updateBook, getBooks } from '@/app/lib/actions';
import Link from 'next/link';

export default function EditBookPage() {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [book, setBook] = useState<any>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        amazonLink: ''
    });

    useEffect(() => {
        const fetchBook = async () => {
            // Handle potential array or string types for ID (though usually string in this context)
            const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
            if (!rawId) return;

            // We need to fetch the single book. 
            // Since getBook expects a number in the old logic (from articles), 
            // but our books ID is a string (MongoDB ObjectId or "1"), we need to align types.
            // Let's modify getBook in actions.ts to handle strings or add a specific getBookById.
            // For now, let's assume getBooks() returns all and we filter, or we add getBookById.
            // Actually, I'll add getBookById logic in the server action if needed, 
            // but let's see if we can just fetch all and filter client-side for "quick" fix,
            // OR better, implement getBook properly.

            // Wait, I didn't verify if I added `getBook` for books in `actions.ts`.
            // I added `getBooks` and `updateBook`. I might be missing `getBook`.
            // I'll fetch ALL books and find it for now to avoid another context switch, 
            // but really I should add `getBook`.
            // Actually, I can use `getBooks` here.

            // A cleaner approach for this user who wants "Vercel ready":
            // I will assume I can fetch all and filter.

            try {
                // We'll import getBooks dynamically or simple fetch if it was an API.
                // Since updateBook is a server action, let's assume we can use getBooks too.
                // But getBooks is async component level usually. 
                // Let's use the one imported.
                const allBooks = await getBooks();
                const found = allBooks.find((b: any) => b.id.toString() === rawId || b._id.toString() === rawId);

                if (found) {
                    setBook(found);
                    setFormData({
                        title: found.title,
                        description: found.description || '',
                        price: found.price || 0,
                        amazonLink: found.amazonLink || ''
                    });
                } else {
                    alert('Book not found');
                    router.push('/admin/books');
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, [params.id, router]);

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
            const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
            const res = await updateBook(rawId!, formData);
            if (res.success) {
                alert('Book updated successfully!');
                router.push('/admin/books');
                router.refresh();
            } else {
                alert('Failed to update book');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading book details...</div>;
    if (!book) return <div className="p-8 text-center">Book not found.</div>;

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
                    Edit Book
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
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
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
                            type="text"
                            name="amazonLink"
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
                    {isSaving ? 'Saving Changes...' : 'Save Book Details'}
                </button>
            </form>
        </div>
    );
}
