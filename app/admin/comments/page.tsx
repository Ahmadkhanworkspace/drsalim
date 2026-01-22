'use client';

import { useState, useEffect } from 'react';
import { getComments, updateComment, deleteComment, importComments } from '@/app/lib/actions';

interface Comment {
    id: string;
    articleTitle: string;
    author: string;
    email: string;
    content: string;
    approved: boolean;
    createdAt: string;
}

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshComments = async () => {
        const data = await getComments();
        // Map database comments to UI interface
        const mappedData: Comment[] = data?.map((c: any) => ({
            id: c.id,
            articleTitle: c.articleTitle || 'Unknown Article',
            author: c.author,
            email: c.email,
            content: c.content,
            approved: c.approved,
            createdAt: new Date(c.createdAt).toLocaleDateString()
        })) || [];
        setComments(mappedData);
        setLoading(false);
    };

    useEffect(() => {
        refreshComments();
    }, []);

    const [showImporter, setShowImporter] = useState(false);
    const [importFile, setImportFile] = useState<File | null>(null);
    const [importing, setImporting] = useState(false);

    const pendingCount = comments.filter(c => !c.approved).length;
    const approvedCount = comments.filter(c => c.approved).length;

    const handleApprove = async (id: string) => {
        try {
            const res = await updateComment(id, { approved: true });
            if (res.success) refreshComments();
            else alert('Failed to approve comment');
        } catch (e) {
            alert('Error approving comment');
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;
        try {
            const res = await deleteComment(id);
            if (res.success) refreshComments();
            else alert('Failed to delete comment');
        } catch (e) {
            alert('Error deleting comment');
        }
    };

    // Robust CSV Parser that handles quoted fields and newlines
    const parseCSV = (text: string) => {
        const rows: string[][] = [];
        let currentRow: string[] = [];
        let currentField = '';
        let insideQuote = false;

        // Normalize line endings
        const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        for (let i = 0; i < cleanText.length; i++) {
            const char = cleanText[i];
            const nextChar = cleanText[i + 1];

            if (char === '"') {
                if (insideQuote && nextChar === '"') {
                    // Escaped quote
                    currentField += '"';
                    i++; // Skip next quote
                } else {
                    // Toggle quote state
                    insideQuote = !insideQuote;
                }
            } else if (char === ',' && !insideQuote) {
                // End of field
                currentRow.push(currentField);
                currentField = '';
            } else if (char === '\n' && !insideQuote) {
                // End of row
                currentRow.push(currentField);
                if (currentRow.length > 0) rows.push(currentRow);
                currentRow = [];
                currentField = '';
            } else {
                currentField += char;
            }
        }

        // Push last field/row if exists
        if (currentField || currentRow.length > 0) {
            currentRow.push(currentField);
            rows.push(currentRow);
        }

        return rows;
    };

    const handleImport = async () => {
        if (!importFile) return;

        setImporting(true);

        try {
            const text = await importFile.text();
            const rows = parseCSV(text);

            if (rows.length === 0) {
                alert('File is empty');
                setImporting(false);
                return;
            }

            const headers = rows[0].map(h => h.trim());

            // Find column indices
            const postTitleIdx = headers.findIndex(h => h === 'comment_post_title');
            const authorIdx = headers.findIndex(h => h === 'comment_author');
            const emailIdx = headers.findIndex(h => h === 'comment_author_email');
            const contentIdx = headers.findIndex(h => h === 'comment_content');
            const approvedIdx = headers.findIndex(h => h === 'comment_approved');
            const dateIdx = headers.findIndex(h => h === 'comment_date');

            if (postTitleIdx === -1 || authorIdx === -1 || contentIdx === -1) {
                alert('Invalid CSV format. Missing required columns:\ncomment_post_title, comment_author, comment_content');
                setImporting(false);
                return;
            }

            // Parse comments (skip header row)
            const parsedData: any[] = [];
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                // Skip empty lines that might have been parsed as empty rows
                if (row.length <= 1 && !row[0]) continue;

                // Ensure row has enough columns, fill with empty if short
                // (Optional: strict check, but loose is better for dirty data)

                parsedData.push({
                    articleTitle: row[postTitleIdx] || '',
                    author: row[authorIdx] || 'Anonymous',
                    email: row[emailIdx] || '',
                    content: row[contentIdx] || '',
                    approved: row[approvedIdx] === '1',
                    createdAt: row[dateIdx] || new Date().toISOString()
                });
            }

            const res = await importComments(parsedData);

            if (res.success) {
                // @ts-ignore
                alert(`Import Complete!\nImported: ${res.imported}\nSkipped (No Article Match): ${res.skipped}\nFailed: ${res.failed}`);
                refreshComments();
                setShowImporter(false);
                setImportFile(null);
            } else {
                // @ts-ignore
                alert('Import failed: ' + res.error);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during import.');
        } finally {
            setImporting(false);
        }
    };

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 16px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {/* Header */}
            <div style={{
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '1rem'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: '0.5rem',
                            letterSpacing: '-0.5px'
                        }}>
                            Comments Moderation
                        </h1>
                        <p style={{
                            color: '#64748b',
                            fontSize: '1rem',
                            fontWeight: 500
                        }}>
                            Review and moderate reader comments
                        </p>
                    </div>
                    <button
                        onClick={() => setShowImporter(!showImporter)}
                        style={{
                            padding: 'var(--spacing-md) var(--spacing-xl)',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            background: showImporter ? '#e2e8f0' : '#f8fafc',
                            color: showImporter ? '#475569' : '#0f172a',
                            border: '1px solid #cbd5e1',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {showImporter ? '✕ Close Importer' : '📥 Import CSV'}
                    </button>
                </div>

                {/* Inline Importer */}
                {showImporter && (
                    <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        animation: 'fadeIn 0.2s ease-out'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <label style={{
                                    display: 'block',
                                    fontWeight: 600,
                                    color: '#475569',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    Select WordPress CSV File
                                </label>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '0.5rem',
                                        background: 'white',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                <div style={{
                                    marginTop: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: '#64748b'
                                }}>
                                    Required columns: comment_post_title, comment_author, comment_content
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                minWidth: '200px'
                            }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                                    <input type="checkbox" defaultChecked disabled /> Auto-map to Articles
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                                    <input type="checkbox" defaultChecked disabled /> Import Status
                                </label>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                minHeight: '60px'
                            }}>
                                <button
                                    onClick={handleImport}
                                    disabled={!importFile || importing}
                                    style={{
                                        padding: '0.6rem 1.5rem',
                                        background: importFile && !importing ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : '#cbd5e1',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontWeight: 700,
                                        cursor: importFile && !importing ? 'pointer' : 'not-allowed',
                                        boxShadow: importFile && !importing ? '0 4px 6px rgba(139, 92, 246, 0.25)' : 'none',
                                        transition: 'all 0.2s',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {importing ? 'Importing...' : 'Start Import'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '2px solid #ef4444',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)'
                }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Pending Review
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#ef4444'
                    }}>
                        {pendingCount}
                    </div>
                </div>

                <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #10b981',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Approved
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#10b981'
                    }}>
                        {approvedCount}
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-lg)'
            }}>
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        style={{
                            padding: 'var(--spacing-xl)',
                            background: 'white',
                            borderRadius: '12px',
                            border: comment.approved ? '1px solid #d1fae5' : '1px solid #fee2e2',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 'var(--spacing-md)',
                            paddingBottom: 'var(--spacing-md)',
                            borderBottom: '1px solid #f1f5f9'
                        }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-md)',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span style={{
                                        color: '#0f172a',
                                        fontWeight: 700,
                                        fontSize: '1.05rem'
                                    }}>
                                        {comment.author}
                                    </span>
                                    <span style={{
                                        padding: '0.3rem 0.8rem',
                                        background: comment.approved ? '#dcfce7' : '#fee2e2',
                                        color: comment.approved ? '#166534' : '#991b1b',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        border: `1px solid ${comment.approved ? '#86efac' : '#fecaca'}`
                                    }}>
                                        {comment.approved ? '✓ Approved' : '○ Pending'}
                                    </span>
                                </div>
                                <div style={{
                                    color: '#64748b',
                                    fontSize: '0.85rem',
                                    fontWeight: 500
                                }}>
                                    {comment.email} • {comment.createdAt}
                                </div>
                                <div style={{
                                    color: '#0ea5e9',
                                    fontSize: '0.9rem',
                                    marginTop: '0.25rem',
                                    fontWeight: 600
                                }}>
                                    On: {comment.articleTitle}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <p style={{
                            color: '#475569',
                            lineHeight: 1.8,
                            marginBottom: 'var(--spacing-lg)',
                            fontSize: '1rem',
                            fontWeight: 500
                        }}>
                            {comment.content}
                        </p>

                        {/* Actions */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)'
                        }}>
                            {!comment.approved && (
                                <button
                                    onClick={() => handleApprove(comment.id)}
                                    style={{
                                        padding: '0.6rem 1.5rem',
                                        background: '#dcfce7',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#166534',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#10b981';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#dcfce7';
                                        e.currentTarget.style.color = '#166534';
                                    }}
                                >
                                    ✓ Approve
                                </button>
                            )}
                            <button
                                onClick={() => handleReject(comment.id)}
                                style={{
                                    padding: '0.6rem 1.5rem',
                                    background: '#fee2e2',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#991b1b',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#ef4444';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fee2e2';
                                    e.currentTarget.style.color = '#991b1b';
                                }}
                            >
                                ✗ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
