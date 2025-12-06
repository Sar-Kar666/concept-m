import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5227FF]/10 to-[#FF9FFC]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;