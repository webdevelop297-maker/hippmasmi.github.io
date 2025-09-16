import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profil = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Profil Himpunan Pemuda Pelajar Mahasiswa Sukabumi(HIPPMA)</h1>
          <p className="text-xl text-muted-foreground">
            Mengenal lebih dekat visi, misi, dan tujuan organisasi kami
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Visi HIPPMA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                <p><b>BERGERAK BERSAMA BANGUN SUKABUMI</b></p>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Misi HIPPMA</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <p>1. Menjadi wadah pengembangan potensi, peningkatan kualitas diri, 
                  dan pemberdayaan pemuda pelajar mahasiswa di Sukabumi.</p>
                <p> 2. Meningkatkan daya kritis kesadaran pemuda pelajar mahasiswa 
                  tentang isu-isu sosial, budaya, politik, lingkungan, dan pendidikan 
                  untuk berkontribusi dalam pembangunan masyarakat.</p>
                <p>3. Membangun sinergi, kerjasama, dan solidaritas di antara anggota 
                  Hippma Sukabumi untuk mencapai tujuan bersama.</p>
                  <p>4. Ikut serta dalam menyumbangkan karya dan pemikiran guna 
                    pembangunan daerah bangsa dan negara.</p>
                
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow md:col-span-2">
            <CardHeader>
              <CardTitle className="text-primary">Nilai-Nilai HIPPMA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">I</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Integritas</h3>
                  <p className="text-sm text-muted-foreground">Berkomitmen pada kejujuran dan transparansi</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">P</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Profesionalisme</h3>
                  <p className="text-sm text-muted-foreground">Menjalankan tugas dengan keahlian terbaik</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">K</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Kolaborasi</h3>
                  <p className="text-sm text-muted-foreground">Membangun kerjasama yang sinergis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profil;