import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

const NewsAdmin = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error.message);
    } else {
      setNews(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Berita</h1>

      {loading ? (
        <p>Loading berita...</p>
      ) : news.length === 0 ? (
        <p className="text-muted-foreground">Belum ada berita.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card key={item.id} className="shadow-card">
              <CardHeader>
                <Badge className="w-fit mb-2">{item.category}</Badge>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <p className="text-sm text-muted-foreground mb-2">
                  {item.excerpt}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  {new Date(item.date).toLocaleDateString("id-ID")} —{" "}
                  {item.author}
                </p>
                {/* Tombol Baca Selengkapnya */}
                <Link to={`/berita/${item.id}`}>
                  <Button size="sm" variant="outline">
                    Baca Selengkapnya →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsAdmin;
