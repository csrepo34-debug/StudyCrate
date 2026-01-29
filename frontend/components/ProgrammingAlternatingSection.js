export default function ProgrammingAlternatingSection() {
  const sections = [
    {
      video: '/prog-lang-main-page/prog-read.mkv',
      text:
        'Read: Start with well-structured PDFs and guides that explain Python and C programming concepts, syntax, and best practices in a clear, concise way. Each unit breaks down ideas step by step with practical examples and checklists.',
    },
    {
      video: '/prog-lang-main-page/prog-practice.mkv',
      text:
        'Practice: Apply what you learn using hands-on coding exercises and projects for Python and C. These practical tasks help you implement programming techniques, explore language features, and build confidence through guided practice.',
    },
    {
      video: '/prog-lang-main-page/prog-test.mkv',
      text:
        'Test: Test your understanding with exercise-based coding challenges and quizzes that reinforce core programming concepts and prepare you for real-world projects and interviews.',
    },
  ];

  return (
    <section className="space-y-12 py-10 md:py-16 px-4 md:px-12">
      {sections.map((sec, idx) => (
        <div
          key={idx}
          className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
        >
          <div className="flex-1 w-full md:w-1/2">
            <video
              src={sec.video}
              controls
              className="rounded-lg shadow-lg w-full h-auto object-cover bg-black"
            />
          </div>
          <div className="flex-1 w-full md:w-1/2">
            <p className="text-lg font-medium max-w-lg" style={{ color: 'var(--color-text-primary)' }}>
              {sec.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
