import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, CheckCircle } from "lucide-react";

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

const Program = () => {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetch programs:", error.message);
      setPrograms(data || []);
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Selesai":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) return <p className="text-center py-10">Loading program...</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Program Organisasi
          </h1>
          <p className="text-xl text-muted-foreground">
            Berbagai program unggulan untuk pemberdayaan masyarakat
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <Card
              key={program.id}
              className="shadow-card hover:shadow-hover transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{program.nama}</CardTitle>
                  <Badge className={getStatusColor(program.status)}>
                    {program.status}
                  </Badge>
                </div>
                <Badge variant="outline" className="w-fit">
                  {program.kategori}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {program.deskripsi}
                </p>

                {program.status === "Aktif" && (
                  <div className="space-y-2 text-sm">
                    {program.peserta && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{program.peserta}</span>
                      </div>
                    )}
                    {program.periode && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{program.periode}</span>
                      </div>
                    )}
                  </div>
                )}

                {program.status === "Selesai" && program.hasil && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{program.hasil}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Program;
