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
                <li><b>KOLABORATIF :</b> Kolaboratif merupakan bentuk pergerakan HIPPMA yang selalu 
                  bekerjasama dengan intansi atau organisasi untuk mencapai tujuan bersama</li>
                <li><b>SOLUTIF :</b> HIPPMA menjadi pemecah masalah tidak hanya mengkritik, tapi memberikan 
                  dan menawarkan solusi</li>
                <li><b>PEDULI :</b> HIPPMA peduli sesame berarti kita akan selalu ada untuk masyarakat</li>
                <li><b>MEMBERDAYAKAN :</b> Memberdayakan dalam HIPPMA akan selalu dijunjung tinggi karena kami 
                  percaya dengan sama-sama memberdayakan semuanya lebih hebat</li>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Misi HIPPMA</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <p><b>1. MEMBERDAYAKAN PEMUDA DAN MASYARAKAT</b></p>
                <p>Himpunan Pemuda Pelajar Mahasiswa (HIPPMA) selalu berusaha untuk memberdayakan 
                  pemuda dan masyarakat untuk berpartisipasi dalam pembangunan daerah khusus nya dalam 
                  bidang pendidikan, kesehatan, dan sosial.</p>
                <p><b>2. MENGINSPIRASI SELURUH LAPISAN MASYARAKAT</b></p>    
                <p>Himpunan Pemuda Pelajar Mahasiswa (HIPPMA) selalu berusaha untuk mengiinspirasi untuk 
                  terus bergerak bagi perkembangan bangsa Indonesia maupun daerah melalui pemerataan 
                  keadilan dan kesejahteraan.</p>
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