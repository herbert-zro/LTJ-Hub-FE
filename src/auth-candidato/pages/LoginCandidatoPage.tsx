import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export const LoginCandidatoPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Card className="overflow-hidden p-0 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* IMAGE SIDE */}
          <div className="relative h-28 md:h-auto">
            <img
              src="/placeholder.svg"
              alt="Login"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* FORM */}
          <form className="p-4 md:p-6">
            <div className="flex flex-col gap-2.5">
              {/* HEADER */}
              <div className="flex flex-col items-center text-center gap-1">
                <h1 className="text-lg font-bold tracking-tight">
                  Iniciar sesión
                </h1>
                <p className="text-xs text-muted-foreground">
                  Ingresa tus credenciales para continuar
                </p>
              </div>

              {/* EMAIL */}
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

              {/* PASSWORD */}
              <div className="grid gap-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-medium">
                    Contraseña
                  </Label>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground hover:text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="h-8 text-sm"
                />
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full font-medium h-8 text-sm mt-0.5"
              >
                Iniciar sesión
              </Button>

              {/* REGISTER OPTION */}
              <p className="text-center text-xs text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/auth-candidato/registro"
                  className="font-medium text-primary hover:underline"
                >
                  Registrarse
                </Link>
              </p>

              {/* SEPARATOR */}
              <div className="relative text-center text-xs text-muted-foreground py-1">
                <span className="bg-background px-2 relative z-10">
                  Bienvenido
                </span>

                <div className="absolute left-0 right-0 top-1/2 border-t border-border"></div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* FOOTER */}
      <div className="text-center text-xs text-muted-foreground">
        Al continuar aceptas nuestros{" "}
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
