const MuseSection = () => {
    const benefits = [
        "AI Co-Writer to help with description, dialogue, and plot.",
        "Image Generation for characters, locations, and cover art."
    ];

    return (
        <div className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Text Content - Pushed to the right on desktop */}
                <div className="mt-10 md:mt-0 md:order-2">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                        Meet Your AI Muse.
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        Beat writer's block with "The Muse," our integrated AI assistant. Generate character portraits
                        from a description, visualize a stunning location, or get a helping hand to continue a difficult
                        scene.
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

                {/* Image Content - Pulled to the left on desktop */}
                <div className="md:order-1">
                    <img
                        className="rounded-lg shadow-xl w-full h-auto"
                        src="https://placehold.co/600x450/c7d2fe/312e81?text=AI+Image+Generation&font=inter"
                        alt="Mockup of AI generation tools"
                    />
                </div>

            </div>
        </div>
    );
};

export default MuseSection;