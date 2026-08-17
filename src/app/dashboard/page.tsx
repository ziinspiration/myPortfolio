import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { deleteSkill, saveProfile, saveSkill, toggleSkill } from "./actions";

export default async function DashboardProfile() {
  const profile = await prisma.profile.findFirst();

  const skills = await prisma.skill.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 text-zinc-900 flex justify-center items-start font-sans">
      <div className="w-full max-w-5xl space-y-8">
        <Card className="w-full bg-white border-zinc-200 shadow-xl rounded-xl">
          <CardHeader className="border-b border-zinc-100 pb-6">
            <CardTitle className="text-3xl font-extrabold text-zinc-900">
              Manajemen Data Diri
            </CardTitle>

            <CardDescription className="text-zinc-500 text-base">
              Perbarui informasi profil, CV, media sosial, dan data lainnya.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form action={saveProfile} className="space-y-8">
              <div className="space-y-5">
                <h3 className="text-xl font-bold border-b-2 border-[#2563EB] inline-block pb-1">
                  Identitas & Peran
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-zinc-700 font-semibold"
                    >
                      Nama Lengkap
                    </Label>

                    <Input
                      id="name"
                      name="name"
                      defaultValue={profile?.name ?? ""}
                      required
                      placeholder="Contoh: Ilham Ramadhana Hartono"
                      className="bg-zinc-50 border-zinc-300 focus-visible:ring-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="role"
                      className="text-zinc-700 font-semibold"
                    >
                      Peran / Judul Pekerjaan
                    </Label>

                    <Input
                      id="role"
                      name="role"
                      defaultValue={profile?.role ?? "Fullstack Web Developer"}
                      required
                      placeholder="Fullstack Web Developer"
                      className="bg-zinc-50 border-zinc-300 focus-visible:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="summaryEn"
                    className="text-zinc-700 font-semibold"
                  >
                    Ringkasan Profil EN
                  </Label>

                  <Textarea
                    id="summaryEn"
                    name="summaryEn"
                    defaultValue={profile?.summaryEn ?? ""}
                    required
                    placeholder="This is a profile summary..."
                    className="bg-zinc-50 border-zinc-300 min-h-[120px] focus-visible:ring-[#2563EB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="summaryId"
                    className="text-zinc-700 font-semibold"
                  >
                    Ringkasan Profil ID
                  </Label>

                  <Textarea
                    id="summaryId"
                    name="summaryId"
                    defaultValue={profile?.summaryId ?? ""}
                    required
                    placeholder="Ini adalah ringkasan profil..."
                    className="bg-zinc-50 border-zinc-300 min-h-[120px] focus-visible:ring-[#2563EB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-zinc-700 font-semibold"
                  >
                    Email Kontak
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={profile?.email ?? ""}
                    required
                    placeholder="email@example.com"
                    className="bg-zinc-50 border-zinc-300 focus-visible:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="space-y-5 pt-4">
                <h3 className="text-xl font-bold border-b-2 border-[#2563EB] inline-block pb-1">
                  Media & Dokumen
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 p-6 rounded-lg border border-zinc-200">
                  <div className="space-y-2">
                    <Label
                      htmlFor="photo"
                      className="text-zinc-700 font-semibold"
                    >
                      Foto Profil
                    </Label>

                    <Input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      className="bg-white border-zinc-300 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="cvEn"
                      className="text-zinc-700 font-semibold"
                    >
                      CV English
                    </Label>

                    <Input
                      id="cvEn"
                      name="cvEn"
                      type="file"
                      accept=".pdf"
                      className="bg-white border-zinc-300 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="cvId"
                      className="text-zinc-700 font-semibold"
                    >
                      CV Indonesia
                    </Label>

                    <Input
                      id="cvId"
                      name="cvId"
                      type="file"
                      accept=".pdf"
                      className="bg-white border-zinc-300 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-5 pt-4">
                <h3 className="text-xl font-bold border-b-2 border-[#2563EB] inline-block pb-1">
                  Tautan Media Sosial
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="github"
                      className="text-zinc-700 font-semibold"
                    >
                      GitHub URL
                    </Label>

                    <Input
                      id="github"
                      name="github"
                      defaultValue={profile?.github ?? ""}
                      placeholder="https://github.com/..."
                      className="bg-zinc-50 border-zinc-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="linkedin"
                      className="text-zinc-700 font-semibold"
                    >
                      LinkedIn URL
                    </Label>

                    <Input
                      id="linkedin"
                      name="linkedin"
                      defaultValue={profile?.linkedin ?? ""}
                      placeholder="https://linkedin.com/in/..."
                      className="bg-zinc-50 border-zinc-300"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="instagram"
                      className="text-zinc-700 font-semibold"
                    >
                      Instagram URL
                    </Label>

                    <Input
                      id="instagram"
                      name="instagram"
                      defaultValue={profile?.instagram ?? ""}
                      placeholder="https://instagram.com/..."
                      className="bg-zinc-50 border-zinc-300"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-bold text-lg py-6 mt-8 shadow-lg shadow-blue-500/20"
              >
                Simpan Data Profil
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border-zinc-200 shadow-xl rounded-xl">
          <CardHeader className="border-b border-zinc-100 pb-6">
            <CardTitle className="text-3xl font-extrabold text-zinc-900">
              Manajemen Skills
            </CardTitle>

            <CardDescription className="text-zinc-500 text-base">
              Tambahkan teknologi, framework, library, dan tools yang ingin
              ditampilkan pada website.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-8">
            <form
              action={saveSkill}
              className="space-y-6 p-6 bg-zinc-50 border border-zinc-200 rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="skill-name"
                    className="font-semibold text-zinc-700"
                  >
                    Nama Skill
                  </Label>

                  <Input
                    id="skill-name"
                    name="name"
                    required
                    placeholder="Contoh: Laravel"
                    className="bg-white border-zinc-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="sortOrder"
                    className="font-semibold text-zinc-700"
                  >
                    Urutan
                  </Label>

                  <Input
                    id="sortOrder"
                    name="sortOrder"
                    type="number"
                    defaultValue="0"
                    className="bg-white border-zinc-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="skill-image"
                  className="font-semibold text-zinc-700"
                >
                  Gambar Skill
                </Label>

                <Input
                  id="skill-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  className="bg-white border-zinc-300 cursor-pointer"
                />
              </div>

              <Button
                type="submit"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] font-bold"
              >
                Tambahkan Skill
              </Button>
            </form>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-900">
                Skill Saat Ini
              </h3>

              {skills.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-zinc-300 rounded-xl text-zinc-500">
                  Belum ada skill.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 shrink-0 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center overflow-hidden">
                          <img
                            src={skill.imageUrl}
                            alt={skill.name}
                            className="w-11 h-11 object-contain"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-zinc-900 truncate">
                            {skill.name}
                          </p>

                          <p className="text-xs text-zinc-500 mt-1">
                            Urutan: {skill.sortOrder}
                          </p>

                          <p
                            className={`text-xs font-semibold mt-1 ${
                              skill.isActive
                                ? "text-emerald-600"
                                : "text-zinc-400"
                            }`}
                          >
                            {skill.isActive ? "Aktif" : "Nonaktif"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-5">
                        <form action={toggleSkill}>
                          <input type="hidden" name="id" value={skill.id} />

                          <Button
                            type="submit"
                            variant="outline"
                            className="w-full"
                          >
                            {skill.isActive ? "Nonaktifkan" : "Aktifkan"}
                          </Button>
                        </form>

                        <form action={deleteSkill}>
                          <input type="hidden" name="id" value={skill.id} />

                          <Button
                            type="submit"
                            variant="destructive"
                            className="w-full"
                          >
                            Hapus
                          </Button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
