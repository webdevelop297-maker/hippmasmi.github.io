import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Sejarah = () => {
  const timelineData = [
    {
      tahun: "2010",
      judul: "Pendirian Organisasi",
      deskripsi: "Organisasi didirikan oleh sekelompok aktivis muda yang memiliki visi untuk memajukan bangsa melalui pemberdayaan generasi muda."
    },
    {
      tahun: "2012",
      judul: "Ekspansi Regional",
      deskripsi: "Membuka cabang di 5 provinsi besar dan mulai menjalankan program-program pemberdayaan masyarakat secara nasional."
    },
    {
      tahun: "2015",
      judul: "Pengakuan Resmi",
      deskripsi: "Memperoleh pengakuan resmi dari pemerintah dan menjadi mitra dalam berbagai program pembangunan nasional."
    },
    {
      tahun: "2018",
      judul: "Program Digitalisasi",
      deskripsi: "Meluncurkan platform digital untuk mempermudah koordinasi antar cabang dan pengelolaan data keanggotaan."
    },
    {
      tahun: "2020",
      judul: "Adaptasi Pandemi",
      deskripsi: "Berhasil beradaptasi dengan situasi pandemi dengan mendigitalkan seluruh kegiatan dan program organisasi."
    },
    {
      tahun: "2023",
      judul: "Rebranding & Modernisasi",
      deskripsi: "Melakukan rebranding organisasi dan modernisasi sistem manajemen untuk meningkatkan efektivitas kinerja."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Sejarah HIPPMA</h1>
          <p className="text-xl text-muted-foreground">
            Perjalanan panjang Himpunan Pemuda Pelajar Mahasiswa Sukabumi dalam membangun bangsa
          </p>
        </div>

        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary text-center">Latar Belakang</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-center">
              Himpunan Pemuda Pelajar dan Mahasiswa Sukabumi, atau disingkat HIPPMA Sukabumi, adalah 
              sebuah organisasi yang didirikan pada tanggal 3 Mei 2022 di Kabupaten Sukabumi, Jawa Barat.
               Organisasi ini memiliki fokus utama pada pemberdayaan pemuda, pelajar, dan mahasiswa yang 
               memiliki kepedulian terhadap kegiatan-kegiatan sosial masyarakat. Himpunan Pemuda Pelajar 
               Mahasiswa (HIPPMA) adalah salah satu organisasi kepemudaan yang aktif dalam berbagai 
               bidang, terutama dalam hal sosial, pendidikan, dan kesehatan. Organisasi ini merupakan 
               wadah bagi pemuda, pelajar, dan mahasiswa untuk bersama-sama berkontribusi dalam 
               pembangunan sumber daya manusia khususnya pemuda melalui berbagai program.

            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Timeline Perjalanan</h2>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-primary"></div>
            
            {timelineData.map((item, index) => (
              <div key={index} className="relative flex items-start mb-8">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center z-10">
                  <span className="text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                
                <Card className="ml-6 flex-1 shadow-card hover:shadow-hover transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-accent/10 px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-accent">{item.tahun}</span>
                      </div>
                      <CardTitle className="text-lg text-foreground">{item.judul}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.deskripsi}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-card mt-12">
          <CardHeader>
            <CardTitle className="text-primary text-center">Visi Masa Depan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-center">
              Dengan pengalaman lebih dari satu dekade, organisasi terus berkomitmen untuk menjadi katalis 
              perubahan positif di Indonesia. Kami yakin bahwa dengan kader-kader berkualitas dan program-program 
              inovatif, organisasi akan terus berkontribusi dalam membangun Indonesia yang lebih maju dan sejahtera.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sejarah;