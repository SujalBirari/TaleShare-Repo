const WikiSection = () => {
    const benefits = [
        "Visually map relationships between entities.",
        "Track events on an interactive timeline.",
        "AI-powered Lore Keeper to answer questions about your canon."
    ];

    return (
        <div className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                        A Living Wiki for Your Universe.
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        Stop scattering your notes. TaleShare gives you a powerful, built-in wiki. Create rich profiles
                        for your <span className="font-medium text-indigo-600 dark:text-indigo-400">Characters</span>,
                        detailed descriptions of your <span className="font-medium text-indigo-600 dark:text-indigo-400">Locations</span>, and
                        flexible entries for your <span className="font-medium text-indigo-600 dark:text-indigo-400">Lore</span>.
                    </p>

                    <ul className="mt-6 space-y-4">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                                {/* Checkmark Icon */}
                                <svg className="shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="ml-3 text-base text-gray-500 dark:text-gray-400">
                                    {benefit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image Content */}
                <div className="mt-10 md:mt-0">
                    <img
                        className="rounded-lg shadow-xl w-full h-auto"
                        src="https://placehold.co/600x450/e0e7ff/312e81?text=Character+Sheet+UI&font=inter"
                        alt="Mockup of a character profile page"
                    />
                </div>

            </div>
        </div>
    );
};

export default WikiSection;