import Image from 'next/image';

export default function DataAnalysisIntro() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 py-10 md:py-16 px-4 md:px-12">
      <div className="flex-1 order-2 md:order-1">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 text-gray-900">
          Assess. Monitor. Measure : <span className="text-brand-accent">Read. Practice. Test.</span>
        </h2>
        <p className="text-lg text-gray-700 max-w-lg">
          Our kits are designed to help you build real data skills: read through practical guides, practice with hands-on exercises, and test your understanding with real-world datasets.
        </p>
      </div>
      <div className="flex-1 flex justify-center order-1 md:order-2">
        <Image
          src="/EDA%20main%20page/7172-combine.png"
          alt="Assess Monitor Measure"
          width={400}
          height={300}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    </section>
  );
}
