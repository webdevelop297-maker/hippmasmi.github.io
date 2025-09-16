import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgramItem {
  id: number;
  nama: string;
  kategori: string;
  deskripsi: string;
  status: string;
  peserta?: string;
  periode?: string;
  hasil?: string;
  foto?: string; // tambah field foto
}

const ProgramAdmin = () => {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<Partial<ProgramItem>>({
    nama: "",
    kategori: "",
    deskripsi: "",
    status: "Aktif",
    peserta: "",
    periode: "",
    hasil: "",
    foto: "",
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("created_at", { ascending: false });
    setPrograms(data || []);
    setLoading(false);
  };

  // Upload foto ke Supabase Storage
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      setUploading(true);

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `program-foto/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("program-foto")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("program-foto").getPublicUrl(filePath);

      setForm({ ...form, foto: data.publicUrl });
    } catch (err: any) {
      console.error("Upload error:", err.message);
      alert("Gagal upload foto");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await supabase.from("programs").update(form).eq("id", editId);
      alert("Program berhasil diperbarui!");
    } else {
      await supabase.from("programs").insert([form]);
      alert("Program berhasil ditambahkan!");
    }
    resetForm();
    fetchPrograms();
  };

  const handleEdit = (program: ProgramItem) => {
    setForm(program);
    setEditId(program.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus program ini?")) return;
    await supabase.from("programs").delete().eq("id", id);
    fetchPrograms();
  };

  const resetForm = () => {
    setForm({
      nama: "",
      kategori: "",
      deskripsi: "",
      status: "Aktif",
      peserta: "",
      periode: "",
      hasil: "",
      foto: "",
    });
    setEditId(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Kelola Program</h1>

      {/* Form tambah/edit */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <Input
          placeholder="Nama Program"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />
        <Input
          placeholder="Kategori"
          value={form.kategori}
          onChange={(e) => setForm({ ...form, kategori: e.target.value })}
        />
        <Textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="Aktif">Aktif</option>
          <option value="Selesai">Selesai</option>
        </select>
        {form.status === "Aktif" && (
          <>
            <Input
              placeholder="Peserta"
              value={form.peserta}
              onChange={(e) => setForm({ ...form, peserta: e.target.value })}
            />
            <Input
              placeholder="Periode"
              value={form.periode}
              onChange={(e) => setForm({ ...form, periode: e.target.value })}
            />
          </>
        )}
        {form.status === "Selesai" && (
          <Input
            placeholder="Hasil"
            value={form.hasil}
            onChange={(e) => setForm({ ...form, hasil: e.target.value })}
          />
        )}

        {/* Upload Foto */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Foto Program</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <p className="text-xs text-muted-foreground">Mengupload...</p>}
          {form.foto && (
            <img
              src={form.foto}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mt-2"
            />
          )}
        </div>

        <Button type="submit" disabled={uploading}>
          {editId ? "Update Program" : "Tambah Program"}
        </Button>
      </form>

      {/* Daftar program */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <Card key={program.id}>
              {program.foto && (
                <img
                  src={program.foto}
                  alt={program.nama}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <CardHeader>
                <CardTitle>{program.nama}</CardTitle>
                <Badge>{program.status}</Badge>
              </CardHeader>
              <CardContent>
                <p>{program.deskripsi}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => handleEdit(program)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(program.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramAdmin;
