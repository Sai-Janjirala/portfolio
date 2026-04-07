const Footer = () => {
    return (
        <footer className="py-8 relative text-center overflow-hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md border-t border-white/5" />
            <div className="container mx-auto px-4 relative z-10">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Portfolio. Built with React & Tailwind.
                </p>
                <p className="text-gray-600 text-xs mt-2">
                    Crafted with <span className="text-red-500/80">❤</span> and code.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
