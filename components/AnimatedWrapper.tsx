'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedWrapperProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function AnimatedWrapper({ children, delay = 0, className = '' }: AnimatedWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
