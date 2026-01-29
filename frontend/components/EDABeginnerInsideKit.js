import Image from 'next/image';

const INSIDE_KIT_BLOCKS = [
  {
    image: '/eda-main-page/beginner/beginner1.png',
    alt: 'Beginner EDA Concepts',
    text:
      'Start with beginner-friendly notebooks that walk through core EDA concepts, basic visualizations, and step-by-step workflows on simple datasets.',
  },
  {
    image: '/eda-main-page/beginner/beginner2.png',
    alt: 'Guided Practice Notebooks',
    text:
      'Practice what you learn using guided notebooks that help you explore data, clean it, and answer practical questions with clear instructions.',
  },
  {
    image: '/eda-main-page/beginner/beginner3.png',
    alt: 'Checks and Exercises',
    text:
      'Reinforce your understanding with short checks, mini tasks, and recap exercises so you build confidence before moving to intermediate-level EDA.',
  },
];

export default function EDABeginnerInsideKit() {
  return (
    <section className="space-y-10 py-6">
      <h2
        className="text-base font-semibold mb-4"
        style={{ color: 'var(--color-text-primary)' }}
      >
        What&apos;s inside the kit
      </h2>
      <div className="space-y-10">
        {INSIDE_KIT_BLOCKS.map((block, idx) => (
          <div
            key={block.alt}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              idx % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
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
              <p className="text-lg text-gray-800 font-medium max-w-lg">
                {block.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
