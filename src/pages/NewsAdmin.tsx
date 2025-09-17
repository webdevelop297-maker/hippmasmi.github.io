// src/pages/admin/NewsAdmin.tsx
import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  // state form
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error) console.error("Error fetching news:", error.message);
    else setNews(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setImage("");
    setFile(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return null;
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("news-images") // pastikan bucket ini ada di Supabase
      .upload(fileName, file);

    if (error) {
      alert("Upload gagal: " + error.message);
      return null;
    }

    const { data } = supabase.storage.from("news-images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = image;
    if (file) {
      const uploaded = await uploadImage();
      if (uploaded) imageUrl = uploaded;
    }

    if (id) {
      // update
      const { error } = await supabase
        .from("news")
        .update({ title, excerpt, content, category, image: imageUrl })
        .eq("id", id);

      if (error) alert("Gagal update: " + error.message);
      else {
        alert("Berita berhasil diupdate!");
        resetForm();
        fetchNews();
      }
    } else {
      // tambah
      const { error } = await supabase.from("news").insert([
        {
          title,
          excerpt,
          content,
          category,
          image: imageUrl,
          date: new Date().toISOString(),
          author: "Admin",
        },
      ]);

      if (error) alert("Gagal tambah: " + error.message);
      else {
        alert("Berita berhasil ditambahkan!");
        resetForm();
        fetchNews();
      }
    }
  };

  const handleEdit = (item: NewsItem) => {
    setId(item.id);
    setTitle(item.title);
    setExcerpt(item.excerpt);
    setContent(item.content);
    setCategory(item.category);
    setImage(item.image);
    setFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus berita ini?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) alert("Gagal hapus: " + error.message);
    else {
      alert("Berita berhasil dihapus!");
      fetchNews();
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Form */}
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Berita" : "Tambah Berita"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <Input placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} />
        <Input placeholder="Emoji atau URL gambar" value={image} onChange={(e) => setImage(e.target.value)} />
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <Input placeholder="Ringkasan" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        <Textarea placeholder="Isi berita (boleh HTML)" value={content} onChange={(e) => setContent(e.target.value)} />
        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Simpan"}</Button>
          {id && <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>}
        </div>
      </form>

      {/* List berita */}
      <h2 className="text-xl font-bold mb-4">Daftar Berita</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <Badge className="w-fit mb-2">{item.category}</Badge>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {item.image && <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded mb-3" />}
                <p className="text-sm text-muted-foreground mb-2">{item.excerpt}</p>
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(item.date).toLocaleDateString("id-ID")} — {item.author}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Hapus</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsAdmin;
