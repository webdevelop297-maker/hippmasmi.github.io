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
            <Button onClick={() => navigate("/berita")}>
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
    </div>
  );
};

export default ArticleDetail;
