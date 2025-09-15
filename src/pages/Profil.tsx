import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profil = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Profil Organisasi</h1>
          <p className="text-xl text-muted-foreground">
            Mengenal lebih dekat visi, misi, dan tujuan organisasi kami
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Visi Organisasi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi organisasi terdepan yang memberikan kontribusi nyata bagi kemajuan bangsa 
                dan kesejahteraan masyarakat melalui pemberdayaan kader-kader berkualitas.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Misi Organisasi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Mengembangkan potensi anggota secara berkelanjutan</li>
                <li>• Membangun jaringan kemitraan strategis</li>
                <li>• Menjalankan program-program pemberdayaan masyarakat</li>
                <li>• Menegakkan nilai-nilai integritas dan profesionalisme</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow md:col-span-2">
            <CardHeader>
              <CardTitle className="text-primary">Nilai-Nilai Organisasi</CardTitle>
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