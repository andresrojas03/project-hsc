import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function VisualEchoes() {
  // Store all your photos and poems here. 
  // Just drop the real images into your Next.js public folder.
  const echoes = [
    {
      id: 1,
      imageSrc: "/the_start_point.webp", 
      alt: "El lugar donde todo comenzó",
      date: "31 Octubre 2025",
      poem: "Un lugar común para muchos,\nque vió nacer nuestra historia;\nel día que cambió mi suerte\ny te grabaste en mi memoria."
    },
    {
      id: 2,
      imageSrc: "/my_precious_lady.webp", 
      alt: "Una linda de ojos preciosos",
      date: "26 Marzo 2026",
      poem: "Se me quedan cortas las palabras\ny el idioma entero se me agota,\nintentado explicar lo que provocas\ncon solo mirarme de frente, mi niña hermosa."
    },
    {
      id: 3,
      imageSrc: "/cortesyyy.webp", 
      alt: "Bonita salida al cine con sorpresas",
      date: "6 Abril 2026",
      poem: "Ni el cielo entero con sus estrellas\npodría ganarle a tu mirada;\nyo sigo buscando tus ojitos\npara encender mi madrugada."
    },
    {
      id: 4,
      imageSrc: "/surprise_visit.webp", 
      alt: "Qué haces aquí?:O",
      date: "10 Abril 2026",
      poem: "Le pido al tiempo que me alcance\ny a la vida que me deje estar,\nen cada paso importante que des,\nsiempre a tu lado para celebrar."
    },
    {
      id: 5,
      imageSrc: "/good_memories_place.webp", 
      alt: "El edén carreando las salidas de final de semestre",
      date: "Noviembre-Diciembre 2025",
      poem: "Entre entregas, carreras y tanto estrés,\nese refugio se volvió testigo,\nde cómo el caos de fin de semestre\nera más dulce si lo pasaba contigo."
    },
    {
      id: 6,
      imageSrc: "/enjoying_together.webp", 
      alt: "La + tryhard en el mario carritos",
      date: "21 Abril 2026",
      poem: "Verte jugar, reír y competir,\nadentrarte en las cosas que amo yo...\nNo sabes la paz que me da sentir\ncómo tu mundo y el mío se vuelven uno solo."
    },
    {
      id: 7,
      imageSrc: "/bd_hang_out.webp", 
      alt: "Cumpleaños buzziiiinnggg",
      date: "25 Abril 2026",
      poem: "Sanaste los días que dolían antes,\ncambiaste la sobmra por pura luz;\nme hiciste recordar que mi cumpleaños importa,\nporque hoy lo celebro pegadito a ti."
    },
    {
      id: 8,
      imageSrc: "/us_fr.webp", 
      alt: "Nosotros en bebida, en frío ice hielo",
      date: "25 Abril 2026",
      poem: "Mismos gustos, matices diferentes,\nun contraste que nos hace perfectos;\nme fascina perderse en tus detalles\ny aprender de nuestro propio espectro."
    },
    {
      id: 9,
      imageSrc: "/happy_bd_sweetheart.webp", 
      alt: "Me encanta tomarte fotos distraida, se nota?",
      date: "15 Mayo 2026",
      poem: "Tal vez no entienda todo lo que me explicas,\n pero entiendo el brillo de tu mirada;\nverte feliz hablando de lo que amas\nes mi parte favorita de la jornada."
    },
    {
      id: 10,
      imageSrc: "/cinema_timeee.webp", 
      alt: "No te gustó la pelicula, pero a mi me gustó estar contigo",
      date: "22 Mayo 2026",
      poem: "La película pudo ser un fracaso,\npero escucharte quejarte con tanta pasión,\nmientras me detallas cada fallo,\nes música bendita para mi corazón."
    },
    {
      id: 11,
      imageSrc: "/some_silhouettes.webp", 
      alt: "Que bonitas sombras fr fr",
      date: "28 Mayo 2026",
      poem: "Concidir contigo en este campus\nes el regalo mś alto que la vida me dió;\ngracias por hacer de mis días de escuela\nel recuerdo más tierno que guardo yo."
    },
  ];

  return (
    <main className="min-h-screen w-full py-10 flex flex-col items-center">
      <div className="w-full max-w-md px-4 flex flex-col space-y-10">

        {/*Some introduction to the collage*/}
        <div className="text-center mt-4">
          <h1 className="text-xl font-mono text-white/90 tracking-wider uppercase">
            Momentos especiales a tu lado
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-sans">
            Un pequeño espacio para recordar cada momento a tu lado.
          </p>
        </div>

        {/* Simple navigation back to your main page */}
        <div className="w-full flex items-center justify-between mb-2">
          <Link href="/" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono tracking-widest uppercase">
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
          <span className="text-horizon-orange/80 text-sm font-mono tracking-widest uppercase">
            [ Ecos Visuales ]
          </span>
        </div>

        {/* The Gallery */}
        <div className="flex flex-col gap-12 pb-20">
          {echoes.map((echo, index) => (
            <article 
              key={echo.id} 
              // Adding a slight animation delay so they cascade in naturally
              className="letter-card-animate flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Photo Frame */}
              <div className="w-full aspect-[4/5] bg-cosmic-deep/50 rounded-xl overflow-hidden relative mb-6 shadow-inner">
                {/* Replace standard <img> with Next.js <Image> if you prefer optimized loading */}
                <img 
                  src={echo.imageSrc} 
                  alt={echo.alt}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Text Section */}
              <div className="text-center px-4">
                <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4 opacity-70">
                  {echo.date}
                </p>
                {/* Using your custom script font class for the vibe */}
                <p className="old-school-script text-2xl text-slate-100 leading-relaxed whitespace-pre-line drop-shadow-md">
                  {echo.poem}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}