import Image from 'next/image';

export default function ProgrammingHero({ onCTAClick }) {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between py-10 md:py-20 px-4 md:px-12 bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="flex-1 z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Programming Language Kits
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
          Move from syntax to real programs with structured paths for Python and C, split into beginner and intermediate levels.
        </p>
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md shadow transition"
          onClick={onCTAClick}
        >
          Explore Kits
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
        <Image
          src="/prog-lang-main-page/prog-lang-1.png"
          alt="Programming Languages Hero"
          width={420}
          height={320}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    </section>
  );
}
