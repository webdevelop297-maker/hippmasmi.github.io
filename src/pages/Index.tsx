import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Target, Award, Calendar } from "lucide-react";

// 🔹 Supabase client
const supabase = createClient(
  "https://fbiccnhleqbhsrjgmpgh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiaWNjbmhsZXFiaHNyamdtcGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5MzUsImV4cCI6MjA3MzQ0MjkzNX0.riZBDDZxg4t9ixiSEw7QmM2XWXkTFWB3GpgihCaaAQY"
);

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

// 🔹 Dummy data fallback
const dummyNews: NewsItem[] = [
  {
    id: 1,
    title: "Peluncuran Program UMKM 2024",
    excerpt: "Program pemberdayaan UMKM tahap baru dengan target 200 peserta.",
    category: "Program",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Pelatihan Kepemimpinan Q1 2024",
    excerpt:
      "50 kader mengikuti pelatihan kepemimpinan dan manajemen organisasi.",
    category: "Kaderisasi",
    date: "2024-01-08",
  },
  {
    id: 3,
    title: "Penghargaan Organisasi Terbaik",
    excerpt: "Organisasi meraih penghargaan nasional di bidang pemberdayaan.",
    category: "Prestasi",
    date: "2023-12-20",
  },
];

const Index = () => {
  const [news, setNews] = useState<NewsItem[]>(dummyNews);
  const [loadingNews, setLoadingNews] = useState(true);

  // 🔹 Statistik dinamis
  const [kaderAktif, setKaderAktif] = useState(0);
  const [programAktif, setProgramAktif] = useState(0);

  const quickLinks = [
    {
      path: "/profil",
      label: "Tentang Kami",
      desc: "Visi, misi, dan nilai organisasi",
    },
    {
      path: "/struktur",
      label: "Struktur",
      desc: "Susunan pengurus periode 2022-2027",
    },
    { path: "/program", label: "Program", desc: "Program pemberdayaan aktif" },
    {
      path: "/database-kader",
      label: "Data Kader",
      desc: "Database lengkap keanggotaan",
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      const { data, error } = await supabase
        .from("news")
        .select("id, title, excerpt, category, date")
        .order("date", { ascending: false })
        .limit(3);

      if (error) {
        console.warn("Gagal fetch news:", error.message);
        setNews(dummyNews);
      } else if (data && data.length > 0) {
        setNews(data);
      } else {
        setNews(dummyNews);
      }
      setLoadingNews(false);
    };

    const fetchStats = async () => {
      // hitung kader aktif
      const { count: countKader } = await supabase
        .from("kader")
        .select("*", { count: "exact", head: true })
        .eq("status", "Aktif");
      setKaderAktif(countKader || 0);

      // hitung program aktif
      const { count: countProgram } = await supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .eq("status", "Aktif");
      setProgramAktif(countProgram || 0);
    };

    fetchNews();
    fetchStats();
  }, []);

  const highlights = [
    {
      icon: Users,
      title: `${kaderAktif} Kader Aktif`,
      description: "Kader berkualitas di seluruh Indonesia",
    },
    {
      icon: Target,
      title: `${programAktif} Program Unggulan`,
      description: "Program pemberdayaan berkelanjutan",
    },
    {
      icon: Award,
      title: "13+ Tahun Pengalaman",
      description: "Sejak 2010 membangun bangsa",
    },
    {
      icon: Calendar,
      title: "5 Wilayah",
      description: "Tersebar di berbagai provinsi",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Membangun Indonesia
            <br />
            <span className="text-4xl md:text-5xl">Bersama Generasi Muda</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Organisasi yang berkomitmen mengembangkan potensi generasi muda
            untuk kemajuan bangsa melalui kaderisasi berkelanjutan dan program
            pemberdayaan masyarakat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/profil">
                Pelajari Lebih Lanjut <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/database-kader">Lihat Data Kader</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="shadow-card hover:shadow-hover transition-shadow text-center"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Jelajahi Organisasi Kami
            </h2>
            <p className="text-xl text-muted-foreground">
              Temukan informasi lengkap tentang organisasi, program, dan
              keanggotaan
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, index) => (
              <Card
                key={index}
                className="shadow-card hover:shadow-hover transition-all group"
              >
                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{link.desc}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <Link to={link.path}>
                      Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Berita & Update Terbaru
            </h2>
            <p className="text-xl text-muted-foreground">
              Kabar terkini dari kegiatan organisasi
            </p>
          </div>

          {loadingNews ? (
            <p className="text-center">Loading berita...</p>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                  <Card
                    key={item.id}
                    className="shadow-card hover:shadow-hover transition-shadow"
                  >
                    <CardHeader>
                      <Badge className="w-fit mb-2">{item.category}</Badge>
                      <CardTitle className="text-foreground">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">
                        {item.excerpt}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {new Date(item.date).toLocaleDateString("id-ID")}
                      </p>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/artikel/${item.id}`}>
                          Baca Selengkapnya
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tombol ke halaman berita */}
              <div className="text-center mt-8">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/berita">
                    Berita Lainnya <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

{/* Contact Section */}
<section className="py-16">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <Card className="shadow-card bg-gradient-primary text-primary-foreground">
      <CardContent className="py-12">
        <h2 className="text-3xl font-bold mb-4">
          Bergabung Bersama Kami
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Jadilah bagian dari perubahan positif untuk Indonesia. Hubungi
          kami untuk informasi keanggotaan dan program organisasi.
        </p>

        {/* Logo Mitra */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6">Mitra Kami</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 items-center justify-items-center">
            <img src="/mitra1.png" alt="Logo Mitra 1" className="h-16 object-contain" />
            <img src="/mitra2.png" alt="Logo Mitra 2" className="h-16 object-contain" />
            <img src="/mitra3.png" alt="Logo Mitra 3" className="h-16 object-contain" />
            <img src="/mitra4.png" alt="Logo Mitra 4" className="h-16 object-contain" />
            <img src="/mitra5.png" alt="Logo Mitra 5" className="h-16 object-contain" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:hippmasukabumi21@gmail.com">
        <Badge
          variant="secondary"
          className="text-base px-4 py-2 hover:bg-secondary/80 transition-colors cursor-pointer"
        >
          📧 hippmasukabumi21@gmail.com
        </Badge>
      </a>

      <a
        href="https://wa.me/6285793343170"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Badge
          variant="secondary"
          className="text-base px-4 py-2 hover:bg-secondary/80 transition-colors cursor-pointer"
        >
          📱 +62 857-9334-3170
        </Badge>
      </a>
    </div>
      </CardContent>
    </Card>
  </div>
</section>

    </div>
  );
};

export default Index;
