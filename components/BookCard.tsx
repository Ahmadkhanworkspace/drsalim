import { Book } from '@/data/books';
import Image from 'next/image';

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    return (
        <div className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
        }}>
            {/* Book Cover */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '350px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: 'var(--spacing-md)',
                background: 'linear-gradient(135deg, #2d5f8d 0%, #5a9bd4 100%)'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    color: 'white',
                    transition: 'transform var(--transition-normal)'
                }} className="book-cover-placeholder">
                    📚
                </div>
            </div>

            {/* Book Info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-text-primary)'
                }}>
                    {book.title}
                </h3>

                <p style={{
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-md)',
                    lineHeight: 1.7,
                    flex: 1
                }}>
                    {book.description}
                </p>

                {/* Amazon Link */}
                <a
                    href={book.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: 'auto'
                    }}
                >
                    Download on Amazon
                </a>
            </div>
        </div>
    );
}
