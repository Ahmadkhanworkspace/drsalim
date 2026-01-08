'use client';

export default function ISBNPage() {
    const books = [
        { id: 1, title: 'Brotherhood', isbn: '978-1-64746-892-3', publisher: 'Amazon', edition: '1st', format: 'Print & Digital', pubDate: '2024-06-15', copyright: '2024' },
        { id: 2, title: 'Divine Providence', isbn: '978-1-59184-567-8', publisher: 'Amazon', edition: '2nd', format: 'Print & Digital', pubDate: '2023-03-20', copyright: '2023' },
        { id: 3, title: 'Spiritual Diseases', isbn: '978-1-73521-094-2', publisher: 'Amazon', edition: '1st', format: 'Print & Digital', pubDate: '2024-01-10', copyright: '2024' },
        { id: 4, title: 'Human Journey', isbn: '978-1-88345-721-6', publisher: 'Amazon', edition: '1st', format: 'Digital Only', pubDate: '2023-09-05', copyright: '2023' },
        { id: 5, title: 'Divine Providence Vol 2', isbn: '978-1-59184-893-5', publisher: 'Amazon', edition: '1st', format: 'Print & Digital', pubDate: '2024-11-12', copyright: '2024' },
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#0F1111', marginBottom: '4px' }}>ISBN & Publishing Info</h1>
                    <p style={{ color: '#565959', fontSize: '0.875rem', margin: 0 }}>Manage ISBN numbers and publishing details</p>
                </div>
                <button style={{ padding: '8px 16px', background: '#FFD814', border: '1px solid #FCD200', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                    + Add ISBN
                </button>
            </div>

            <div style={{ background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F7FAFA', borderBottom: '1px solid #D5D9D9' }}>
                                <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Book Title</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>ISBN</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Publisher</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Edition</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Format</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Pub Date</th>
                                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, idx) => (
                                <tr key={book.id} style={{ borderBottom: idx < books.length - 1 ? '1px solid #E3E6E6' : 'none' }}>
                                    <td style={{ padding: '12px', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111' }}>{book.title}</td>
                                    <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111', fontFamily: 'monospace' }}>{book.isbn}</td>
                                    <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111' }}>{book.publisher}</td>
                                    <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111', textAlign: 'center' }}>{book.edition}</td>
                                    <td style={{ padding: '12px', fontSize: '0.75rem', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            background: book.format.includes('Digital') ? '#D1F4E0' : '#FFF4E5',
                                            color: book.format.includes('Digital') ? '#067D62' : '#FF9900',
                                            borderRadius: '4px',
                                            fontSize: '0.6875rem',
                                            fontWeight: 600
                                        }}>
                                            {book.format}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111', textAlign: 'center' }}>{book.pubDate}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button style={{
                                            padding: '6px 12px',
                                            background: '#fff',
                                            border: '1px solid #D5D9D9',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer'
                                        }}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
