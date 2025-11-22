const FeatureSplitSection = ({
    title,
    description,
    benefits,
    imageSrc,
    imageAlt,
    imageAtLeft = false,
    isDarkBackground = false
}) => {

    // Base background colors
    const bgClass = isDarkBackground
        ? "bg-gray-50 dark:bg-gray-800"
        : "bg-white dark:bg-gray-900";

    // Highlight color logic
    const highlightClass = "font-medium text-indigo-600 dark:text-indigo-400";

    // Function to render description with highlighted spans (if passed as HTML/ReactNode, 
    // but for simplicity here we will just render the text. If you need specific words 
    // highlighted dynamically, passing the description as a JSX element is better. 
    // For this refactor, I will treat description as a simple string or allow passing JSX).

    return (
        <div className={`py-24 transition-colors duration-300 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* TEXT CONTENT LOGIC:
                   If image is at Left, Text must be at Right (Order 2).
                   On Mobile, Text usually stays on top, so we keep default order unless specified.
                   In your previous MuseSection, Text was first in DOM but visually swapped.
                */}
                <div className={`
                    ${imageAtLeft ? 'md:order-2 mt-10 md:mt-0' : ''}
                `}>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                        {title}
                    </h2>
                    <div className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        {/* We render description as-is, assuming it might be a string or JSX */}
                        {description}
                    </div>

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

                {/* IMAGE CONTENT LOGIC:
                   If image is at Left, it gets Order 1.
                */}
                <div className={`
                    ${imageAtLeft ? 'md:order-1' : 'mt-10 md:mt-0'}
                `}>
                    <img
                        className="rounded-lg shadow-xl w-full h-auto"
                        src={imageSrc}
                        alt={imageAlt}
                    />
                </div>

            </div>
        </div>
    );
};

export default FeatureSplitSection;