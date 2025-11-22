import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                    Ready to build your first Verse?
                </h2>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    Join the community of Tellers, world-builders, and fans today. It's free to start.
                </p>
                <Link
                    to="/register"
                    className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:w-auto transition-colors shadow-md hover:shadow-lg"
                >
                    Sign Up for Free
                </Link>
            </div>
        </div>
    );
};

export default CTASection;