"use client";

import { useRouter } from 'next/navigation';
import { PRODUCTS } from '../../../lib/products';
import BuyButton from '../../../components/BuyButton';

const PRODUCT_DETAILS = {
  'python-beginner-level': {
    solves:
      'You know a bit of Python syntax from YouTube or college labs, but freeze when asked to build a small project or solve a real problem.',
    whoFor:
      'Absolute beginners, first–second year students, and anyone switching into programming who wants a gentle but practical start.',
    inside: [
      'Concise notes on core Python concepts (variables, loops, functions, lists, dictionaries).',
      'Solved examples for common exam and interview-style questions.',
      'Mini projects you can run locally to build confidence.',
      'Cheatsheets you can quickly scan before tests or coding rounds.'
    ],
    success:
      'By the end, you should be able to read most beginner Python code, write short scripts on your own, and feel ready to attempt basic coding questions without copying from others.'
  },
  'python-intermediate-level': {
    solves:
      'You can write basic Python, but struggle with organising code, handling errors, and working with files or slightly larger projects.',
    whoFor:
      'Learners who finished a beginner course or semester and now want to move towards interview-level and project-ready Python.',
    inside: [
      'Clear explanations and examples for OOP (classes, objects, inheritance).',
      'Error handling patterns with try/except and real examples.',
      'File I/O templates for reading/writing CSV, text, and JSON.',
      'Intermediate practice questions plus guided project ideas.'
    ],
    success:
      'You&apos;ll be able to structure small projects, debug common errors, and comfortably tackle intermediate Python questions in interviews or exams.'
  },
  'c-beginner-level': {
    solves:
      'C feels intimidating with pointers and memory, and college notes are either too short or too theoretical.',
    whoFor:
      'First-time C learners in school/college who want clear, example-driven notes to survive labs and exams.',
    inside: [
      'Step-by-step explanations of syntax, data types, and control flow.',
      'Worked-out examples for each concept, not just definitions.',
      'Practice questions you can quickly run and tweak.',
      'Short summaries at the end of each topic for revision.'
    ],
    success:
      'By the end you should feel comfortable reading and writing small C programs and passing most beginner-level viva or lab evaluations.'
  },
  'c-intermediate-level': {
    solves:
      'You passed the basics of C but pointers, dynamic memory, and structures still feel confusing when used together.',
    whoFor:
      'Students preparing for systems, OS, or DSA courses where solid C understanding is required.',
    inside: [
      'Focused notes on pointers, arrays, and strings with diagrams.',
      'Memory management patterns with malloc/free examples.',
      'Structures and user-defined types used in mini projects.',
      'Practice sets that combine multiple concepts in one program.'
    ],
    success:
      'You&apos;ll be able to follow and write non-trivial C programs, which makes upcoming DSA and systems subjects much less stressful.'
  },
  'eda-beginner-level': {
    solves:
      'You&apos;ve seen EDA terms like &quot;outliers&quot; and &quot;distributions&quot; but don&apos;t know how to actually explore a dataset from scratch.',
    whoFor:
      'Beginner data science aspirants who know basic Python and want a guided first EDA workflow.',
    inside: [
      'Notebooks that walk you from raw CSV to cleaned dataset.',
      'Examples of handling missing values and basic feature checks.',
      'Starter visualisations with clear, commented code.',
      'Checklists to repeat the same process on your own datasets.'
    ],
    success:
      'You&apos;ll know how to open a new dataset, ask the right first questions, and produce simple but meaningful EDA summaries.'
  },
  'eda-intermediate-level': {
    solves:
      'You can do basic plots, but struggle to go deeper into feature relationships and storytelling with data.',
    whoFor:
      'Learners who completed beginner EDA or basic data analysis courses and now want more structure and depth.',
    inside: [
      'Notebooks focusing on feature engineering and transformations.',
      'Side-by-side visualisations that compare multiple variables.',
      'Examples of turning EDA findings into short written insights.',
      'Reusable templates for project or portfolio EDA reports.'
    ],
    success:
      'You&apos;ll be able to run end-to-end EDA for small projects, explain your findings clearly, and reuse the same workflow for interviews or portfolios.'
  }
};

export default function ProductDetail({ params }) {
  const router = useRouter();
  const product = PRODUCTS.find((p) => p._id === params.id);
  if (!product) return <p>Product not found.</p>;

  const details = PRODUCT_DETAILS[product._id];

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition mb-2"
        aria-label="Go back"
        style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
      >
        <span aria-hidden="true" style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center' }}>&larr;</span>
        Back
      </button>
      {/* ...existing code... */}
        <p
          className="text-sm uppercase"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {product.category}
        </p>
        <h1
          className="text-3xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {product.title}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {product.description}
        </p>
        <p className="text-2xl font-semibold text-brand-accent">₹{product.price}</p>
        <BuyButton
          productId={product._id}
          price={product.price}
          title={product.title}
        />
      </div>

      {details && (
        <div className="grid md:grid-cols-2 gap-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              What this kit solves
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {details.solves}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Who it&apos;s for
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {details.whoFor}
            </p>
          </section>

          <section className="space-y-2 md:col-span-2">
            <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              What&apos;s inside each kit
            </h2>
            <ul className="list-disc pl-5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {details.inside.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-2 md:col-span-2">
            <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              What success looks like
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {details.success}
            </p>
          </section>
        </div>
      )}

      <section className="border rounded-md p-4 space-y-2" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Download & access
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Your download link will be available immediately after payment on the thank-you page, and a copy will also be sent to your email.
        </p>
        <ul className="list-disc pl-5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <li>
            Didn&apos;t receive the email? Please check your spam or promotions folder first—sometimes emails take a little longer to arrive.
          </li>
          <li>
            Still no luck? Just contact us and we&apos;ll resend your download link as soon as possible.
          </li>
          <li>
            Thanks for choosing us and supporting what we do.
          </li>
          <li>
            Happy learning and enjoy your purchase!
          </li>
        </ul>
      </section>
    </div>
  );
}
