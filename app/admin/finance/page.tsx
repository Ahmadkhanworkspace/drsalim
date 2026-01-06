'use client';

import { useState } from 'react';

interface WithdrawalRequest {
    id: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    requestDate: string;
    processedDate?: string;
}

export default function FinancePage() {
    const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState('');

    const totalEarnings = 942;
    const availableBalance = 893;
    const pendingWithdrawals = 49;
    const minimumWithdrawal = 50;

    const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalRequest[]>([
        { id: '1', amount: 49, status: 'pending', requestDate: '2026-01-05' },
    ]);

    const handleWithdrawalRequest = () => {
        const amount = parseFloat(withdrawalAmount);
        if (amount < minimumWithdrawal) {
            alert(`Minimum withdrawal amount is $${minimumWithdrawal}`);
            return;
        }
        if (amount > availableBalance) {
            alert('Insufficient balance');
            return;
        }

        const newRequest: WithdrawalRequest = {
            id: Date.now().toString(),
            amount,
            status: 'pending',
            requestDate: new Date().toISOString().split('T')[0]
        };

        setWithdrawalHistory([newRequest, ...withdrawalHistory]);
        setWithdrawalAmount('');
        setShowWithdrawalForm(false);
        alert('Withdrawal request submitted successfully!');
    };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.5px'
                }}>
                    Finance & Withdrawals
                </h1>
                <p style={{
                    color: '#64748b',
                    fontSize: '1rem',
                    fontWeight: 500
                }}>
                    Manage your Amazon earnings and withdrawal requests
                </p>
            </div>

            {/* Balance Overview */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '2px solid #10b981',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Total Earnings
                    </div>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#10b981',
                        letterSpacing: '-1px'
                    }}>
                        ${totalEarnings}
                    </div>
                </div>

                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
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
                        Available Balance
                    </div>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-1px'
                    }}>
                        ${availableBalance}
                    </div>
                </div>

                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #f59e0b',
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
                        Pending Withdrawals
                    </div>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#f59e0b',
                        letterSpacing: '-1px'
                    }}>
                        ${pendingWithdrawals}
                    </div>
                </div>
            </div>

            {/* Request Withdrawal Button */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <button
                    onClick={() => setShowWithdrawalForm(true)}
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                    }}
                >
                    💸 Request Withdrawal to Amazon
                </button>
            </div>

            {/* Withdrawal Form Modal */}
            {showWithdrawalForm && (
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
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            Request Withdrawal
                        </h2>
                        <p style={{
                            color: '#64748b',
                            marginBottom: 'var(--spacing-xl)',
                            lineHeight: 1.6
                        }}>
                            Request a withdrawal to your Amazon account. Minimum withdrawal amount is ${minimumWithdrawal}.
                        </p>

                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <label style={{
                                display: 'block',
                                color: '#0f172a',
                                fontWeight: 700,
                                marginBottom: 'var(--spacing-sm)'
                            }}>
                                Withdrawal Amount ($)
                            </label>
                            <input
                                type="number"
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                                placeholder="Enter amount"
                                min={minimumWithdrawal}
                                max={availableBalance}
                                style={{
                                    width: '100%',
                                    padding: 'var(--spacing-md)',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    color: '#0f172a'
                                }}
                            />
                            <div style={{
                                marginTop: 'var(--spacing-sm)',
                                fontSize: '0.85rem',
                                color: '#64748b'
                            }}>
                                Available: ${availableBalance}
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            justifyContent: 'flex-end'
                        }}>
                            <button
                                onClick={() => setShowWithdrawalForm(false)}
                                style={{
                                    padding: 'var(--spacing-md) var(--spacing-xl)',
                                    background: '#f1f5f9',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: '#475569',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleWithdrawalRequest}
                                style={{
                                    padding: 'var(--spacing-md) var(--spacing-xl)',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                                }}
                            >
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Withdrawal History */}
            <div>
                <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.3px'
                }}>
                    Withdrawal History
                </h2>
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse'
                    }}>
                        <thead>
                            <tr style={{
                                background: '#f8fafc',
                                borderBottom: '1px solid #e2e8f0'
                            }}>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'left',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Request Date
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Amount
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Status
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'left',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Processed Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawalHistory.map((withdrawal, index) => (
                                <tr
                                    key={withdrawal.id}
                                    style={{
                                        borderBottom: index < withdrawalHistory.length - 1 ? '1px solid #f1f5f9' : 'none',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        color: '#0f172a',
                                        fontWeight: 600
                                    }}>
                                        {withdrawal.requestDate}
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'center',
                                        color: '#10b981',
                                        fontWeight: 800,
                                        fontSize: '1.1rem'
                                    }}>
                                        ${withdrawal.amount}
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'center'
                                    }}>
                                        <span style={{
                                            padding: '0.4rem 1rem',
                                            background: withdrawal.status === 'approved' ? '#dcfce7' : withdrawal.status === 'pending' ? '#fef3c7' : '#fee2e2',
                                            color: withdrawal.status === 'approved' ? '#166534' : withdrawal.status === 'pending' ? '#92400e' : '#991b1b',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            textTransform: 'capitalize'
                                        }}>
                                            {withdrawal.status}
                                        </span>
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        color: '#64748b',
                                        fontWeight: 600
                                    }}>
                                        {withdrawal.processedDate || '-'}
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
