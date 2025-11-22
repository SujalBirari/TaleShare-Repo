import CoreConcepts from '../components/home/CoreConcepts';
import CTASection from '../components/home/CTASection';
import HeroSection from '../components/home/HeroSection';
import FeatureSplitSection from '../components/home/FeatureSplitSection';

const Home = () => {
    const splitSectionsData = [
        {
            id: 'wiki-section',
            title: "A Living Wiki for Your Universe.",
            description: (
                <>
                    Stop scattering your notes. TaleShare gives you a powerful, built-in wiki. Create rich profiles
                    for your <span className="font-medium text-indigo-600 dark:text-indigo-400">Characters</span>,
                    detailed descriptions of your <span className="font-medium text-indigo-600 dark:text-indigo-400">Locations</span>, and
                    flexible entries for your <span className="font-medium text-indigo-600 dark:text-indigo-400">Lore</span>.
                </>
            ),
            benefits: [
                "Visually map relationships between entities.",
                "Track events on an interactive timeline.",
                "AI-powered Lore Keeper to answer questions about your canon."
            ],
            imageSrc: "https://placehold.co/600x450/e0e7ff/312e81?text=Character+Sheet+UI&font=inter",
            imageAlt: "Mockup of a character profile page",
            imageAtLeft: false, // Image on Right
            isDarkBackground: false // White background
        },
        {
            id: 'muse-section',
            title: "Meet Your AI Muse.",
            description: (
                <>
                    Beat writer's block with "The Muse," our integrated AI assistant. Generate character portraits
                    from a description, visualize a stunning location, or get a helping hand to continue a difficult
                    scene.
                </>
            ),
            benefits: [
                "AI Co-Writer to help with description, dialogue, and plot.",
                "Image Generation for characters, locations, and cover art."
            ],
            imageSrc: "https://placehold.co/600x450/c7d2fe/312e81?text=AI+Image+Generation&font=inter",
            imageAlt: "Mockup of AI generation tools",
            imageAtLeft: true, // Image on Left (ZigZag)
            isDarkBackground: true // Gray background
        }
    ];

    return (
        <div id="home-page">
            <HeroSection />
            <CoreConcepts />
            {splitSectionsData.map((section) => (
                <FeatureSplitSection
                    key={section.id}
                    {...section}
                />
            ))}
            <CTASection />
        </div>
    );
};

export default Home;