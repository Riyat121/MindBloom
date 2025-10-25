export default function Features() {
  const features = [
    { title: "Quick check-ins", desc: "Log mood in seconds, anytime." },
    { title: "Offline support", desc: "Works offline and syncs later." },
    { title: "Insights", desc: "See trends and patterns over time." },
  ];
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="p-6 bg-white rounded-lg shadow-sm">
              <div className="font-semibold">{f.title}</div>
              <div className="text-sm text-gray-600 mt-2">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
