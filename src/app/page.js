"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const MapReal = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#0D0F12] flex items-center justify-center text-[10px] font-bold text-[#5A6080]">CARGANDO MAPA...</div>
});

export default function Home() {
  // --- ESTADOS ---
  const [vistaActual, setVistaActual] = useState('menu_principal');
  const [categoria, setCategoria] = useState(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [telefonoUser, setTelefonoUser] = useState('');

  const [posicion, setPosicion] = useState({ lat: 4.711, lng: -74.072 });

  // --- DATA: UNIDADES DE NEGOCIO ---
  const unidadesNegocio = [
    { id: 'servicios', titulo: 'Servicios a Domicilio', sub: 'Asistencia', icono: '🛠️', color: 'text-[#F05A1A]' },
    { id: 'ventas', titulo: 'Venta de Productos', sub: 'Tienda', icono: '🛒', color: 'text-blue-500' },
    { id: 'alquiler', titulo: 'Alquiler de Equipos', sub: 'Equipos', icono: '🏗️', color: 'text-yellow-500' }
  ];

  // --- DATA: CATEGORÍAS COMPLETAS DE SERVICIOS ---
  const categoriasServicios = [
    {
      id: 'instalaciones',
      nombre: 'Instalaciones',
      icono: '🔧',
      color: 'from-[#0A1A1A] to-[#003D3D]',
      servicios: [
        { nombre: 'Instalación de grifería', precio: '' },
        { nombre: 'Instalación eléctrica', precio: '' },
        { nombre: 'Montaje de muebles', precio: '' }
      ]
    },
    {
      id: 'reparaciones',
      nombre: 'Reparaciones',
      icono: '🧰',
      color: 'from-[#1A1A1A] to-[#2D2D2D]',
      servicios: [
        { nombre: 'Fugas de agua', precio: '' },
        { nombre: 'Cortos eléctricos', precio: '' },
        { nombre: 'Arreglos generales', precio: '' }
      ]
    },
    {
      id: 'construccion',
      nombre: 'Construcción Ligera',
      icono: '🧱',
      color: 'from-[#1A0F00] to-[#3D2600]',
      servicios: [
        { nombre: 'Resanes', precio: '' },
        { nombre: 'Pintura de paredes', precio: '' }
      ]
    },
    {
      id: 'mantenimiento',
      nombre: 'Mantenimiento',
      icono: '🧹',
      color: 'from-[#001A0A] to-[#003D14]',
      servicios: [
        { nombre: 'Limpieza de tanques', precio: '' },
        { nombre: 'Mantenimiento preventivo', precio: '' }
      ]
    },
    {
      id: 'cerrajeria',
      nombre: 'Cerrajería',
      icono: '🔐',
      color: 'from-[#1A0A00] to-[#3D1A00]',
      servicios: [
        { nombre: 'Apertura de puertas', precio: '' },
        { nombre: 'Apertura de vehículos', precio: '' },
        { nombre: 'Instalación de cerraduras', precio: '' },
        { nombre: 'Cambio de cerraduras', precio: '' },
        { nombre: 'Reparación de cerraduras', precio: '' },
        { nombre: 'Duplicado de llaves', precio: '' }
      ]
    }
  ];

  // --- DATA: TIENDA Y ALQUILER ---
  const productosVenta = [
    {
      id: 'herramientas',
      nombre: 'Herramientas',
      icono: '🛠️',
      color: 'from-[#001A3D] to-[#000A1A]',
      items: [
        { nombre: 'Martillos', precio: '', img: '🔌' },
        { nombre: 'Juego de Destornilladores', precio: '', img: '🪛' },
        { nombre: 'Taladros', precio: '', img: '⚙️' }
      ]
    },
    {
      id: 'tornilleria',
      nombre: 'Tornillería',
      icono: '🔩',
      color: 'from-[#1C2030] to-[#0D0F12]',
      items: [
        { nombre: 'Tornilleria', precio: '', img: '🔩' },
        { nombre: 'Chazos ', precio: '', img: '⚪' },
      ]
    },
    {
      id: 'electricos',
      nombre: 'Eléctricos',
      icono: '⚡',
      color: 'from-[#1A1A00] to-[#0D0D00]',
      items: [
        { nombre: 'Cable Encaquetado (mt)', precio: '', img: '🔌' },
        { nombre: 'Bombillo LED', precio: '', img: '💡' },
        { nombre: 'Multitomas', precio: '', img: '📟' }
      ]
    }
  ];

  const equiposAlquiler = [
    {
      id: 'maquinaria',
      nombre: 'Maquinaria',
      icono: '🏗️',
      color: 'from-[#3D3200] to-[#1A1500]',
      items: [
        { nombre: 'Taladros', precio: '' },
        { nombre: 'Herramientas', precio: '' },
        { nombre: 'Pulidoras', precio: '' }
      ]
    },
    
  ];

  // --- FUNCIONES ---
  const abrirPedido = (serv) => {
    setServicioSeleccionado(serv);
    setMostrarFormulario(true);
  };

  const enviarWhatsApp = (datos) => {
    const numero = "+573169493808";

    // Formato universal de Google Maps
    const ubicacionLink = `https://www.google.com/maps?q=${posicion.lat},${posicion.lng}`;

    // Usamos constantes de texto para los emojis (Unicode)
    const iconBox = "\u{1F4E6}";      // 📦
    const iconPhone = "\u{1F4DE}";    // 📞
    const iconMap = "\u{1F4CD}";     // 📍
    const iconHome = "\u{1F3E0}";     // 🏠
    const iconLink = "\u{1F517}";     // 🔗

    let tipoPedido = "NUEVO PEDIDO";
    let etiquetaItem = "ITEM";
    let emojiTitulo = "\u{2699}";     // ⚙️

    if (vistaActual === 'servicios') {
      tipoPedido = "SOLICITUD DE ASISTENCIA";
      etiquetaItem = "SERVICIO";
      emojiTitulo = "\u{1F6E0}";      // 🛠️
    } else if (vistaActual === 'ventas') {
      tipoPedido = "ORDEN DE COMPRA";
      etiquetaItem = "PRODUCTO";
      emojiTitulo = "\u{1F6D2}";      // 🛒
    } else if (vistaActual === 'alquiler') {
      tipoPedido = "SOLICITUD DE ALQUILER";
      etiquetaItem = "EQUIPO";
      emojiTitulo = "\u{1F3D7}";      // 🏗️
    }

    // Construcción del mensaje con los códigos Unicode
    const textoMensaje =
      `*${emojiTitulo} ${tipoPedido} - TECNISERVICIOS_JF*\n\n` +
      `*${iconBox} ${etiquetaItem}:* ${datos.servicio}\n` +
      `*${iconPhone} TELÉFONO:* ${datos.telefono}\n\n` +
      `*${iconMap} UBICACIÓN (GPS):*\n${ubicacionLink}\n\n` +
      `*${iconHome} DETALLES ADICIONALES:*\n${datos.direccion}\n\n` +
      `_Enviado desde la App TECNISERVICIOS_JF_`;

    // El truco final: usamos window.open con la URL ya codificada
    const urlFinal = `https://wa.me/${numero}?text=${encodeURIComponent(textoMensaje)}`;

    window.open(urlFinal, '_blank');
  };

  const obtenerUbicacionActual = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setPosicion(coords);
      // Nota: El mapa se moverá automáticamente gracias al estado 'posicion'
    }, (error) => {
      alert("No se pudo obtener tu ubicación. Revisa los permisos.");
    });
  };

  const cambiarVista = (vista) => {
    setCategoria(null);
    setVistaActual(vista);
  };

  return (
    <main className="max-w-md mx-auto min-h-screen pb-24 text-white bg-[#0D0F12] relative z-0">

      {/* HEADER */}
      <header className="p-8 pt-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
            TECNISERVICIOS<span className="text-[#F05A1A]">JF</span>
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-[#5A6080] font-bold uppercase mt-2">Soluciones para el Hogar</p>
        </div>
        <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-[#22C55E] text-[10px] font-bold uppercase tracking-wider"></span>
        </div>
      </header>

      {/* VISTA 1: MENU PRINCIPAL */}
      {/* VISTA 1: MENU PRINCIPAL */}
      {vistaActual === 'menu_principal' && (
        <section className="px-6 space-y-4 animate-in fade-in duration-500 relative z-50">

          <h2 className="text-[#5A6080] text-xs font-bold uppercase tracking-[0.2em] mb-6 px-2 italic text-center">
            Selecciona una unidad
          </h2>

          {unidadesNegocio.map((u) => (
            <button
              key={u.id}
              onClick={() => cambiarVista(u.id)}
              className="w-full relative overflow-hidden bg-gradient-to-br from-[#141720] to-[#0D0F12] border border-white/5 rounded-[32px] p-8 text-left active:scale-[0.95] touch-manipulation"
            >
              <div className="absolute top-0 right-0 p-6 text-6xl opacity-10">{u.icono}</div>
              <p className={`${u.color} text-[10px] font-black uppercase tracking-[0.3em] mb-2`}>{u.sub}</p>
              <h3
                className="text-3xl font-black italic uppercase tracking-tighter text-white leading-tight"
                dangerouslySetInnerHTML={{ __html: u.titulo.replace(' ', '<br/>') }}
              />
            </button>
          ))}
        </section>
      )}

      {/* VISTA 2: SERVICIOS DETALLADOS */}
      {vistaActual === 'servicios' && (
        <section className="px-6 space-y-3 animate-in slide-in-from-right duration-300">
          <button onClick={() => cambiarVista('menu_principal')} className="flex items-center gap-2 text-[#5A6080] text-[10px] font-black uppercase tracking-widest mb-6 px-2">
            ← Volver al inicio
          </button>

          {categoriasServicios.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => setCategoria(categoria === cat.id ? null : cat.id)}
                className={`w-full flex items-center bg-[#141720] border border-[#2A2F45] rounded-2xl overflow-hidden transition-all ${categoria === cat.id ? 'border-[#F05A1A]' : ''
                  }`}
              >
                <div className={`w-20 h-20 flex items-center justify-center text-3xl bg-gradient-to-br ${cat.color}`}>
                  {cat.icono}
                </div>
                <div className="flex-1 px-5 text-left text-white">
                  <p className="text-xl font-bold tracking-tight">{cat.nombre}</p>
                  <p className="text-[10px] text-[#5A6080] uppercase font-bold tracking-widest mt-0.5">Asistencia Experta</p>
                </div>
              </button>

              {categoria === cat.id && (
                <div className="mt-2 mx-1 bg-[#1C2030] rounded-2xl border-t-2 border-[#F05A1A] animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  {cat.servicios.map((serv, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 border-b border-[#2A2F45] last:border-0 hover:bg-white/5">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-white tracking-tight leading-tight">{serv.nombre}</p>
                        <p className="text-[11px] text-[#F05A1A] font-bold mt-1">${serv.precio} COP*</p>
                      </div>
                      <button
                        onClick={() => abrirPedido(serv)}
                        className="bg-white text-black font-black px-6 py-2 rounded-xl text-[10px] uppercase tracking-widest active:scale-90 transition-transform"
                      >
                        Pedir
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* VISTA: VENTAS / TIENDA */}
      {vistaActual === 'ventas' && (
        <section className="px-6 space-y-3 animate-in slide-in-from-right duration-300">
          <button onClick={() => cambiarVista('menu_principal')} className="flex items-center gap-2 text-[#5A6080] text-[10px] font-black uppercase tracking-widest mb-6 px-2">← Volver</button>
          {productosVenta.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => setCategoria(categoria === cat.id ? null : cat.id)}
                className={`w-full flex items-center bg-[#141720] border border-[#2A2F45] rounded-2xl overflow-hidden transition-all ${categoria === cat.id ? 'border-blue-500' : ''}`}
              >
                <div className={`w-20 h-20 flex items-center justify-center text-3xl bg-gradient-to-br ${cat.color}`}>{cat.icono}</div>
                <div className="flex-1 px-5 text-left text-white">
                  <p className="text-xl font-bold tracking-tight">{cat.nombre}</p>
                  <p className="text-[10px] text-[#5A6080] uppercase font-bold tracking-widest mt-0.5">Disponibilidad Inmediata</p>
                </div>
              </button>
              {categoria === cat.id && (
                <div className="mt-2 mx-1 bg-[#1C2030] rounded-2xl border-t-2 border-blue-500 animate-in fade-in slide-in-from-top-2">
                  {cat.items.map((prod, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 border-b border-[#2A2F45] last:border-0">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{prod.img}</span>
                        <div>
                          <p className="font-bold text-white text-sm leading-tight">{prod.nombre}</p>
                          <p className="text-[11px] text-blue-400 font-bold mt-1">${prod.precio} COP</p>
                        </div>
                      </div>
                      <button onClick={() => abrirPedido(prod)} className="bg-white text-black font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest active:scale-90 transition-transform">Comprar</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* VISTA: ALQUILER */}
      {vistaActual === 'alquiler' && (
        <section className="px-6 space-y-3 animate-in slide-in-from-right duration-300">
          <button onClick={() => cambiarVista('menu_principal')} className="flex items-center gap-2 text-[#5A6080] text-[10px] font-black uppercase tracking-widest mb-6 px-2">← Volver</button>
          {equiposAlquiler.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => setCategoria(categoria === cat.id ? null : cat.id)}
                className={`w-full flex items-center bg-[#141720] border border-[#2A2F45] rounded-2xl overflow-hidden transition-all ${categoria === cat.id ? 'border-yellow-500' : ''}`}
              >
                <div className={`w-20 h-20 flex items-center justify-center text-3xl bg-gradient-to-br ${cat.color}`}>{cat.icono}</div>
                <div className="flex-1 px-5 text-left text-white">
                  <p className="text-xl font-bold tracking-tight">{cat.nombre}</p>
                  <p className="text-[10px] text-[#5A6080] uppercase font-bold tracking-widest mt-0.5">Equipos Certificados</p>
                </div>
              </button>
              {categoria === cat.id && (
                <div className="mt-2 mx-1 bg-[#1C2030] rounded-2xl border-t-2 border-yellow-500 animate-in fade-in slide-in-from-top-2">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 border-b border-[#2A2F45] last:border-0">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-white text-sm leading-tight">{item.nombre}</p>
                        <p className="text-[11px] text-yellow-400 font-bold mt-1">${item.precio} COP</p>
                      </div>
                      <button onClick={() => abrirPedido(item)} className="bg-white text-black font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest active:scale-90 transition-transform">Alquilar</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* BOTTOM SHEET: FORMULARIO DE PEDIDO */}
      {/* BOTTOM SHEET: FORMULARIO DE PEDIDO */}
      {mostrarFormulario && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          {/* Fondo oscuro */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setMostrarFormulario(false)} />
          <div className="relative w-full max-w-md bg-[#141720] rounded-t-[40px] border-t border-[#F05A1A] p-8 pb-12 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-[#2A2F45] rounded-full mx-auto mb-8" />

            <div className="mb-8 text-center">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Agendar <span className="text-[#F05A1A]">Servicio</span></h3>
              <p className="text-[#5A6080] text-[10px] font-bold uppercase mt-2 italic">{servicioSeleccionado?.nombre}</p>
            </div>

            <div className="space-y-4">
              {/* EL MAPA REAL */}
              <p className="text-[9px] text-[#5A6080] font-bold uppercase mb-2 ml-2 italic">
                📍 Mueve el pin azul hasta tu ubicación exacta
              </p>
              <div className="h-60 bg-[#0D0F12] rounded-3xl border border-[#2A2F45] overflow-hidden relative z-0">
                {/* REEMPLAZA EL MapContainer VIEJO POR ESTE NUEVO */}
                {mostrarFormulario && (
                  <MapReal
                    posicion={posicion}
                    setPosicion={setPosicion}
                  />
                )}

                {/* BOTÓN GPS */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el click se propague al mapa
                    obtenerUbicacionActual();
                  }}
                  className="absolute bottom-4 right-4 z-[1000] bg-[#F05A1A] w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                >
                  🎯
                </button>

                <div className="absolute top-2 left-2 z-[500] bg-black/60 px-2 py-1 rounded text-[8px] font-bold text-white uppercase tracking-widest">
                  Toca el mapa para precisar
                </div>
              </div>

              <input
                type="text"
                placeholder="COMPLEMENTO DE DIRECCIÓN (CONJUNTO, APTO, TORRE, LOCAL...)"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className={`w-full bg-[#0D0F12] border p-4 rounded-xl text-white text-[10px] font-bold outline-none transition-colors ${direccion.length > 5 ? 'border-[#22C55E]' : 'border-[#2A2F45] focus:border-[#F05A1A]'
                  }`}
              />

              <input
                type="tel"
                placeholder="TELÉFONO DE CONTACTO (10 DÍGITOS)"
                value={telefonoUser}
                onChange={(e) => {
                  // Solo permite números y máximo 10 dígitos
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) setTelefonoUser(val);
                }}
                className={`w-full bg-[#0D0F12] border p-4 rounded-xl text-white text-[10px] font-bold outline-none transition-colors ${telefonoUser.length === 10 ? 'border-[#22C55E]' : 'border-[#2A2F45] focus:border-[#F05A1A]'
                  }`}
              />

              <button
                disabled={direccion.length < 5 || telefonoUser.length < 10}
                onClick={() => enviarWhatsApp({
                  servicio: servicioSeleccionado.nombre,
                  direccion: direccion,
                  telefono: telefonoUser
                })}
                className={`w-full font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs shadow-lg transition-all active:scale-95 ${direccion.length >= 5 && telefonoUser.length === 10
                  ? 'bg-[#F05A1A] text-white shadow-orange-500/20 opacity-100'
                  : 'bg-[#2A2F45] text-[#5A6080] cursor-not-allowed opacity-50 shadow-none'
                  }`}
              >
                {direccion.length < 5 || telefonoUser.length < 10
                  ? 'Completa los datos'
                  : 'Confirmar y Enviar WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR INFERIOR */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0D0F12]/90 backdrop-blur-xl border-t border-[#2A2F45] flex justify-around items-center h-20 z-40">
        <div
          onClick={() => cambiarVista('menu_principal')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${vistaActual === 'menu_principal' ? 'text-[#F05A1A]' : 'text-[#5A6080]'}`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Inicio</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#5A6080]">
          <span className="text-xl">📋</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Citas</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#5A6080]">
          <span className="text-xl">👤</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Perfil</span>
        </div>
      </nav>

      {/* BOTÓN WHATSAPP FLOTANTE CON ICONO OFICIAL */}
      <a
        href="https://wa.me/573169493808"
        target="_blank"
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#22C55E] rounded-full shadow-2xl flex items-center justify-center z-50 animate-bounce transition-transform active:scale-90"
      >
        <svg 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          className="w-8 h-8 text-white"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.139l.363.216c1.552.923 3.33 1.411 5.14 1.412 5.333 0 9.673-4.34 9.675-9.672a9.61 9.61 0 00-2.827-6.839 9.61 9.61 0 00-6.84-2.825c-5.334 0-9.675 4.341-9.677 9.674-.001 1.83.501 3.614 1.453 5.166l.237.385-1.008 3.684 3.774-.99z"/>
        </svg>
      </a>

    </main>
  );
}