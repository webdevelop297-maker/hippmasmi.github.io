import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Sejarah = () => {
  const timelineData = [
    {
      tahun: "2010",
      judul: "Pendirian Organisasi",
      deskripsi:
        "Organisasi didirikan oleh sekelompok aktivis muda yang memiliki visi untuk memajukan bangsa melalui pemberdayaan generasi muda.",
    },
    {
      tahun: "2012",
      judul: "Ekspansi Regional",
      deskripsi:
        "Membuka cabang di 5 provinsi besar dan mulai menjalankan program-program pemberdayaan masyarakat secara nasional.",
    },
    {
      tahun: "2015",
      judul: "Pengakuan Resmi",
      deskripsi:
        "Memperoleh pengakuan resmi dari pemerintah dan menjadi mitra dalam berbagai program pembangunan nasional.",
    },
    {
      tahun: "2018",
      judul: "Program Digitalisasi",
      deskripsi:
        "Meluncurkan platform digital untuk mempermudah koordinasi antar cabang dan pengelolaan data keanggotaan.",
    },
    {
      tahun: "2020",
      judul: "Adaptasi Pandemi",
      deskripsi:
        "Berhasil beradaptasi dengan situasi pandemi dengan mendigitalkan seluruh kegiatan dan program organisasi.",
    },
    {
      tahun: "2023",
      judul: "Rebranding & Modernisasi",
      deskripsi:
        "Melakukan rebranding organisasi dan modernisasi sistem manajemen untuk meningkatkan efektivitas kinerja.",
    },
  ];

  const testimoniTokoh = [
    {
      nama: "	Drs. H.Marwan Hamami, M.M.",
      jabatan: "Bupati Sukabumi Masa jabatan 2016 – 2025",
      foto: "/tokoh1.jpg",
      pesan:
        "HIPPMA Sukabumi merupakan salah satu organisasi kepemudaan yang memiliki peran dan konstribusi dalam perubahan sosial untuk mendorong pembangunan daerah",
    },
    {
      nama: "Yandra Utama Santosa, S.P",
      jabatan: "Ketua KNPI KAB. Sukabumi",
      foto: "/tokoh2.png",
      pesan:
        "HIPPMA Sukabumi adalah organisasi kepemudaan yang membantu mewujudkan kabupaten sukabumi layak pemuda.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Judul */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sejarah HIPPMA
          </h1>
          <p className="text-xl text-muted-foreground">
            Perjalanan panjang Himpunan Pemuda Pelajar Mahasiswa Sukabumi dalam
            membangun bangsa
          </p>
        </div>

        {/* Latar Belakang */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary text-center">
              Latar Belakang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-center">
              HIPPMA Sukabumi, singkatan dari Himpunan Pemuda Pelajar Mahasiswa Sukabumi, 
              merupakan sebuah organisasi kepemudaan yang lahir dari semangat kolaborasi, 
              kepedulian sosial, dan kesadaran akan pentingnya peran pemuda dalam membangun 
              daerah. Organisasi ini berawal dari sebuah gerakan kecil yang digagas oleh 
              Rahman Abbizard Mushaf, seorang mahasiswa yang memiliki jiwa kepemimpinan dan 
              semangat organisatoris yang tinggi.
      
            </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Timeline Perjalanan
          </h2>

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
                        <span className="text-sm font-bold text-accent">
                          {item.tahun}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-foreground">
                        {item.judul}
                      </CardTitle>
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

        {/* Testimoni Tokoh */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            WHAT THEY SAY ABOUT HIPPMA
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimoniTokoh.map((t, i) => (
              <Card key={i} className="shadow-card">
                <CardHeader className="flex flex-col items-center">
                  <img
                    src={t.foto}
                    alt={`Foto ${t.nama}`}
                    className="h-21 w-21 rounded-full object-cover border-2 border-primary"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {t.nama}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t.jabatan}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-center italic">
                    "{t.pesan}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Visi Masa Depan */}
        <Card className="shadow-card mt-16">
          <CardHeader>
            <CardTitle className="text-primary text-center">
              Visi Masa Depan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-center">
              Dengan pengalaman lebih dari satu dekade, organisasi terus
              berkomitmen untuk menjadi katalis perubahan positif di Indonesia.
              Kami yakin bahwa dengan kader-kader berkualitas dan program-program
              inovatif, organisasi akan terus berkontribusi dalam membangun
              Indonesia yang lebih maju dan sejahtera.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sejarah;
