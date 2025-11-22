const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 dark:bg-gray-950 dark:text-gray-500 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* This div is empty in your original code, likely a placeholder for future social icons */}
                <div className="flex justify-center space-x-6">
                </div>

                <p className="mt-8 text-center text-base">
                    &copy; {new Date().getFullYear()} TaleShare. All rights reserved. The Journey Begins.
                </p>
            </div>
        </footer>
    );
};

export default Footer;