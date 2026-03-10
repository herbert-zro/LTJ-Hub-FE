import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Card className="overflow-hidden p-0 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative h-28 md:h-auto">
            <img
              src="/placeholder.svg"
              alt="Registro"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <form className="p-4 md:p-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-lg font-bold tracking-tight">
                  Crear cuenta
                </h1>
                <p className="text-xs text-muted-foreground">
                  Completa tus datos para registrarte como candidato
                </p>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="fullName" className="text-xs font-medium">
                  Nombre completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Tu nombre completo"
                  required
                  className="h-8 text-sm"
                />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="email" className="text-xs font-medium">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  required
                  className="h-8 text-sm"
                />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password" className="text-xs font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="h-8 text-sm"
                />
              </div>

              <div className="grid gap-1">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium"
                >
                  Confirmar contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="h-8 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full font-medium h-8 text-sm mt-1"
              >
                Registrarse
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/auth-candidato"
                  className="font-medium text-primary hover:underline"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        Al registrarte aceptas nuestros{" "}
        <a href="#" className="underline hover:text-primary">
          Términos de Servicio
        </a>{" "}
        y{" "}
        <a href="#" className="underline hover:text-primary">
          Política de Privacidad
        </a>
      </div>
    </div>
  );
};
