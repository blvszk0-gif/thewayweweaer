'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FaqField { key: string; value: string | null; }
interface FaqEntry { id: string; fields: FaqField[]; }

function fieldValue(entry: FaqEntry, key: string): string {
    return entry.fields.find((f) => f.key === key)?.value ?? '';
}

const FAQItem = ({ q, a, i }: { q: string; a: string; i: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-8 cursor-pointer text-[color:var(--foreground)] text-left focus:outline-none"
            >
                <span className="font-black uppercase tracking-widest text-[18px]">{q}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="w-8 h-8 rounded-full bg-[color:var(--surface-muted)] flex items-center justify-center shrink-0"
                >
                    <Plus size={16} />
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-8 pb-8 text-[18px] font-bold normal-case opacity-70 leading-relaxed text-[color:var(--foreground)] whitespace-pre-line">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export function FAQSection() {
    const [items, setItems] = useState<FaqEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/shopify/metaobjects?type=faq')
            .then((res) => res.json())
            .then((data) => setItems(data.metaobjects ?? []))
            .catch(() => setItems([]))
            .finally(() => setLoading(false));
    }, []);

    const sorted = [...items].sort(
        (a, b) => (Number(fieldValue(a, 'kolejnosc')) || 0) - (Number(fieldValue(b, 'kolejnosc')) || 0)
    );

    if (loading || sorted.length === 0) return null;

    return (
        <div className="mb-48 max-w-4xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-4">FAQ</h2>
                <p className="text-[color:var(--foreground)]/40 font-bold uppercase tracking-widest text-base">
                    Najczęściej zadawane pytania
                </p>
            </div>
            <div className="space-y-6">
                {sorted.map((item, i) => (
                    <FAQItem key={item.id} q={fieldValue(item, 'question')} a={fieldValue(item, 'odpowiedz')} i={i} />
                ))}
            </div>
        </div>
    );
}