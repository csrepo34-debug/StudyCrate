import Image from 'next/image';

const edaBeginnerModules = [
  'Understanding Data Problem Context',
  'Python Libraries for EDA',
  'Basic Data Inspection',
  'Handling Missing Values',
  'Univariate Analysis',
  'Outlier Detection Treatment',
];

export default function EDABeginnerPage() {
  return (
    <section className="flex flex-col gap-12 py-10 md:py-16 px-4 md:px-12">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-sans">
            Exploratory Data Analysis Beginner
          </h2>
          <p className="text-gray-700 max-w-xl font-sans mb-4">
            Start your data analysis journey with a beginner-friendly, outcome-focused approach. Each unit includes clear theory PDFs, hands-on practice notebooks, and exercise-based tests using real-world datasets to help you build practical data analysis skills.
            <br /><br />
            <b>Perfect for students, developers, and aspiring data analysts.</b>
          </p>
          <ul className="list-disc pl-6 text-gray-800 font-sans">
            {edaBeginnerModules.map((module, idx) => (
              <li key={idx} className="mb-1">{module}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-6 order-1 md:order-2">
          <Image
            src="/eda-main-page/beginner/beginner1.png"
            alt="EDA Beginner 1"
            width={800}
            height={533}
            className="rounded-lg shadow-lg object-cover"
            priority
          />
          <Image
            src="/eda-main-page/beginner/beginner2.png"
            alt="EDA Beginner 2"
            width={800}
            height={533}
            className="rounded-lg shadow-lg object-cover"
          />
          <Image
            src="/eda-main-page/beginner/beginner3.png"
            alt="EDA Beginner 3"
            width={800}
            height={533}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
