import Image from 'next/image';

const INSIDE_KIT_BLOCKS = [
  {
    image: '/eda-main-page/data-analysis-1.png',
    alt: 'Feature Engineering',
    text: 'Hands-on notebooks focused on feature engineering, transformations, and relationship analysis. Work with real datasets and learn how to create meaningful features that unlock deeper insights.'
  },
  {
    image: '/eda-main-page/data-analysis-1.png',
    alt: 'Practice Notebooks',
    text: 'Apply EDA techniques through guided practice notebooks and mini-projects. Learn to analyze data the way it’s done in real-world data analysis tasks.'
  },
  {
    image: '/eda-main-page/data-analysis-1.png',
    alt: 'EDA Exercises',
    text: 'Test your understanding with targeted EDA challenges designed to strengthen problem-solving skills and build confidence for interviews and portfolio projects.'
  }
];

export default function EDAIntermediateInsideKit() {
  return (
    <section className="space-y-10 py-6">
      <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        What&apos;s inside the kit
      </h2>
      <div className="space-y-10">
        {INSIDE_KIT_BLOCKS.map((block, idx) => (
          <div
            key={block.alt}
            className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-1 flex justify-center">
              <Image
                src={block.image}
                alt={block.alt}
                width={320}
                height={240}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-800 font-medium max-w-lg">{block.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
