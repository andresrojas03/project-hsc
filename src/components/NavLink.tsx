'use client';
import {motion} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import Link from 'next/link';

interface NavLinkProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
}

export const NavLink = ({ title, description, icon, href}: NavLinkProps) => {
    return(
        <Link href={href} className="block w-full">
            <motion.button whileHover={{ scale: 1.02, y: -4, transition: {duration: 0.02, ease: "easeOut"}}} whileTap={{ scale: 1.05, transition: {type: "spring", stiffness: 500, damping: 15}}} className="flex items-center justify-between p-6 bg-slate-950/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-800 hover:border-lime-500/50 transition-all w-full group">
                <div className="flex items-center gap-5">
                    <div className={["p-4 bg-slate-800 rounded-xl text-violet-300",
                            "group-hover:bg-firefly-lime group-hover:text-slate-950",
                            "group-hover:animate-glow",
                            "group-hover:shadow-[0_0_20px_rgba(204,255,0,0,0.5)]",
                            ].join(' ')}>  
                        {icon}
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-slate-100 group-hover:text-lime-300 transition-colors">{title}</h3>
                        <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{description}</p>
                    </div>
                </div>
                <ArrowRight className="text-slate-600 group-hover:text-lime-400 transition-colors" size={24}></ArrowRight>
            </motion.button>
    </Link>
    )
}