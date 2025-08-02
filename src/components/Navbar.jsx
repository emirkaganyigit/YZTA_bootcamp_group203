export default function Navbar() {
  return (
    <nav className="h-20 bg-blue-900 flex items-center justify-center shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="text-white text-2xl">🏥</div>
        <div className="text-white">
          <h1 className="text-2xl font-bold">HealthWise</h1>
          <p className="text-sm text-blue-200">Sağlık Analiz Platformu</p>
        </div>
      </div>
    </nav>
  );
}
