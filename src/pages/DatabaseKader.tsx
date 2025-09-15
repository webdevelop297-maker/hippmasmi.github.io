"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, PlusCircle, UserCog, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const DatabaseKader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [kaderData, setKaderData] = useState<any[]>([]);
  const [loginForm, setLoginForm] = useState({ id: "", password: "" });

  // modal tambah kader
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKader, setNewKader] = useState<any>({
    id: "",
    nama: "",
    ttl: "",
    nomorAnggota: "",
    nomorWA: "",
    jabatan: "",
    status: "Aktif",
    jenisKelamin: "",
    alamat: "",
    agama: "",
    foto: null,
    password: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // modal edit kader
  const [showEditModal, setShowEditModal] = useState(false);
  const [editKader, setEditKader] = useState<any>(null);

  const fetchKader = async () => {
    const { data } = await supabase.from("kader").select("*");
    setKaderData(data || []);
  };

  useEffect(() => {
    fetchKader();
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser(parsed);
      setIsLoggedIn(true);
    }
  }, []);

  // login manual
  const handleLogin = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", loginForm.id)
      .eq("password", loginForm.password)
      .single();

    if (error || !data) {
      alert("ID atau Password salah!");
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser(data);
    localStorage.setItem("currentUser", JSON.stringify(data));
    await fetchKader();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // tambah kader
  const handleAddKader = async () => {
    if (!newKader.id || !newKader.nama) {
      alert("ID dan Nama wajib diisi!");
      return;
    }

    setIsSaving(true);

    try {
      let fotoUrl = "";
      if (newKader.foto instanceof File) {
        const fileName = `${Date.now()}-${newKader.foto.name}`;
        const { error: uploadError } = await supabase.storage
          .from("kader-foto")
          .upload(fileName, newKader.foto);

        if (uploadError) {
          alert("Gagal upload foto: " + uploadError.message);
          setIsSaving(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from("kader-foto")
          .getPublicUrl(fileName);

        fotoUrl = urlData.publicUrl;
      }

      await supabase.from("kader").insert([
        {
          id: newKader.id,
          nama: newKader.nama,
          ttl: newKader.ttl,
          nomorAnggota: newKader.nomorAnggota,
          nomorWA: newKader.nomorWA,
          jabatan: newKader.jabatan,
          status: newKader.status,
          jenisKelamin: newKader.jenisKelamin,
          alamat: newKader.alamat,
          agama: newKader.agama,
          foto: fotoUrl,
        },
      ]);

      await supabase.from("users").upsert([
        {
          id: newKader.id,
          password: newKader.password || "12345",
          role: "kader",
        },
      ]);

      alert("Kader berhasil ditambahkan!");
      fetchKader();
      setShowAddModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteKader = async (id: string) => {
    if (!confirm("Yakin ingin hapus kader ini?")) return;
    await supabase.from("kader").delete().eq("id", id);
    await supabase.from("users").delete().eq("id", id);
    fetchKader();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-50 text-green-700";
      case "Cuti":
        return "bg-yellow-50 text-yellow-700";
      case "Non-Aktif":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const filteredKader = kaderData.filter(
    (kader) =>
      kader.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kader.jabatan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Database Kader</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          {isLoggedIn ? (
            <>
              {currentUser?.role === "admin" && (
                <>
                  <Button asChild variant="secondary">
                    <Link to="/admin/berita">Kelola Berita</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link to="/program-admin">Kelola Program</Link>
                  </Button>
                  <Button onClick={() => setShowAddModal(true)}>
                    <PlusCircle className="w-4 h-4 mr-1" /> Tambah Kader
                  </Button>
                </>
              )}
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="ID"
                value={loginForm.id}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, id: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
              <Button onClick={handleLogin}>Login</Button>
            </div>
          )}
        </div>
      </div>

      {/* Daftar kader */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredKader.map((kader) => (
          <Card key={kader.id} className="text-center">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{kader.nama}</CardTitle>
                <Badge className={getStatusColor(kader.status)}>
                  {kader.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {kader.foto && (
                <img
                  src={kader.foto}
                  alt={kader.nama}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-3 border"
                />
              )}
              <p className="font-medium">{kader.jabatan}</p>
              {isLoggedIn && (
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                  <p>Tempat Tanggal Lahir: {kader.ttl}</p>
                  <p>Jenis Kelamin: {kader.jenisKelamin}</p>
                  <p>Agama: {kader.agama}</p>
                  <p>Alamat: {kader.alamat}</p>
                  <p>No. WA: {kader.nomorWA}</p>
                </div>
              )}

              {/* Aksi admin */}
              {isLoggedIn && currentUser?.role === "admin" && (
                <div className="flex justify-center gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditKader(kader);
                      setShowEditModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteKader(kader.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Hapus
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal tambah kader */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Tambah Kader</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="ID"
                value={newKader.id}
                onChange={(e) =>
                  setNewKader({ ...newKader, id: e.target.value })
                }
              />
              <Input
                placeholder="Nama"
                value={newKader.nama}
                onChange={(e) =>
                  setNewKader({ ...newKader, nama: e.target.value })
                }
              />
              <Input
                placeholder="Tempat Tanggal Lahir"
                value={newKader.ttl}
                onChange={(e) =>
                  setNewKader({ ...newKader, ttl: e.target.value })
                }
              />
              <Input
                placeholder="Nomor Anggota"
                value={newKader.nomorAnggota}
                onChange={(e) =>
                  setNewKader({ ...newKader, nomorAnggota: e.target.value })
                }
              />
              <Input
                placeholder="Nomor WA"
                value={newKader.nomorWA}
                onChange={(e) =>
                  setNewKader({ ...newKader, nomorWA: e.target.value })
                }
              />
              <Input
                placeholder="Jabatan"
                value={newKader.jabatan}
                onChange={(e) =>
                  setNewKader({ ...newKader, jabatan: e.target.value })
                }
              />
              <Input
                placeholder="Agama"
                value={newKader.agama}
                onChange={(e) =>
                  setNewKader({ ...newKader, agama: e.target.value })
                }
              />
              <Input
                placeholder="Alamat"
                value={newKader.alamat}
                onChange={(e) =>
                  setNewKader({ ...newKader, alamat: e.target.value })
                }
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewKader({
                    ...newKader,
                    foto: e.target.files?.[0] || null,
                  })
                }
              />
              <Input
                type="password"
                placeholder="Password"
                value={newKader.password}
                onChange={(e) =>
                  setNewKader({ ...newKader, password: e.target.value })
                }
              />
              <div className="col-span-1 sm:col-span-2 flex gap-2 mt-2">
                <Button onClick={handleAddKader} disabled={isSaving}>
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowAddModal(false)}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DatabaseKader;
