export default function Reviews() {
  const reviews = [
    { name: "Teacher A", text: "Great for classrooms." },
    { name: "Student B", text: "Helps me track my mood." },
  ];
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 className="text-lg font-bold mb-4">What people say</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map(r => (
            <div key={r.name} className="p-4 bg-white rounded shadow-sm">
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm text-gray-600 mt-2">{r.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
