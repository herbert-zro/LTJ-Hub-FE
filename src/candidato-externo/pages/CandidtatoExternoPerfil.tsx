import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Camera,
  Edit3,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Save,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CandidateProfile {
  fullName: string;
  age: number;
  sex: "Femenino" | "Masculino" | "Prefiero no decir";
  maritalStatus: "Soltera" | "Casada" | "Divorciada" | "Viuda";
  nationality: string;
  email: string;
  phone: string;
  address: string;
  dui: string;
  birthDate: string;
  profileImageUrl: string;
}

const INITIAL_PROFILE: CandidateProfile = {
  fullName: "Ana Martinez",
  age: 30,
  sex: "Femenino",
  maritalStatus: "Soltera",
  nationality: "Salvadorena",
  email: "ana.martinez@correo.com",
  phone: "No disponible",
  address: "Colonia Escalon, San Salvador, El Salvador",
  dui: "04567891-2",
  birthDate: "1995-06-18",
  profileImageUrl: "",
};

const FieldView = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="rounded-xl border border-gray-200/80 bg-white px-4 py-3 shadow-sm">
      <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
};

const getNameInitials = (fullName: string) => {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export const CandidtatoExternoPerfil = () => {
  const [profile, setProfile] = useState<CandidateProfile>(INITIAL_PROFILE);
  const [draftProfile, setDraftProfile] =
    useState<CandidateProfile>(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  const initials = useMemo(
    () => getNameInitials(draftProfile.fullName || profile.fullName),
    [draftProfile.fullName, profile.fullName],
  );

  const handleStartEditing = () => {
    setDraftProfile(profile);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const handleSaveProfile = () => {
    setProfile(draftProfile);
    setIsEditing(false);
    console.log("updated candidate profile", draftProfile);
  };

  const updateDraftField = <K extends keyof CandidateProfile>(
    key: K,
    value: CandidateProfile[K],
  ) => {
    setDraftProfile((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-400 via-sky-400 to-emerald-400" />
        <CardHeader className="px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Perfil del candidato
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Revisa y actualiza tu informacion personal para mantener tu
                perfil al dia.
              </CardDescription>
            </div>

            {!isEditing ? (
              <Button
                type="button"
                onClick={handleStartEditing}
                className="h-9 rounded-lg bg-brand-500 text-white hover:bg-brand-600"
              >
                <Edit3 className="h-4 w-4" />
                Editar perfil
              </Button>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEditing}
                  className="h-9 rounded-lg border-gray-300 text-gray-700"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveProfile}
                  className="h-9 rounded-lg bg-brand-500 text-white hover:bg-brand-600"
                >
                  <Save className="h-4 w-4" />
                  Guardar cambios
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-7 text-center">
            <Avatar className="h-28 w-28 border-4 border-white shadow-md ring-1 ring-gray-200">
              <AvatarImage
                src={draftProfile.profileImageUrl || profile.profileImageUrl}
                alt={draftProfile.fullName || profile.fullName}
              />
              <AvatarFallback className="bg-slate-100 text-2xl font-semibold text-slate-600">
                {initials || "AE"}
              </AvatarFallback>
            </Avatar>

            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {isEditing ? draftProfile.fullName : profile.fullName}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Perfil personal del candidato
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-5 rounded-lg border-gray-300 text-gray-700"
            >
              <Camera className="h-4 w-4" />
              Cambiar foto
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <UserRound className="h-5 w-5 text-brand-500" />
                Informacion personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <FieldView
                    label="Nombre"
                    value={profile.fullName}
                    icon={BadgeCheck}
                  />
                  <FieldView
                    label="Edad"
                    value={`${profile.age} anios`}
                    icon={CalendarDays}
                  />
                  <FieldView label="Sexo" value={profile.sex} icon={Users} />
                  <FieldView
                    label="Estado civil"
                    value={profile.maritalStatus}
                    icon={Users}
                  />
                  <FieldView
                    label="Nacionalidad"
                    value={profile.nationality}
                    icon={IdCard}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input
                      id="fullName"
                      value={draftProfile.fullName}
                      onChange={(event) =>
                        updateDraftField("fullName", event.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      id="age"
                      type="number"
                      min={18}
                      max={99}
                      value={draftProfile.age}
                      onChange={(event) =>
                        updateDraftField("age", Number(event.target.value) || 0)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sexo</Label>
                    <Select
                      value={draftProfile.sex}
                      onValueChange={(value) =>
                        updateDraftField(
                          "sex",
                          value as CandidateProfile["sex"],
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Prefiero no decir">
                          Prefiero no decir
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Estado civil</Label>
                    <Select
                      value={draftProfile.maritalStatus}
                      onValueChange={(value) =>
                        updateDraftField(
                          "maritalStatus",
                          value as CandidateProfile["maritalStatus"],
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona estado civil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Soltera">Soltera</SelectItem>
                        <SelectItem value="Casada">Casada</SelectItem>
                        <SelectItem value="Divorciada">Divorciada</SelectItem>
                        <SelectItem value="Viuda">Viuda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nacionalidad</Label>
                    <Input
                      id="nationality"
                      value={draftProfile.nationality}
                      onChange={(event) =>
                        updateDraftField("nationality", event.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                  <Mail className="h-5 w-5 text-brand-500" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <div className="space-y-3">
                    <FieldView
                      label="Email"
                      value={profile.email}
                      icon={Mail}
                    />
                    <FieldView
                      label="Telefono"
                      value={profile.phone}
                      icon={Phone}
                    />
                    <FieldView
                      label="Direccion"
                      value={profile.address}
                      icon={MapPin}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={draftProfile.email}
                        onChange={(event) =>
                          updateDraftField("email", event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefono</Label>
                      <Input
                        id="phone"
                        value={draftProfile.phone}
                        onChange={(event) =>
                          updateDraftField("phone", event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Direccion</Label>
                      <Textarea
                        id="address"
                        value={draftProfile.address}
                        onChange={(event) =>
                          updateDraftField("address", event.target.value)
                        }
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                  <IdCard className="h-5 w-5 text-brand-500" />
                  Identificacion
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <div className="space-y-3">
                    <FieldView label="DUI" value={profile.dui} icon={IdCard} />
                    <FieldView
                      label="Fecha de nacimiento"
                      value={profile.birthDate}
                      icon={CalendarDays}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dui">DUI</Label>
                      <Input
                        id="dui"
                        value={draftProfile.dui}
                        onChange={(event) =>
                          updateDraftField("dui", event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={draftProfile.birthDate}
                        onChange={(event) =>
                          updateDraftField("birthDate", event.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
