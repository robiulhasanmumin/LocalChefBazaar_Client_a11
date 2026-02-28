import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const faqs = [
    {
        question: "How do I place an order?",
        answer: "Simply browse our categories, select your favorite meal, and click 'Add to Cart'. Follow the checkout process to confirm your delivery address and payment."
    },
    {
        question: "Is the food prepared fresh daily?",
        answer: "Yes! Every single meal is prepared fresh in our kitchen by professional chefs using locally sourced ingredients to ensure the highest quality."
    },
    {
        question: "Can I cancel my subscription at any time?",
        answer: "Absolutely. You can manage, pause, or cancel your meal subscription anytime through your dashboard settings with no hidden fees."
    },
    {
        question: "Do you offer healthy or diet-specific meals?",
        answer: "We offer a variety of options including high-protein, vegetarian, and low-carb meals. Check the tags on each meal card for details."
    }
];

const FAQ = () => {
    return (
        <section className="py-24 bg-base-100 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                
                 <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4">Questions?</h4>
                        <h2 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
                            Frequently Asked <span className="text-primary decoration-1 underline-offset-8">Questions</span>
                        </h2>
                    </motion.div>
                    
                    <div className="flex justify-center mt-6">
                        <span className="w-16 h-1 bg-primary rounded-full inline-block"></span>
                        <span className="w-4 h-1 bg-primary/30 rounded-full inline-block mx-1"></span>
                        <span className="w-2 h-1 bg-primary/20 rounded-full inline-block"></span>
                    </div>
                </div>

                {/* --- FAQ Accordion --- */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="collapse collapse-plus bg-base-200 rounded-[2rem] border border-base-content/5 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <input type="radio" name="my-accordion-3" defaultChecked={index === 0} /> 
                            
                            <div className="collapse-title text-lg md:text-xl font-bold text-base-content py-5 px-8">
                                {faq.question}
                            </div>
                            
                            <div className="collapse-content px-8 text-base-content/70"> 
                                <p className="pb-5 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                 <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 text-center"
                >
                    <p className="text-base-content/60">
                        Still have questions? <Link to="/contact" className="text-primary font-bold cursor-pointer hover:underline">Contact our support team</Link>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;