import Navbar from "../../../components/Navbar";

type Params = Promise<{ category: string }>;

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { category } = await params;

  return (
    // Background putih, teks hitam
    <div className="bg-white min-h-screen text-black pt-32">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        {/* Judul dengan kontras tinggi */}
        <h1 className="text-5xl font-extrabold mb-6 capitalize border-b border-black pb-4">
          {category.replace('-', ' ')}
        </h1>
        
        {/* Deskripsi minimalis */}
        <p className="text-gray-600 text-lg leading-relaxed">
          Ini adalah halaman detail untuk layanan <strong>{category.replace('-', ' ')}</strong>. 
          Kami menyajikan informasi ini dengan pendekatan desain minimalis untuk menjaga fokus pada konten utama.
        </p>

        {/* Contoh elemen tambahan monokrom */}
        <div className="mt-12 p-8 border border-black rounded-lg">
            <h3 className="font-bold mb-2">Informasi Layanan</h3>
            <p className="text-sm text-gray-500">Detail spesifik mengenai {category.replace('-', ' ')} akan ditampilkan di sini dengan estetika monokrom.</p>
        </div>
      </div>
    </div>
  );
}