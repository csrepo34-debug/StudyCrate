import Image from 'next/image';

export default function ProgrammingIntro() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 py-10 md:py-16 px-4 md:px-12">
      <div className="flex-1 order-2 md:order-1">
        <h2 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Read. Practice. Test.
        </h2>
        <p className="text-lg max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Learn Python and C through a structured, outcome-focused approach. Each kit combines clear theory PDFs, hands-on coding exercises and projects, and challenge-style tests so you can move from syntax to complete programs with confidence.
          <br /><br />
          <b>Designed for students, developers, and anyone building a strong programming foundation.</b>
        </p>
      </div>
      <div className="flex-1 flex justify-center order-1 md:order-2">
        <Image
          src="/prog-lang-main-page/prog-lang-1.png"
          alt="Programming Read Practice Test"
          width={400}
          height={300}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    </section>
  );
}
