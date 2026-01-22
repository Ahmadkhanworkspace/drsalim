'use client';

import { deleteBook } from '@/app/lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BookActions({ id }: { id: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this book?')) return;

        setIsDeleting(true);
        try {
            const res = await deleteBook(id);
            if (res.success) {
                router.refresh();
            } else {
                alert('Failed to delete book');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting book');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end'
        }}>
            <Link
                href={`/admin/books/${id}`}
                style={{
                    padding: '0.5rem 1rem',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#475569',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s',
                    display: 'inline-block',
                    textDecoration: 'none'
                }}
            >
                Edit
            </Link>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                    padding: '0.5rem 1rem',
                    background: '#fef2f2',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s',
                    opacity: isDeleting ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ef4444';
                    e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fef2f2';
                    e.currentTarget.style.color = '#ef4444';
                }}
            >
                {isDeleting ? '...' : 'Delete'}
            </button>
        </div>
    );
}
