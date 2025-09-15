import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Struktur = () => {
  const strukturData = [
    {
      jabatan: "Ketua Umum",
      nama: "Dr. Ahmad Suharto",
      periode: "2022-2027"
    },
    {
      jabatan: "Wakil Ketua I",
      nama: "Siti Rahayu, M.Si",
      periode: "2022-2027"
    },
    {
      jabatan: "Wakil Ketua II", 
      nama: "Budi Santoso, S.H",
      periode: "2022-2027"
    },
    {
      jabatan: "Sekretaris Jenderal",
      nama: "Dewi Lestari, S.Sos",
      periode: "2022-2027"
    },
    {
      jabatan: "Bendahara Umum",
      nama: "Rini Susanti, S.E",
      periode: "2022-2027"
    },
    {
      jabatan: "Ketua Bidang Organisasi",
      nama: "Muhammad Rizki, M.A",
      periode: "2022-2027"
    },
    {
      jabatan: "Ketua Bidang Kaderisasi",
      nama: "Andi Prasetyo, S.Pd",
      periode: "2022-2027"
    },
    {
      jabatan: "Ketua Bidang Hubungan Masyarakat",
      nama: "Lisa Permata, S.I.Kom",
      periode: "2022-2027"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Struktur Organisasi</h1>
          <p className="text-xl text-muted-foreground">
            Susunan pengurus organisasi periode 2022-2027
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strukturData.map((pengurus, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-shadow">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {pengurus.nama.split(' ')[0].charAt(0)}
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

        <Card className="mt-12 shadow-card">
          <CardHeader>
            <CardTitle className="text-center text-primary">Bagan Organisasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="bg-gradient-primary text-primary-foreground p-4 rounded-lg mb-6 inline-block">
                <h3 className="font-bold">Ketua Umum</h3>
                <p className="text-sm">Dr. Ahmad Suharto</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-muted p-3 rounded-lg">
                  <h4 className="font-semibold text-foreground">Wakil Ketua I</h4>
                  <p className="text-sm text-muted-foreground">Siti Rahayu, M.Si</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <h4 className="font-semibold text-foreground">Wakil Ketua II</h4>
                  <p className="text-sm text-muted-foreground">Budi Santoso, S.H</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <h4 className="font-semibold text-foreground">Sekretaris Jenderal</h4>
                  <p className="text-sm text-muted-foreground">Dewi Lestari, S.Sos</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-lg">
                  <h4 className="font-semibold text-foreground">Bendahara Umum</h4>
                  <p className="text-sm text-muted-foreground">Rini Susanti, S.E</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-lg">
                  <h4 className="font-semibold text-foreground">Bidang-bidang</h4>
                  <p className="text-sm text-muted-foreground">3 Ketua Bidang</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Struktur;