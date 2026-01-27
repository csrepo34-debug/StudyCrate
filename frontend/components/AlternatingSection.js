export default function AlternatingSection() {
  // Placeholder video and text content for three rows
  const sections = [
    {
      video: '/EDA%20main%20page/read.mkv',
      text: 'Read: Start with clear, concise guides that break down EDA concepts and workflows. Each kit includes step-by-step explanations and practical checklists.'
    },
    {
      video: '/EDA%20main%20page/practice.mkv',
      text: 'Practice: Apply what you learn with hands-on exercises and real datasets. Our interactive notebooks help you build confidence and skill.'
    },
    {
      video: '/EDA%20main%20page/test.mkv',
      text: 'Test: Check your understanding with quizzes and mini-projects that reinforce key ideas and prepare you for real analysis.'
    }
  ];

  return (
    <section className="space-y-12 py-10 md:py-16 px-4 md:px-12">
      {sections.map((sec, idx) => (
        <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
          <div className="flex-1 w-full md:w-1/2">
            <video
              src={sec.video}
              controls
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1 w-full md:w-1/2">
            <p className="text-lg text-gray-800 font-medium max-w-lg">{sec.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
