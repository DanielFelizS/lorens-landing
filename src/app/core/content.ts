/* Contenido tomado del "Plan integral de negocio y producto" de Lorens Music Academy. */

export interface Genero {
  nombre: string;
  midi: number;             // tecla blanca donde vive la etiqueta
  frase: Array<[number, number]>;
  texto: string;
}

/* Cada género suena con un motivo corto y cuenta qué se aprende de él en Lorens. */
export const GENEROS: Genero[] = [
  { nombre: 'Bachata', midi: 55, texto: 'Requinto y acompañamiento de bachata en la ruta de Guitarra.',
    frase: [[62,0],[66,.18],[69,.36],[71,.54],[69,.72],[66,.9]] },
  { nombre: 'Merengue', midi: 59, texto: 'Mambo y ritmo de merengue al piano, desde el nivel 1.',
    frase: [[67,0],[71,.12],[74,.24],[71,.36],[67,.48],[74,.6],[79,.72]] },
  { nombre: 'Salsa', midi: 62, texto: 'Montunos de salsa para teclado y armonía funcional.',
    frase: [[60,0],[64,.15],[67,.3],[64,.45],[65,.6],[69,.75],[72,.9]] },
  { nombre: 'Urbano', midi: 65, texto: 'Beats urbanos y mezcla básica en la ruta de Producción.',
    frase: [[57,0],[57,.25],[60,.5],[64,.62],[62,.87]] },
  { nombre: 'Alabanza', midi: 69, texto: 'Armonía y dirección para el ministerio de alabanza.',
    frase: [[60,0],[64,0],[67,0],[65,.6],[69,.6],[72,.6],[67,1.2],[71,1.2],[74,1.2]] },
  { nombre: 'Balada', midi: 72, texto: 'Canto: respiración, afinación y estilo en baladas.',
    frase: [[72,0],[71,.4],[69,.8],[67,1.2]] },
];

export const RUTAS = [
  { nombre: 'Piano y teclado', niveles: 4, detalle: '12 lecciones de 8 a 12 minutos y 4 canciones guiadas por nivel.',
    enfoque: 'Acordes, acompañamiento, bachata, balada y alabanza.' },
  { nombre: 'Guitarra', niveles: 4, detalle: '12 lecciones y 4 canciones por nivel.',
    enfoque: 'Rasgueos, requinto de bachata, acústica y eléctrica.' },
  { nombre: 'Canto', niveles: 4, detalle: '12 lecciones con ejercicios de calentamiento por nivel.',
    enfoque: 'Respiración, afinación, estilo y salud vocal.' },
  { nombre: 'Producción musical', niveles: 3, detalle: '10 lecciones y proyectos por nivel.',
    enfoque: 'DAW, beats urbanos, mezcla básica y entrega de un tema.' },
  { nombre: 'Teoría y oído', niveles: 3, detalle: '10 lecciones con ejercicios interactivos, para todas las rutas.',
    enfoque: 'Lectura, intervalos y armonía funcional.' },
];

export type Moneda = 'USD' | 'DOP';
export type Ciclo = 'mensual' | 'anual';

export interface Plan {
  id: string;
  nombre: string;
  para: string;
  precio: Record<Moneda, Record<Ciclo, number>>;
  notaCiclo: Record<Ciclo, string>;
  incluye: string[];
  cta: string;
  destacado?: boolean;
}

export const PLANES: Plan[] = [
  {
    id: 'gratis', nombre: 'Gratis', para: 'Para empezar hoy',
    precio: { USD: { mensual: 0, anual: 0 }, DOP: { mensual: 0, anual: 0 } },
    notaCiclo: { mensual: 'Sin tarjeta', anual: 'Sin tarjeta' },
    incluye: ['Diagnóstico de nivel', 'Curso "Tus primeras 3 canciones"', '1 clase general grabada', 'Comunidad en modo lectura'],
    cta: 'Hacer mi diagnóstico',
  },
  {
    id: 'grabado', nombre: 'Grabado', para: 'Aprendes a tu ritmo',
    precio: { USD: { mensual: 14, anual: 119 }, DOP: { mensual: 799, anual: 6990 } },
    notaCiclo: { mensual: 'al mes, con 7 días gratis', anual: 'al año, con 7 días gratis' },
    incluye: ['Todas las rutas grabadas', 'Biblioteca completa de clases generales', '1 clase general en vivo por semana', 'Metrónomo, afinador y oído', 'Certificados'],
    cta: 'Empezar 7 días gratis', destacado: true,
  },
  {
    id: 'pro', nombre: 'Pro', para: 'Quieres correcciones humanas',
    precio: { USD: { mensual: 39, anual: 349 }, DOP: { mensual: 2290, anual: 20590 } },
    notaCiclo: { mensual: 'al mes', anual: 'al año' },
    incluye: ['Todo lo de Grabado', '2 talleres en vivo al mes, grupos de máximo 8', '1 corrección de video por un mentor al mes'],
    cta: 'Elegir Pro',
  },
  {
    id: 'artista', nombre: 'Artista', para: 'Vas a lanzar tu música',
    precio: { USD: { mensual: 199, anual: 1090 }, DOP: { mensual: 11900, anual: 64300 } },
    notaCiclo: { mensual: 'al mes, mínimo 6 meses', anual: 'pago único por 6 meses' },
    incluye: ['Todo lo de Pro', '4 sesiones 1:1 de 45 min al mes, grabadas', 'Ruta de artista: composición, producción, marca, derechos y distribución', 'Plan de lanzamiento y revisión final de tu tema'],
    cta: 'Hablar con un asesor',
  },
];

export const SUELTAS = [
  { nombre: 'Sesión 1:1 de 45 min', precio: 'USD 45', nota: 'USD 39 para miembros. Prueba a un mentor.' },
  { nombre: 'Paquete de 4 sesiones', precio: 'USD 160', nota: 'Vence en 90 días.' },
  { nombre: 'Masterclass con artista invitado', precio: 'USD 25–60', nota: 'Gratis o con descuento en Artista.' },
  { nombre: 'Revisión de mezcla o de tema', precio: 'USD 49', nota: 'Entrega en 5 días hábiles.' },
];

export const SEMANAS = [
  { rango: [0, 0], titulo: 'Preparación', texto: 'Una semana antes: equipo, software, prueba de audio y bienvenida en vivo.' },
  { rango: [1, 6], titulo: 'Módulo 1: Fundamentos', texto: '2 clases en vivo por semana y una sesión 1:1 con tu mentor cada 2 semanas.' },
  { rango: [7, 15], titulo: 'Módulo 2: Artista', texto: 'Composición, producción, grabación de tu tema y plan de lanzamiento.' },
  { rango: [16, 16], titulo: 'Showcase', texto: 'Presentas tu tema en vivo, evaluación final y diploma.' },
];

export const SELECCION_MENTORES = [
  { etapa: 'Postulación', texto: 'Instrumentos, géneros, discografía y un video de 3 minutos enseñando.' },
  { etapa: 'Revisión de perfil', texto: 'Rúbrica: dominio, didáctica, presencia en cámara.' },
  { etapa: 'Clase demo', texto: '20 minutos de clase real ante un evaluador.' },
  { etapa: 'Verificación', texto: 'Identidad, contrato y antecedentes si enseñará a menores.' },
  { etapa: 'Capacitación', texto: 'El método Lorens, la sala en vivo y el código de conducta.' },
  { etapa: 'Periodo de prueba', texto: 'Hasta 5 alumnos durante 30 días, con reseñas y puntualidad revisadas.' },
  { etapa: 'Mentor activo', texto: 'Perfil público y evaluación cada trimestre.' },
];

export const FAQ = [
  { q: '¿Puedo probar antes de pagar?', a: 'Sí. El diagnóstico y el curso inicial son gratis, y el plan Grabado tiene 7 días de prueba. Además, el primer pago de cualquier plan tiene garantía de devolución de 30 días.' },
  { q: '¿Cómo cancelo?', a: 'Desde Mi cuenta, en dos clics y sin llamadas. Si lo prefieres, puedes pausar tu plan hasta 2 meses en lugar de cancelar.' },
  { q: '¿Las clases quedan grabadas?', a: 'Todas. Las clases generales y los talleres pasan a la biblioteca común en 24 horas. Tus sesiones 1:1 van a tu biblioteca privada en menos de 2 horas, con los marcadores y notas de tu mentor.' },
  { q: '¿Cómo suena un instrumento por videollamada?', a: 'Nuestra sala en vivo usa un modo música por defecto: sin cancelación de eco ni supresión de ruido, audio estéreo de alta calidad y una prueba de sonido antes de empezar. Trabajamos en llamada y respuesta, porque la latencia de internet no permite tocar a la vez de forma fiable.' },
  { q: '¿Puedo pagar en pesos?', a: 'Sí. Cobramos en RD$ con pasarela local y en USD para quien vive fuera. Los precios en pesos usan la tasa de RD$59 por dólar y se mantienen durante 12 meses.' },
  { q: '¿Qué pasa si no puedo ir a una sesión 1:1?', a: 'Reprogramar es gratis con 24 horas de aviso. Las sesiones del mes se acumulan como máximo un mes.' },
  { q: '¿Cómo compro The Lorens Experience?', a: 'Siempre a través de la reunión de evaluación gratuita. Así confirmamos que el programa encaja con tu nivel y tu tiempo antes de reservar tu cupo en la cohorte.' },
  { q: '¿Hay clases para niños?', a: 'Todavía no. Estamos preparando cuentas vinculadas a un adulto, sesiones siempre grabadas y visibles para el tutor y mentores verificados. Llegan en una segunda fase.' },
];
