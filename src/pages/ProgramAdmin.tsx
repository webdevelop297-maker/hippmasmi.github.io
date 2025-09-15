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
}

const ProgramAdmin = () => {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState<Partial<ProgramItem>>({
    nama: "",
    kategori: "",
    deskripsi: "",
    status: "Aktif",
    peserta: "",
    periode: "",
    hasil: "",
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
        <Button type="submit">
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
