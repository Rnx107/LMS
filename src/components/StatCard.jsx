export default function StatCard({ title, value, icon, color }) {
  return (
    <div className={`flex items-center gap-4 p-5 rounded-xl text-white ${color}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}