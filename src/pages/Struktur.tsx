import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Struktur = () => {
  const strukturData = [
    { jabatan: "Ketua Umum", nama: "Rahman Abidzar Mushaf", periode: "2023-2025" },
    { jabatan: "Ketua Harian", nama: "M Fikri Nurzaman", periode: "2023-2025" },
    { jabatan: "Sekretaris Umum", nama: "Niko Satria Dwi Putra", periode: "2023-2025" },
    { jabatan: "Bendahara Umum", nama: "Muhammad Esa", periode: "2023-2025" },
    { jabatan: "Bendahara Umum", nama: "Rini Susanti, S.E", periode: "2023-2025" },
    { jabatan: "Pengembangan Intelektual", nama: "Luki Arthur. R, Asti Amaliah", periode: "2023-2025" },
    { jabatan: "Kesekretariatan", nama: "Iman Maulana. S", periode: "2023-2025" },
    { jabatan: "Kajian Strategi Advokasi", nama: "Irham Maulana, Fadilamen", periode: "2023-2025" },
    { jabatan: "Diskominfo", nama: "Wina Agustina. R, Seni Hermawati, Dede Indra Fauzi", periode: "2023-2025" },
    { jabatan: "Keperempuanan", nama: "Dinar Restika, Leni, Dede Indra Fauzi", periode: "2023-2025" },
    { jabatan: "Publikasi Dokumentasi Dekorasi (PDD)", nama: "Rahmatulloh, Irdas Fauzi", periode: "2023-2025" },
  ];

  // pecah jadi kelompok
  const ketuaUmum = strukturData.find((s) => s.jabatan === "Ketua Umum");
  const ketuaHarian = strukturData.find((s) => s.jabatan === "Ketua Harian");
  const sekretaris = strukturData.find((s) => s.jabatan === "Sekretaris Umum");
  const bendahara = strukturData.filter((s) => s.jabatan === "Bendahara Umum");
  const bidang = strukturData.filter(
    (s) =>
      !["Ketua Umum", "Ketua Harian", "Sekretaris Umum", "Bendahara Umum"].includes(
        s.jabatan
      )
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Struktur Organisasi</h1>
          <p className="text-xl text-muted-foreground">
            Susunan pengurus organisasi periode 2023-2025
          </p>
        </div>

        {/* Grid cards semua pengurus */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strukturData.map((pengurus, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-shadow">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {pengurus.nama.split(" ")[0].charAt(0)}
                  </span>
                </div>
                <CardTitle className="text-lg text-foreground">{pengurus.jabatan}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-foreground mb-2">{pengurus.nama}</p>
                <p className="text-sm text-muted-foreground">Periode: {pengurus.periode}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bagan Organisasi */}
        <Card className="mt-12 shadow-card">
          <CardHeader>
            <CardTitle className="text-center text-primary">Bagan Organisasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {/* Ketua Umum */}
              {ketuaUmum && (
                <div className="bg-gradient-primary text-primary-foreground p-4 rounded-lg mb-6 inline-block">
                  <h3 className="font-bold">{ketuaUmum.jabatan}</h3>
                  <p className="text-sm">{ketuaUmum.nama}</p>
                </div>
              )}

              {/* Jajaran inti */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {ketuaHarian && (
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="font-semibold text-foreground">{ketuaHarian.jabatan}</h4>
                    <p className="text-sm text-muted-foreground">{ketuaHarian.nama}</p>
                  </div>
                )}
                {sekretaris && (
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="font-semibold text-foreground">{sekretaris.jabatan}</h4>
                    <p className="text-sm text-muted-foreground">{sekretaris.nama}</p>
                  </div>
                )}
                {bendahara.length > 0 && (
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="font-semibold text-foreground">Bendahara Umum</h4>
                    <p className="text-sm text-muted-foreground">
                      {bendahara.map((b) => b.nama).join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Bidang-bidang */}
              <div className="grid md:grid-cols-3 gap-4">
                {bidang.map((b, idx) => (
                  <div key={idx} className="bg-accent/10 p-3 rounded-lg">
                    <h4 className="font-semibold text-foreground">{b.jabatan}</h4>
                    <p className="text-sm text-muted-foreground">{b.nama}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Struktur;
