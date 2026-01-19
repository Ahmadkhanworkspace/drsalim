'use client';

import { useState } from 'react';

interface WithdrawalRequest {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'completed' | 'rejected';
    paymentMethod: 'gateway' | 'bank';
    requestDate: string;
    estimatedCompletion?: string;
}

interface Transaction {
    id: string;
    type: 'earning' | 'withdrawal' | 'fee';
    amount: number;
    description: string;
    date: string;
    status: 'completed' | 'pending';
}

interface PaymentMethod {
    id: string;
    type: 'bank' | 'paypal' | 'stripe';
    name: string;
    details: string;
    isDefault: boolean;
    verified: boolean;
}

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showWithdrawalWizard, setShowWithdrawalWizard] = useState(false);
    const [showEmailSupport, setShowEmailSupport] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'gateway' | 'bank' | ''>('');
    const [bankDetails, setBankDetails] = useState({
        accountName: '',
        accountNumber: '',
        bankName: '',
        routingNumber: '',
        swiftCode: ''
    });
    const [emailForm, setEmailForm] = useState({
        subject: '',
        message: ''
    });

    // Withdrawal confirmation state
    const [showWithdrawalConfirmation, setShowWithdrawalConfirmation] = useState(false);
    const [confirmedWithdrawal, setConfirmedWithdrawal] = useState<any>(null);

    // Verification State
    const [verificationQuestion, setVerificationQuestion] = useState('');
    const [verificationAnswer, setVerificationAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const generateVerificationQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setVerificationQuestion(`${num1} + ${num2} = ?`);
        setCorrectAnswer(num1 + num2);
        setVerificationAnswer('');
    };

    const submitWithdrawal = async () => {
        if (parseInt(verificationAnswer) !== correctAnswer) {
            alert('Incorrect answer to verification question. Please try again.');
            generateVerificationQuestion();
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/withdrawals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(withdrawalAmount),
                    method: paymentMethod,
                    bankDetails: paymentMethod === 'bank' ? bankDetails : undefined,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const withdrawalId = data.id || `WD-${Date.now()}`;

                // Add new withdrawal to transactions list
                const newWithdrawal: Transaction = {
                    id: withdrawalId,
                    type: 'withdrawal',
                    amount: -parseFloat(withdrawalAmount),
                    description: `Withdrawal to ${paymentMethod === 'bank' ? 'Bank Account' : 'Payment Gateway'}`,
                    date: new Date().toISOString().split('T')[0],
                    status: 'pending'
                };

                setTransactions([newWithdrawal, ...transactions]);

                // Deduct from available balance and add to pending
                setAvailableBalance(prev => prev - parseFloat(withdrawalAmount));
                setPendingWithdrawals(prev => prev + parseFloat(withdrawalAmount));

                // Prepare confirmed data first
                const confirmedData = {
                    id: withdrawalId,
                    amount: parseFloat(withdrawalAmount),
                    method: paymentMethod === 'bank' ? 'Bank Account' : 'Payment Gateway',
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                };

                // Show premium confirmation modal and hide wizard
                setConfirmedWithdrawal(confirmedData);
                setShowWithdrawalConfirmation(true);
                setShowWithdrawalWizard(false);

                // Reset form states
                setCurrentStep(1);
                setWithdrawalAmount('');
                setPaymentMethod('');
                setBankDetails({
                    accountName: '',
                    accountNumber: '',
                    bankName: '',
                    routingNumber: '',
                    swiftCode: ''
                });
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to request withdrawal');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Financial Data (now with state for dynamic updates)
    const totalEarnings = 942;
    const [availableBalance, setAvailableBalance] = useState(893);
    const [pendingWithdrawals, setPendingWithdrawals] = useState(49);
    const minimumWithdrawal = 50;

    // Revenue Analytics Data
    const monthlyRevenue = [
        { month: 'Jul', revenue: 120, sales: 11 },
        { month: 'Aug', revenue: 135, sales: 13 },
        { month: 'Sep', revenue: 150, sales: 14 },
        { month: 'Oct', revenue: 125, sales: 12 },
        { month: 'Nov', revenue: 140, sales: 13 },
        { month: 'Dec', revenue: 272, sales: 23 },
    ];

    const earningsByBook = [
        { title: 'Brotherhood', earnings: 517, sales: 47, percentage: 55 },
        { title: 'Divine Providence', earnings: 231, sales: 21, percentage: 25 },
        { title: 'Spiritual Diseases', earnings: 143, sales: 13, percentage: 15 },
        { title: 'Human Journey', earnings: 51, sales: 5, percentage: 5 },
    ];

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        { id: '1', type: 'bank', name: 'Soneri Bank', details: 'Muhammad Salim - ****5678', isDefault: true, verified: true },
        { id: '2', type: 'stripe', name: 'Payment Gateway', details: 'Connected', isDefault: false, verified: true },
    ]);

    const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);
    const [showPaymentEdit, setShowPaymentEdit] = useState(false);

    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: '1', type: 'earning', amount: 517, description: 'Book sales - Brotherhood (47 copies)', date: '2026-01-07', status: 'completed' },
        { id: '2', type: 'earning', amount: 231, description: 'Book sales - Divine Providence (21 copies)', date: '2026-01-06', status: 'completed' },
        { id: '3', type: 'withdrawal', amount: -49, description: 'Withdrawal to Payment Gateway', date: '2026-01-01', status: 'pending' },
        { id: '4', type: 'earning', amount: 143, description: 'Book sales - Spiritual Diseases (13 copies)', date: '2025-12-30', status: 'completed' },
        { id: '5', type: 'earning', amount: 51, description: 'Book sales - Human Journey (5 copies)', date: '2025-12-28', status: 'completed' },

    ]);

    const [withdrawalSettings, setWithdrawalSettings] = useState({
        autoWithdrawal: false,
        schedule: 'monthly',
        minimumAmount: 100,
        notifications: true
    });

    const [financialGoals, setFinancialGoals] = useState([
        { id: '1', title: 'Reach $1,000 earnings', target: 1000, current: 942, deadline: '2026-01-31' },
        { id: '2', title: 'Sell 100 books', target: 100, current: 86, deadline: '2026-02-28' },
    ]);

    const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

    const handleEditPayment = (method: PaymentMethod) => {
        setEditingPayment({ ...method });
        setShowPaymentEdit(true);
    };

    const handleSavePayment = () => {
        if (editingPayment) {
            setPaymentMethods(paymentMethods.map(pm =>
                pm.id === editingPayment.id ? editingPayment : pm
            ));
            setShowPaymentEdit(false);
            setEditingPayment(null);
            alert('Payment method updated successfully!');
        }
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            const amount = parseFloat(withdrawalAmount);
            if (amount < minimumWithdrawal) {
                alert(`Minimum withdrawal amount is $${minimumWithdrawal}`);
                return;
            }
            if (amount > availableBalance) {
                alert('Insufficient balance');
                return;
            }
        }
        if (currentStep === 2 && !paymentMethod) {
            alert('Please select a payment method');
            return;
        }
        if (currentStep === 3 && paymentMethod === 'bank') {
            if (!bankDetails.accountName || !bankDetails.accountNumber) {
                alert('Please fill in required fields');
                return;
            }
        }

        if (currentStep === (paymentMethod === 'bank' ? 3 : 2)) {
            // Prepare for verification step
            generateVerificationQuestion();
            setCurrentStep(4); // Jump to verification
            return;
        }

        setCurrentStep(currentStep + 1);
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'transactions', label: 'Transactions', icon: '💳' },
        { id: 'payments', label: 'Payment Methods', icon: '🏦' },
        { id: 'tax', label: 'Tax & Invoices', icon: '📄' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'goals', label: 'Goals', icon: '🎯' },
    ];

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
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: 400,
                        color: '#0F1111',
                        marginBottom: '4px'
                    }}>
                        Finance Management
                    </h1>
                    <p style={{
                        color: '#565959',
                        fontSize: '0.875rem',
                        margin: 0
                    }}>
                        Manage earnings, withdrawals, and financial goals
                    </p>
                </div>
                <button
                    onClick={() => setShowEmailSupport(true)}
                    style={{
                        padding: '8px 16px',
                        background: '#fff',
                        border: '1px solid #D5D9D9',
                        borderRadius: '8px',
                        color: '#0F1111',
                        fontSize: '0.8125rem',
                        fontWeight: 400,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    📧 Contact Support
                </button>
            </div>

            {/* Tabs */}
            <div style={{
                background: '#fff',
                borderRadius: '8px 8px 0 0',
                border: '1px solid #D5D9D9',
                borderBottom: 'none',
                padding: '0',
                marginBottom: '0',
                overflowX: 'auto'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '0',
                    minWidth: 'max-content'
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '12px 20px',
                                background: activeTab === tab.id ? '#fff' : '#F7FAFA',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? '2px solid #FF9900' : '2px solid transparent',
                                color: activeTab === tab.id ? '#0F1111' : '#565959',
                                fontSize: '0.8125rem',
                                fontWeight: activeTab === tab.id ? 600 : 400,
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <span style={{ marginRight: '6px' }}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div style={{
                background: '#fff',
                border: '1px solid #D5D9D9',
                borderRadius: '0 0 8px 8px',
                padding: '20px'
            }}>
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div>
                        {/* Balance Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '12px',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                padding: '16px',
                                background: '#D1F4E0',
                                border: '1px solid #067D62',
                                borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '8px', textTransform: 'uppercase' }}>
                                    Total Earnings
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#067D62' }}>
                                    ${totalEarnings}
                                </div>
                            </div>
                            <div style={{
                                padding: '16px',
                                background: '#fff',
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '8px', textTransform: 'uppercase' }}>
                                    Available Balance
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0F1111' }}>
                                    ${availableBalance}
                                </div>
                            </div>
                            <div style={{
                                padding: '16px',
                                background: '#fff',
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '8px', textTransform: 'uppercase' }}>
                                    Pending Withdrawals
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FF9900' }}>
                                    ${pendingWithdrawals}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div style={{
                            marginBottom: '20px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px'
                        }}>
                            <button
                                onClick={() => setShowWithdrawalWizard(true)}
                                style={{
                                    padding: '10px 20px',
                                    background: '#FFD814',
                                    border: '1px solid #FCD200',
                                    borderRadius: '8px',
                                    color: '#0F1111',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Request Withdrawal
                            </button>
                            <button
                                onClick={() => setActiveTab('transactions')}
                                style={{
                                    padding: '10px 20px',
                                    background: '#fff',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '8px',
                                    color: '#0F1111',
                                    fontSize: '0.875rem',
                                    fontWeight: 400,
                                    cursor: 'pointer'
                                }}
                            >
                                View Transactions
                            </button>
                        </div>

                        {/* Recent Transactions */}
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 400, color: '#0F1111', marginBottom: '12px' }}>
                            Recent transactions
                        </h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#F7FAFA', borderBottom: '1px solid #D5D9D9' }}>
                                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Date</th>
                                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Description</th>
                                        <th style={{ padding: '10px', textAlign: 'right', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Amount</th>
                                        <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.slice(0, 5).map((txn, idx) => (
                                        <tr key={txn.id} style={{ borderBottom: idx < 4 ? '1px solid #E3E6E6' : 'none' }}>
                                            <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111' }}>{txn.date}</td>
                                            <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111' }}>{txn.description}</td>
                                            <td style={{
                                                padding: '12px',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                textAlign: 'right',
                                                color: txn.amount > 0 ? '#067D62' : '#C7511F'
                                            }}>
                                                {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount)}
                                            </td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    background: txn.status === 'completed' ? '#D1F4E0' : '#FFF4E5',
                                                    color: txn.status === 'completed' ? '#067D62' : '#FF9900',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    borderRadius: '4px'
                                                }}>
                                                    {txn.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ANALYTICS TAB */}
                {activeTab === 'analytics' && (
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 400, color: '#0F1111', marginBottom: '16px' }}>
                            Revenue analytics
                        </h3>

                        {/* Monthly Revenue Chart */}
                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#565959', marginBottom: '12px' }}>
                                Monthly Revenue (Last 6 Months)
                            </h4>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: '12px',
                                height: '200px',
                                padding: '16px 0'
                            }}>
                                {monthlyRevenue.map((data, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <div style={{
                                            width: '100%',
                                            height: `${(data.revenue / maxRevenue) * 160}px`,
                                            background: '#067D62',
                                            borderRadius: '4px 4px 0 0',
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '-20px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                color: '#067D62'
                                            }}>
                                                ${data.revenue}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#565959' }}>
                                            {data.month}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Earnings by Book */}
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#565959', marginBottom: '12px' }}>
                            Earnings by Book
                        </h4>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '12px'
                        }}>
                            {earningsByBook.map((book, idx) => (
                                <div key={idx} style={{
                                    padding: '14px',
                                    background: '#F7FAFA',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                        {book.title}
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#067D62', marginBottom: '4px' }}>
                                        ${book.earnings}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                        {book.sales} sales • {book.percentage}% of total
                                    </div>
                                    <div style={{
                                        marginTop: '8px',
                                        height: '4px',
                                        background: '#E3E6E6',
                                        borderRadius: '2px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${book.percentage}%`,
                                            height: '100%',
                                            background: '#067D62'
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TRANSACTIONS TAB */}
                {activeTab === 'transactions' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 400, color: '#0F1111', margin: 0 }}>
                                All transactions
                            </h3>
                            <button style={{
                                padding: '6px 14px',
                                background: '#fff',
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px',
                                fontSize: '0.8125rem',
                                cursor: 'pointer'
                            }}>
                                Export CSV
                            </button>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#F7FAFA', borderBottom: '1px solid #D5D9D9' }}>
                                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Date</th>
                                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Type</th>
                                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Description</th>
                                        <th style={{ padding: '10px', textAlign: 'right', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Amount</th>
                                        <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((txn, idx) => (
                                        <tr key={txn.id} style={{ borderBottom: idx < transactions.length - 1 ? '1px solid #E3E6E6' : 'none' }}>
                                            <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111' }}>{txn.date}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    background: txn.type === 'earning' ? '#D1F4E0' : txn.type === 'withdrawal' ? '#FFF4E5' : '#FFE5E5',
                                                    color: txn.type === 'earning' ? '#067D62' : txn.type === 'withdrawal' ? '#FF9900' : '#C7511F',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    borderRadius: '4px',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {txn.type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111' }}>{txn.description}</td>
                                            <td style={{
                                                padding: '12px',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                textAlign: 'right',
                                                color: txn.amount > 0 ? '#067D62' : '#C7511F'
                                            }}>
                                                {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount)}
                                            </td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    background: txn.status === 'completed' ? '#D1F4E0' : '#FFF4E5',
                                                    color: txn.status === 'completed' ? '#067D62' : '#FF9900',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    borderRadius: '4px',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {txn.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* PAYMENT METHODS TAB */}
                {activeTab === 'payments' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 400, color: '#0F1111', margin: 0 }}>
                                Payment methods
                            </h3>
                            <button style={{
                                padding: '8px 16px',
                                background: '#FFD814',
                                border: '1px solid #FCD200',
                                borderRadius: '8px',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                + Add Payment Method
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {paymentMethods.map(method => (
                                <div key={method.id} style={{
                                    padding: '16px',
                                    background: '#F7FAFA',
                                    border: method.isDefault ? '2px solid #FF9900' : '1px solid #D5D9D9',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: '#fff',
                                            border: '1px solid #D5D9D9',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.25rem'
                                        }}>
                                            {method.type === 'bank' ? '🏦' : method.type === 'paypal' ? '💳' : '💰'}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '2px' }}>
                                                {method.name}
                                                {method.isDefault && (
                                                    <span style={{
                                                        marginLeft: '8px',
                                                        padding: '2px 8px',
                                                        background: '#FF9900',
                                                        color: '#fff',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 600,
                                                        borderRadius: '4px'
                                                    }}>
                                                        DEFAULT
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                                {method.details}
                                                {method.verified && (
                                                    <span style={{ marginLeft: '8px', color: '#067D62' }}>✓ Verified</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => handleEditPayment(method)}
                                            style={{
                                                padding: '6px 12px',
                                                background: '#fff',
                                                border: '1px solid #D5D9D9',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                cursor: 'pointer'
                                            }}>
                                            Edit
                                        </button>
                                        {!method.isDefault && (
                                            <button style={{
                                                padding: '6px 12px',
                                                background: '#fff',
                                                border: '1px solid #D5D9D9',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                color: '#C7511F',
                                                cursor: 'pointer'
                                            }}>
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAX & INVOICES TAB */}
                {activeTab === 'tax' && (
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 400, color: '#0F1111', marginBottom: '16px' }}>
                            Tax & invoicing
                        </h3>

                        {/* Annual Summary */}
                        <div style={{
                            padding: '16px',
                            background: '#F7FAFA',
                            border: '1px solid #D5D9D9',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '12px' }}>
                                2026 Tax Summary
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>Total Earnings</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#067D62' }}>$942</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>Total Withdrawals</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F1111' }}>$49</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>Platform Fees</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#C7511F' }}>$2.50</div>
                                </div>
                            </div>
                            <button style={{
                                marginTop: '16px',
                                padding: '8px 16px',
                                background: '#FFD814',
                                border: '1px solid #FCD200',
                                borderRadius: '8px',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                Download Tax Document (PDF)
                            </button>
                        </div>

                        {/* Invoice History */}
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#565959', marginBottom: '12px' }}>
                            Invoice History
                        </h4>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#F7FAFA', borderBottom: '1px solid #D5D9D9' }}>
                                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Invoice #</th>
                                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Date</th>
                                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Description</th>
                                        <th style={{ padding: '10px', textAlign: 'right', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Amount</th>
                                        <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#565959', textTransform: 'uppercase' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: 'INV-001', date: '2026-01-01', desc: 'Book Sales - December 2025', amount: 272 },
                                        { id: 'INV-002', date: '2025-12-01', desc: 'Book Sales - November 2025', amount: 140 },
                                    ].map((inv, idx) => (
                                        <tr key={inv.id} style={{ borderBottom: idx < 1 ? '1px solid #E3E6E6' : 'none' }}>
                                            <td style={{ padding: '12px', fontSize: '0.8125rem', fontWeight: 600, color: '#0F1111' }}>{inv.id}</td>
                                            <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111' }}>{inv.date}</td>
                                            <td style={{ padding: '12px', fontSize: '0.8125rem', color: '#0F1111' }}>{inv.desc}</td>
                                            <td style={{ padding: '12px', fontSize: '0.875rem', fontWeight: 600, textAlign: 'right', color: '#067D62' }}>
                                                ${inv.amount}
                                            </td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                                <button style={{
                                                    padding: '6px 12px',
                                                    background: '#fff',
                                                    border: '1px solid #D5D9D9',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer'
                                                }}>
                                                    Download PDF
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 400, color: '#0F1111', marginBottom: '16px' }}>
                            Withdrawal settings
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Auto Withdrawal */}
                            <div style={{
                                padding: '16px',
                                background: '#F7FAFA',
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '4px' }}>
                                            Automatic Withdrawals
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                            Automatically withdraw when balance reaches threshold
                                        </div>
                                    </div>
                                    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                                        <input
                                            type="checkbox"
                                            checked={withdrawalSettings.autoWithdrawal}
                                            onChange={(e) => setWithdrawalSettings({ ...withdrawalSettings, autoWithdrawal: e.target.checked })}
                                            style={{ opacity: 0, width: 0, height: 0 }}
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            cursor: 'pointer',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: withdrawalSettings.autoWithdrawal ? '#067D62' : '#D5D9D9',
                                            borderRadius: '24px',
                                            transition: '0.3s'
                                        }}>
                                            <span style={{
                                                position: 'absolute',
                                                content: '',
                                                height: '18px',
                                                width: '18px',
                                                left: withdrawalSettings.autoWithdrawal ? '23px' : '3px',
                                                bottom: '3px',
                                                background: 'white',
                                                borderRadius: '50%',
                                                transition: '0.3s'
                                            }} />
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Withdrawal Schedule */}
                            <div style={{
                                padding: '16px',
                                background: '#F7FAFA',
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                    Withdrawal Schedule
                                </div>
                                <select
                                    value={withdrawalSettings.schedule}
                                    onChange={(e) => setWithdrawalSettings({ ...withdrawalSettings, schedule: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '8px',
                                        fontSize: '0.8125rem',
                                        background: '#fff'
                                    }}
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                </select>
                            </div>

                            {/* Minimum Amount */}
                            <div style={{
                                padding: '16px',
                                background: '#F7FAFA',
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                    Minimum Withdrawal Amount
                                </div>
                                <input
                                    type="number"
                                    value={withdrawalSettings.minimumAmount}
                                    onChange={(e) => setWithdrawalSettings({ ...withdrawalSettings, minimumAmount: parseInt(e.target.value) })}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '8px',
                                        fontSize: '0.8125rem'
                                    }}
                                />
                            </div>

                            {/* Email Notifications */}
                            <div style={{
                                padding: '16px',
                                background: '#F7FAFA',
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '4px' }}>
                                            Email Notifications
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                            Receive email alerts for withdrawals and earnings
                                        </div>
                                    </div>
                                    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                                        <input
                                            type="checkbox"
                                            checked={withdrawalSettings.notifications}
                                            onChange={(e) => setWithdrawalSettings({ ...withdrawalSettings, notifications: e.target.checked })}
                                            style={{ opacity: 0, width: 0, height: 0 }}
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            cursor: 'pointer',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: withdrawalSettings.notifications ? '#067D62' : '#D5D9D9',
                                            borderRadius: '24px',
                                            transition: '0.3s'
                                        }}>
                                            <span style={{
                                                position: 'absolute',
                                                content: '',
                                                height: '18px',
                                                width: '18px',
                                                left: withdrawalSettings.notifications ? '23px' : '3px',
                                                bottom: '3px',
                                                background: 'white',
                                                borderRadius: '50%',
                                                transition: '0.3s'
                                            }} />
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <button style={{
                                padding: '10px 20px',
                                background: '#FFD814',
                                border: '1px solid #FCD200',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                Save Settings
                            </button>
                        </div>
                    </div>
                )}

                {/* GOALS TAB */}
                {activeTab === 'goals' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 400, color: '#0F1111', margin: 0 }}>
                                Financial goals
                            </h3>
                            <button style={{
                                padding: '8px 16px',
                                background: '#FFD814',
                                border: '1px solid #FCD200',
                                borderRadius: '8px',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                + Add New Goal
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {financialGoals.map(goal => {
                                const progress = (goal.current / goal.target) * 100;
                                return (
                                    <div key={goal.id} style={{
                                        padding: '20px',
                                        background: '#F7FAFA',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <div>
                                                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F1111', marginBottom: '4px' }}>
                                                    {goal.title}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                                    Deadline: {goal.deadline}
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '1.25rem' }}>
                                                {progress >= 100 ? '🏆' : progress >= 75 ? '🎯' : '📊'}
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '8px' }}>
                                            <div style={{
                                                height: '12px',
                                                background: '#E3E6E6',
                                                borderRadius: '6px',
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: `${Math.min(progress, 100)}%`,
                                                    height: '100%',
                                                    background: progress >= 100 ? '#067D62' : '#FF9900',
                                                    transition: 'width 0.3s'
                                                }} />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                                            <span style={{ color: '#565959' }}>
                                                {goal.current} / {goal.target}
                                            </span>
                                            <span style={{ fontWeight: 600, color: progress >= 100 ? '#067D62' : '#FF9900' }}>
                                                {progress.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            {/* Withdrawal Wizard Modal */}
            {showWithdrawalWizard && (
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
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '500px',
                        width: '90%'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F1111', marginBottom: '16px' }}>
                            Request Withdrawal
                        </h2>

                        {/* Step 1: Amount */}
                        {currentStep === 1 && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                    Withdrawal Amount
                                </label>
                                <input
                                    type="number"
                                    value={withdrawalAmount}
                                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                                    placeholder={`Min: $${minimumWithdrawal}`}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '8px',
                                        fontSize: '0.875rem',
                                        marginBottom: '16px'
                                    }}
                                />
                                <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '16px' }}>
                                    Available balance: ${availableBalance}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Payment Method */}
                        {currentStep === 2 && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '12px' }}>
                                    Select Payment Method
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                                    <button
                                        onClick={() => setPaymentMethod('gateway')}
                                        style={{
                                            padding: '12px',
                                            background: paymentMethod === 'gateway' ? '#FFF4E5' : '#fff',
                                            border: paymentMethod === 'gateway' ? '2px solid #FF9900' : '1px solid #D5D9D9',
                                            borderRadius: '8px',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Payment Gateway
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('bank')}
                                        style={{
                                            padding: '12px',
                                            background: paymentMethod === 'bank' ? '#FFF4E5' : '#fff',
                                            border: paymentMethod === 'bank' ? '2px solid #FF9900' : '1px solid #D5D9D9',
                                            borderRadius: '8px',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Bank Account Transfer
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Bank Details (if bank selected) */}
                        {currentStep === 3 && paymentMethod === 'bank' && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                    Bank Account Details
                                </label>
                                <input
                                    type="text"
                                    placeholder="Account Holder Name"
                                    value={bankDetails.accountName}
                                    onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '8px',
                                        fontSize: '0.8125rem',
                                        marginBottom: '10px'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Account Number"
                                    value={bankDetails.accountNumber}
                                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '8px',
                                        fontSize: '0.8125rem',
                                        marginBottom: '16px'
                                    }}
                                />
                            </div>
                        )}

                        {/* Step 4: Verification */}
                        {currentStep === 4 && (
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0F1111', marginBottom: '12px' }}>
                                    Security Verification
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: '#565959', marginBottom: '16px' }}>
                                    Please answer the following question to confirm your request:
                                </p>
                                <div style={{
                                    background: '#F7FAFA',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    marginBottom: '16px',
                                    border: '1px solid #D5D9D9'
                                }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F1111' }}>
                                        {verificationQuestion}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Enter Answer"
                                    value={verificationAnswer}
                                    onChange={(e) => setVerificationAnswer(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '8px',
                                        fontSize: '0.875rem',
                                        marginBottom: '16px'
                                    }}
                                />
                            </div>
                        )}

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowWithdrawalWizard(false);
                                    setCurrentStep(1);
                                }}
                                style={{
                                    padding: '8px 16px',
                                    background: '#fff',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '8px',
                                    fontSize: '0.8125rem',
                                    cursor: 'pointer'
                                }}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            {currentStep > 1 && (
                                <button
                                    onClick={() => setCurrentStep(currentStep === 4 && paymentMethod !== 'bank' ? 2 : currentStep - 1)}
                                    style={{
                                        padding: '8px 16px',
                                        background: '#fff',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '8px',
                                        fontSize: '0.8125rem',
                                        cursor: 'pointer'
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Back
                                </button>
                            )}
                            {currentStep === 4 ? (
                                <button
                                    onClick={submitWithdrawal}
                                    disabled={isSubmitting}
                                    style={{
                                        padding: '8px 16px',
                                        background: '#FFD814',
                                        border: '1px solid #FCD200',
                                        borderRadius: '8px',
                                        fontSize: '0.8125rem',
                                        fontWeight: 600,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextStep}
                                    style={{
                                        padding: '8px 16px',
                                        background: '#FFD814',
                                        border: '1px solid #FCD200',
                                        borderRadius: '8px',
                                        fontSize: '0.8125rem',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ... (rest of the render) ... */}
            {/* Payment Method Edit Modal */}
            {showPaymentEdit && editingPayment && (
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
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '500px',
                        width: '90%'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F1111', marginBottom: '16px' }}>
                            Edit Payment Method
                        </h2>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                Payment Method Name
                            </label>
                            <input
                                type="text"
                                value={editingPayment.name}
                                onChange={(e) => setEditingPayment({ ...editingPayment, name: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                Account Details
                            </label>
                            <input
                                type="text"
                                value={editingPayment.details}
                                onChange={(e) => setEditingPayment({ ...editingPayment, details: e.target.value })}
                                placeholder="e.g., Muhammad Salim - ****5678"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={editingPayment.isDefault}
                                    onChange={(e) => setEditingPayment({ ...editingPayment, isDefault: e.target.checked })}
                                />
                                <span style={{ fontSize: '0.875rem', color: '#0F1111' }}>Set as default payment method</span>
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowPaymentEdit(false);
                                    setEditingPayment(null);
                                }}
                                style={{
                                    padding: '8px 16px',
                                    background: '#fff',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '8px',
                                    fontSize: '0.8125rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSavePayment}
                                style={{
                                    padding: '8px 16px',
                                    background: '#FFD814',
                                    border: '1px solid #FCD200',
                                    borderRadius: '8px',
                                    fontSize: '0.8125rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Email Support Modal */}
            {showEmailSupport && (
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
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                            Contact Support
                        </h2>
                        <p style={{ fontSize: '0.875rem', color: '#565959', marginBottom: '20px' }}>
                            Send an email to our support team. We'll respond within 24 hours.
                        </p>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                Subject
                            </label>
                            <input
                                type="text"
                                value={emailForm.subject}
                                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                                placeholder="e.g., Question about withdrawal processing"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#0F1111', marginBottom: '8px' }}>
                                Message
                            </label>
                            <div style={{
                                border: '1px solid #D5D9D9',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}>
                                {/* Simple formatting toolbar */}
                                <div style={{
                                    background: '#F7FAFA',
                                    borderBottom: '1px solid #D5D9D9',
                                    padding: '8px',
                                    display: 'flex',
                                    gap: '4px'
                                }}>
                                    <button
                                        onClick={() => document.execCommand('bold')}
                                        style={{
                                            padding: '6px 10px',
                                            background: '#fff',
                                            border: '1px solid #D5D9D9',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                        title="Bold"
                                    >
                                        B
                                    </button>
                                    <button
                                        onClick={() => document.execCommand('italic')}
                                        style={{
                                            padding: '6px 10px',
                                            background: '#fff',
                                            border: '1px solid #D5D9D9',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontStyle: 'italic',
                                            cursor: 'pointer'
                                        }}
                                        title="Italic"
                                    >
                                        I
                                    </button>
                                    <button
                                        onClick={() => document.execCommand('underline')}
                                        style={{
                                            padding: '6px 10px',
                                            background: '#fff',
                                            border: '1px solid #D5D9D9',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            textDecoration: 'underline',
                                            cursor: 'pointer'
                                        }}
                                        title="Underline"
                                    >
                                        U
                                    </button>
                                    <div style={{ width: '1px', background: '#D5D9D9', margin: '0 4px' }} />
                                    <button
                                        onClick={() => document.execCommand('insertUnorderedList')}
                                        style={{
                                            padding: '6px 10px',
                                            background: '#fff',
                                            border: '1px solid #D5D9D9',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer'
                                        }}
                                        title="Bullet List"
                                    >
                                        • List
                                    </button>
                                </div>
                                <div
                                    contentEditable
                                    onInput={(e) => setEmailForm({ ...emailForm, message: e.currentTarget.innerHTML })}
                                    style={{
                                        minHeight: '200px',
                                        padding: '12px',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.6',
                                        outline: 'none',
                                        background: '#fff'
                                    }}
                                    suppressContentEditableWarning
                                >
                                    {emailForm.message === '' ? (
                                        <span style={{ color: '#999' }}>Describe your issue or question in detail...</span>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: '#F7FAFA',
                            border: '1px solid #D5D9D9',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '20px'
                        }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0F1111', marginBottom: '4px' }}>
                                📋 Your Account Info (automatically included)
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                • Account: Muhammad Salim<br />
                                • Total Earnings: $942<br />
                                • Available Balance: $893
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowEmailSupport(false);
                                    setEmailForm({ subject: '', message: '' });
                                }}
                                style={{
                                    padding: '8px 16px',
                                    background: '#fff',
                                    border: '1px solid #D5D9D9',
                                    borderRadius: '8px',
                                    fontSize: '0.8125rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!emailForm.subject || !emailForm.message) {
                                        alert('Please fill in both subject and message');
                                        return;
                                    }
                                    alert('Support email sent successfully! We\'ll respond within 24 hours.');
                                    setShowEmailSupport(false);
                                    setEmailForm({ subject: '', message: '' });
                                }}
                                style={{
                                    padding: '8px 16px',
                                    background: '#FFD814',
                                    border: '1px solid #FCD200',
                                    borderRadius: '8px',
                                    fontSize: '0.8125rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                📧 Send Email
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Withdrawal Confirmation Modal */}
            {showWithdrawalConfirmation && confirmedWithdrawal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1001,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        borderRadius: '16px',
                        padding: '40px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.8)'
                    }}>
                        {/* Success Icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #067D62 0%, #04A777 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            boxShadow: '0 8px 24px rgba(6, 125, 98, 0.3)'
                        }}>
                            <span style={{ fontSize: '3rem' }}>✓</span>
                        </div>

                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#0F1111',
                            marginBottom: '8px',
                            textAlign: 'center'
                        }}>
                            Withdrawal Initiated
                        </h2>

                        <p style={{
                            fontSize: '0.9375rem',
                            color: '#565959',
                            textAlign: 'center',
                            marginBottom: '32px'
                        }}>
                            Your withdrawal request has been successfully submitted
                        </p>

                        {/* Withdrawal Details Card */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '24px',
                            border: '1px solid #E3E6E6',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Withdrawal ID
                                </div>
                                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F1111', fontFamily: 'monospace' }}>
                                    {confirmedWithdrawal.id}
                                </div>
                            </div>

                            <div style={{ height: '1px', background: '#E3E6E6', margin: '16px 0' }} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>
                                        Amount
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#067D62' }}>
                                        ${confirmedWithdrawal.amount}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>
                                        Status
                                    </div>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '6px 12px',
                                        background: '#FFF4E5',
                                        color: '#FF9900',
                                        fontSize: '0.8125rem',
                                        fontWeight: 600,
                                        borderRadius: '6px',
                                        marginTop: '4px'
                                    }}>
                                        Pending
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: '1px', background: '#E3E6E6', margin: '16px 0' }} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>
                                        Payment Method
                                    </div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111' }}>
                                        {confirmedWithdrawal.method}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px' }}>
                                        Date & Time
                                    </div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1111' }}>
                                        {confirmedWithdrawal.date}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                        {confirmedWithdrawal.time}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => {
                                    const printContent = `
                            WITHDRAWAL RECEIPT
                            ==================
                            
                            Withdrawal ID: ${confirmedWithdrawal.id}
                            Amount: $${confirmedWithdrawal.amount}
                            Status: Pending
                            Payment Method: ${confirmedWithdrawal.method}
                            Date: ${confirmedWithdrawal.date}
                            Time: ${confirmedWithdrawal.time}
                            
                            Your withdrawal request is being processed.
                            You will receive a notification once completed.
                        `;
                                    const printWindow = window.open('', '', 'height=600,width=800');
                                    if (printWindow) {
                                        printWindow.document.write('<html><head><title>Withdrawal Receipt</title>');
                                        printWindow.document.write('<style>body{font-family:Arial,sans-serif;padding:40px;line-height:1.6}</style>');
                                        printWindow.document.write('</head><body>');
                                        printWindow.document.write('<pre>' + printContent + '</pre>');
                                        printWindow.document.write('</body></html>');
                                        printWindow.document.close();
                                        printWindow.print();
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    padding: '14px 24px',
                                    background: '#fff',
                                    border: '2px solid #D5D9D9',
                                    borderRadius: '10px',
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s',
                                    color: '#0F1111'
                                }}
                            >
                                📄 Download PDF
                            </button>
                            <button
                                onClick={() => setShowWithdrawalConfirmation(false)}
                                style={{
                                    flex: 1,
                                    padding: '14px 24px',
                                    background: 'linear-gradient(135deg, #067D62 0%, #04A777 100%)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    color: '#fff',
                                    boxShadow: '0 4px 12px rgba(6, 125, 98, 0.3)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Done
                            </button>
                        </div>

                        {/* Info Note */}
                        <div style={{
                            marginTop: '24px',
                            padding: '16px',
                            background: '#F7FAFA',
                            borderRadius: '8px',
                            border: '1px solid #E3E6E6'
                        }}>
                            <div style={{ fontSize: '0.8125rem', color: '#565959', lineHeight: '1.5' }}>
                                💡 <strong>What's next?</strong> Your withdrawal will be processed within 1-3 business days.
                                You'll receive an email notification once the transfer is complete.
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
