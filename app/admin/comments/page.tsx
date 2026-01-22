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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-2xl)',
                flexWrap: 'wrap',
                gap: '12px'
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
                    onClick={() => setShowImporter(true)}
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                    }}
                >
                    📥 Import WordPress Comments (CSV)
                </button>
            </div>

            {/* WordPress CSV Importer Modal */}
            {showImporter && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: 'var(--spacing-2xl)',
                        maxWidth: '700px',
                        width: '90%',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: 'var(--spacing-md)',
                            letterSpacing: '-0.5px'
                        }}>
                            Import WordPress Comments from CSV
                        </h2>
                        <p style={{
                            color: '#64748b',
                            marginBottom: 'var(--spacing-xl)',
                            lineHeight: 1.6
                        }}>
                            Upload your WordPress comments CSV export. Comments will be automatically mapped to their respective blog articles using the post title.
                        </p>

                        {/* CSV Format Info */}
                        <div style={{
                            background: '#f0f9ff',
                            border: '1px solid #bae6fd',
                            borderRadius: '12px',
                            padding: 'var(--spacing-lg)',
                            marginBottom: 'var(--spacing-xl)'
                        }}>
                            <h3 style={{
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: '#0369a1',
                                marginBottom: 'var(--spacing-sm)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                📋 Required CSV Columns
                            </h3>
                            <div style={{
                                color: '#075985',
                                fontSize: '0.85rem',
                                lineHeight: 1.8,
                                fontFamily: 'monospace'
                            }}>
                                • comment_post_title - Article title<br />
                                • comment_author - Author name<br />
                                • comment_author_email - Email<br />
                                • comment_content - Comment text<br />
                                • comment_approved - Approval status (1/0)<br />
                                • comment_date - Date posted<br />
                                • comment_parent - Parent comment ID (optional)
                            </div>
                        </div>

                        {/* File Upload */}
                        <div style={{
                            border: '2px dashed #cbd5e1',
                            borderRadius: '12px',
                            padding: 'var(--spacing-2xl)',
                            textAlign: 'center',
                            marginBottom: 'var(--spacing-xl)',
                            background: '#f8fafc',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            position: 'relative'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#8b5cf6';
                                e.currentTarget.style.background = '#faf5ff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#cbd5e1';
                                e.currentTarget.style.background = '#f8fafc';
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📄</div>
                            <div style={{
                                color: '#0f172a',
                                fontWeight: 600,
                                marginBottom: '0.5rem'
                            }}>
                                Click to upload or drag and drop
                            </div>
                            <div style={{
                                color: '#64748b',
                                fontSize: '0.85rem'
                            }}>
                                WordPress comments CSV file (.csv)
                            </div>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                                style={{
                                    position: 'absolute',
                                    opacity: 0,
                                    width: '100%',
                                    height: '100%',
                                    top: 0,
                                    left: 0,
                                    cursor: 'pointer'
                                }}
                            />
                        </div>

                        {importFile && (
                            <div style={{
                                background: '#f0fdf4',
                                border: '1px solid #86efac',
                                borderRadius: '8px',
                                padding: 'var(--spacing-md)',
                                marginBottom: 'var(--spacing-xl)',
                                color: '#166534',
                                fontSize: '0.9rem',
                                fontWeight: 600
                            }}>
                                ✓ File selected: {importFile.name}
                            </div>
                        )}

                        {/* Import Options */}
                        <div style={{
                            background: '#f8fafc',
                            borderRadius: '12px',
                            padding: 'var(--spacing-lg)',
                            marginBottom: 'var(--spacing-xl)'
                        }}>
                            <h3 style={{
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: '#0f172a',
                                marginBottom: 'var(--spacing-md)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Import Options
                            </h3>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)',
                                marginBottom: 'var(--spacing-sm)',
                                cursor: 'pointer',
                                color: '#475569',
                                fontWeight: 500
                            }}>
                                <input type="checkbox" defaultChecked />
                                Auto-map comments to articles by post title
                            </label>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)',
                                marginBottom: 'var(--spacing-sm)',
                                cursor: 'pointer',
                                color: '#475569',
                                fontWeight: 500
                            }}>
                                <input type="checkbox" defaultChecked />
                                Preserve comment hierarchy (parent/child)
                            </label>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)',
                                marginBottom: 'var(--spacing-sm)',
                                cursor: 'pointer',
                                color: '#475569',
                                fontWeight: 500
                            }}>
                                <input type="checkbox" defaultChecked />
                                Import approval status from CSV
                            </label>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)',
                                cursor: 'pointer',
                                color: '#475569',
                                fontWeight: 500
                            }}>
                                <input type="checkbox" defaultChecked />
                                Preserve original comment dates
                            </label>
                        </div>

                        {/* Actions */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            justifyContent: 'flex-end'
                        }}>
                            <button
                                onClick={() => setShowImporter(false)}
                                disabled={importing}
                                style={{
                                    padding: 'var(--spacing-md) var(--spacing-xl)',
                                    background: '#f1f5f9',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: '#475569',
                                    fontWeight: 600,
                                    cursor: importing ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: importing ? 0.5 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!importing) e.currentTarget.style.background = '#e2e8f0';
                                }}
                                onMouseLeave={(e) => {
                                    if (!importing) e.currentTarget.style.background = '#f1f5f9';
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={!importFile || importing}
                                style={{
                                    padding: 'var(--spacing-md) var(--spacing-xl)',
                                    background: importFile && !importing ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : '#cbd5e1',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontWeight: 700,
                                    cursor: importFile && !importing ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s',
                                    boxShadow: importFile && !importing ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (importFile && !importing) {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.4)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (importFile && !importing) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                                    }
                                }}
                            >
                                {importing ? 'Importing...' : 'Import Comments'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
