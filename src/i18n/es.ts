import type { ToolContent } from './types';

// Español.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Unir PDF — Combina varios PDF en tu navegador, sin subir nada | runlocally',
    description:
      'Une varios archivos PDF en uno solo, en el orden que elijas, dentro de tu navegador. Los archivos se procesan en tu dispositivo y nunca se suben. Código abierto, funciona sin conexión.',
    ogTitle: 'Unir PDF — Combina varios PDF en tu navegador, sin subir nada',
    ogDescription:
      'Combina varios archivos PDF en uno dentro de tu navegador. Define el orden y descarga. No se sube nada. Código abierto, funciona sin conexión.',
  },

  hero: {
    h1: 'Unir PDF',
    tagline:
      'Combina varios archivos PDF en uno, en el orden que elijas, dentro de tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Combina archivos PDF en tu navegador',
    paras: [
      'Esta herramienta une dos o más archivos PDF en un solo documento. Agrega tus archivos, define su orden y las páginas se van añadiendo una tras otra en un único PDF que puedes descargar. Tus archivos originales quedan intactos.',
      'La unión ocurre en el navegador con pdf-lib, así que las páginas se copian tal como están. Nada se vuelve a renderizar, se recomprime ni se envía a ningún lado, y el resultado se abre en cualquier lector de PDF común.',
    ],
  },

  privacy: {
    h2: 'Por qué tus archivos no salen de tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay un paso de subida porque no hay ningún servidor al que subir nada:',
    points: [
      'La unión ocurre por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no hace ninguna petición con los datos de tu PDF.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de Red de tu navegador mientras unes los archivos: ninguna petición lleva tus archivos.',
    sourceLinkText: 'Lee el código fuente.',
  },

  howto: {
    h2: 'Cómo usarla',
    steps: [
      {
        h3: 'Agrega los PDF',
        p: 'Haz clic para seleccionar dos o más archivos PDF, o suéltalos en cualquier parte de la página. Puedes agregar más cuando quieras.',
      },
      {
        h3: 'Define el orden',
        p: 'Mueve los archivos hacia arriba o hacia abajo para ordenarlos, o quita los que no necesites. Las páginas se combinan en el orden que ves.',
      },
      {
        h3: 'Une y descarga',
        p: 'Combina los archivos en un solo PDF y descárgalo. Tus archivos originales quedan intactos.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se suben mis archivos a algún lado?',
      a: 'No. La unión ocurre por completo en tu navegador. No hay componente de servidor, así que tus archivos no tienen forma de salir de tu dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿Cómo elijo el orden en que aparecen las páginas?',
      a: 'Cada archivo que agregas aparece en una lista. Mueve los archivos hacia arriba o hacia abajo para ordenarlos y quita los que no quieras. Las páginas se combinan de arriba abajo exactamente en ese orden.',
    },
    {
      q: '¿Unir los archivos modifica los originales?',
      a: 'No. Tus archivos de entrada se leen en el dispositivo y quedan intactos. La herramienta genera un nuevo PDF combinado para que lo descargues; no se sobrescribe nada.',
    },
    {
      q: '¿Reduce la calidad o comprime las páginas?',
      a: 'No. Las páginas se copian tal como están: no hay recompresión, OCR ni nuevo renderizado. El PDF combinado conserva el mismo contenido y la misma calidad que los originales.',
    },
    {
      q: '¿Puede unir PDF protegidos con contraseña?',
      a: 'No. Los PDF cifrados (protegidos con contraseña) no se pueden abrir, así que no se pueden unir. Verás un mensaje claro si un archivo está protegido; quita la contraseña primero y vuelve a intentarlo.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda guardada en la caché, así que la unión funciona sin conexión a la red. También puedes instalarla en tu pantalla de inicio.',
    },
    {
      q: '¿Hay un límite de tamaño o de cantidad de archivos?',
      a: 'No hay un límite fijo. Como todo ocurre en tu navegador, el tope práctico depende de la memoria de tu dispositivo. Los PDF muy grandes o muy numerosos pueden tardar más.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— herramientas pequeñas que funcionan en local, en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; toda la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },
};
