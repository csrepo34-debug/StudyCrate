import Image from 'next/image';

export default function DataAnalysisIntro() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 py-10 md:py-16 px-4 md:px-12">
      <div className="flex-1 order-2 md:order-1">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 font-sans">
          Read. Practice. Test.
        </h2>
        <p className="text-xl md:text-2xl font-medium text-gray-700 max-w-2xl font-sans">
          Learn Exploratory Data Analysis through a structured, outcome-focused approach. Each unit includes clear theory PDFs, hands-on practice notebooks, and exercise-based tests using real-world datasets to help you build practical data analysis skills.
          <br /><br />
          <b>Designed for students, developers, and aspiring data analysts.</b>
        </p>
      </div>
      <div className="flex-1 flex justify-center order-1 md:order-2">
        <Image
          src="/eda-main-page/data-analysis-2.png"
          alt="Read Practice Test"
          width={400}
          height={300}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    </section>
  );
}
