// src/pages/ArticleDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching article:", error.message);
      } else {
        setArticle(data);
      }
      setLoading(false);
    };

    if (id) fetchArticle();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading artikel...</p>;
  }

  if (!article) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">
              Artikel Tidak Ditemukan
            </h1>
            <p className="text-muted-foreground mb-6">
              Artikel yang Anda cari tidak dapat ditemukan.
            </p>
            <Button onClick={() => navigate("/News")}>
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke Berita
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.title,
          url,
        });
        toast({
          title: "Berhasil dibagikan!",
          description: "Artikel telah dibagikan.",
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(`${article.title}\n${url}`);
      toast({
        title: "Link disalin!",
        description: "Link artikel telah disalin ke clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali */}
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Kembali ke Berita
        </Button>

        {/* Artikel */}
        <Card className="card-elevated border-0">
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge>{article.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-1" />
                  {new Date(article.date).toLocaleDateString("id-ID")}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User size={14} className="mr-1" />
                  {article.author}
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                {article.title}
              </h1>

              {/* Tombol Share */}
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 size={16} className="mr-2" />
                Bagikan
              </Button>
            </div>

            {/* Gambar / Emoji Headline */}
            <div className="mb-8">
              {article.image?.startsWith("http") ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              ) : (
                <div className="bg-gradient-primary rounded-lg p-8 text-center text-6xl">
                  {article.image}
                </div>
              )}
            </div>

            {/* Isi Konten */}
            <div
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>
      </div>
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

export default ArticleDetail;
