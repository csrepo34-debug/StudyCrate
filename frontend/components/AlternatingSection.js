export default function AlternatingSection() {
  // Placeholder video and text content for three rows
  const sections = [
    {
      video: '/EDA%20main%20page/read.mkv',
      text: 'Read: Start with well-structured PDF guides that explain Exploratory Data Analysis concepts, workflows, and best practices in a clear, concise way. Each unit breaks down ideas step by step with practical examples and checklists.'
    },
    {
      video: '/EDA%20main%20page/practice.mkv',
      text: 'Practice: Apply what you learn using hands-on Jupyter notebooks and real datasets. These practical notebooks help you implement EDA techniques, explore data patterns, and build confidence through guided practice.'
    },
    {
      video: '/EDA%20main%20page/test.mkv',
      text: 'Test: Test your understanding with exercise-based notebooks and mini tasks that reinforce core EDA concepts and prepare you for real-world analysis, projects, and interviews.'
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
