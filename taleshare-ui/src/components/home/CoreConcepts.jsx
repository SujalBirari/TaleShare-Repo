const concepts = [
    {
        title: "1. Build Your Verse",
        description: "Create a deep, living world. Define your Verse with wiki-like entities for Characters, Locations, and Lore systems.",
        // Globe Icon Path
        iconPath: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.92 11.92 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686-2.253A8.959 8.959 0 003 12c0-.778.099-1.533.284-2.253m0 0A11.92 11.92 0 0012 7.5c2.998 0 5.74 1.1 7.843 2.918"
    },
    {
        title: "2. Write Your Tale",
        description: "Use our minimalist, AI-powered editor to write standalone stories or new Tales that inhabit a Verse. Your focus, your words.",
        // Pen Icon Path
        iconPath: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
    },
    {
        title: "3. Collaborate on Worlds",
        description: "Don't just read—collaborate. Join forces with other authors to expand shared universes and weave intersecting storylines.",
        // Group/Doc Icon Path
        iconPath: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12m-3.75 0H8.25m9.75 0v.003c0 .191-.106.357-.257.427a.469.469 0 01-.52.043l-1.063-.426a.469.469 0 00-.436 0l-1.063.426a.469.469 0 01-.52-.043A.461.461 0 0112 18.75v-.003M18.75 12.75h-7.5m-3 0h-3.75m14.25 0H18.75m-3 0h.008v.008h-.008v-.008z"
    }
];

const CoreConcepts = () => {
    return (
        <div id="core-concepts" className="py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                        A New Way to Collaborate
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
                        TaleShare is built on three core ideas, designed for you.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-3">
                    {concepts.map((concept) => (
                        <div key={concept.title} className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-600 text-white shadow-lg">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={concept.iconPath} />
                                </svg>
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-gray-100">
                                {concept.title}
                            </h3>
                            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                {concept.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoreConcepts;