import Image from 'next/image';

const INSIDE_KIT_BLOCKS = [
  {
    image: '/eda-main-page/beginner/beginner1.png',
    alt: 'Getting Started with EDA',
    text: 'Step-by-step notebooks introducing you to the basics of data analysis, including understanding data context and using essential Python libraries.'
  },
  {
    image: '/eda-main-page/beginner/beginner2.png',
    alt: 'Practice Notebooks',
    text: 'Practice your skills with beginner-friendly notebooks focused on data inspection, handling missing values, and univariate analysis.'
  },
  {
    image: '/eda-main-page/beginner/beginner3.png',
    alt: 'EDA Exercises',
    text: 'Test your understanding with simple EDA exercises and challenges designed to build your confidence and foundational skills.'
  }
];

export default function EDABeginnerInsideKit() {
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
