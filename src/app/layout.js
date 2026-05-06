import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tecniservicios JF | Servicios al Hogar y Alquiler de Equipos",
  description: "Asistencia técnica profesional en Bogotá y sus alrededores, venta de productos y alquiler de equipos de Ferreteria, todo a Domicilio. ¡Contáctanos ahora!",
  keywords: ["servicios técnicos", "Bogotá", "alquiler de herramientas", "mantenimiento hogar", "Tecniservicios"],
  alternates: {
    canonical: "https://www.tecniserviciosjf.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}