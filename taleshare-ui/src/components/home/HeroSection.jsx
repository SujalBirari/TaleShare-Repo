import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 transition-colors duration-300">

                    {/* SVG Polygon Shape */}
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-900 transform translate-x-1/2 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Share your Tale. </span>
                                <span className="block text-indigo-600 dark:text-indigo-400 xl:inline">Build your Verse.</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                The collaborative social writing platform for writers, world-builders, and fans. Create intricate universes and co-author their stories, together.
                            </p>

                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link
                                        to="/editor"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:bg-linear-to-l focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-md md:py-4 md:text-lg md:px-10"
                                    >
                                        Start Writing Now
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    {/* Note: Anchor tags are fine for in-page scrolling IDs */}
                                    <a
                                        href="#features"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-colors"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="https://placehold.co/1000x800/6366f1/ffffff?text=Build+Your+Verse&font=inter"
                    alt="Fantasy world map placeholder"
                />
            </div>
        </div>
    );
};

export default HeroSection;