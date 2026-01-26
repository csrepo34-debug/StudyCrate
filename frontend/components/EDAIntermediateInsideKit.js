import Image from 'next/image';

const INSIDE_KIT_BLOCKS = [
  {
    image: '/images/7172-combine.png',
    alt: 'Feature Engineering',
    text: 'Notebooks focusing on feature engineering and transformations. Tackle real datasets and learn how to create new features that reveal deeper insights.'
  },
  {
    image: '/images/7172-combine.png',
    alt: 'Practice Notebooks',
    text: 'Practice notebooks: Apply your skills with hands-on exercises and guided projects, just like in real-world analysis.'
  },
  {
    image: '/images/7172-combine.png',
    alt: 'EDA Exercises',
    text: 'Exercises: Test your understanding with targeted EDA challenges and build confidence for interviews or portfolio work.'
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
