import type { ToolContent } from './types';

// pdf-merge.

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Merge PDF — Combine PDFs in Your Browser, No Upload | runlocally',
    description:
      'Merge several PDF files into one, in the order you choose, directly in your browser. Files are processed on your device and never uploaded. Open source, works offline.',
    ogTitle: 'Merge PDF — Combine PDFs in Your Browser, No Upload',
    ogDescription:
      'Combine multiple PDF files into one in your browser. Set the order, then download. Nothing is uploaded. Open source, works offline.',
  },

  hero: {
    h1: 'Merge PDF',
    tagline:
      'Combine several PDF files into one — in the order you choose, in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Combine PDF files, in your browser',
    paras: [
      'This tool merges two or more PDF files into a single document. Add your files, arrange their order, and the pages are appended one after another into one PDF you can download. Your original files are left unchanged.',
      'Merging runs in the browser with pdf-lib, so pages are copied exactly as they are. Nothing is re-rendered, recompressed, or sent anywhere, and the result opens in any normal PDF reader.',
    ],
  },

  privacy: {
    h2: 'Why your files stay on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The merge runs entirely in your browser.',
      'The page is served as static files and makes no request with your PDF data.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: 'If you want to check for yourself, open your browser\'s Network panel while merging — no request carries your files.',
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Add PDFs',
        p: 'Click to select two or more PDF files, or drop them anywhere on the page. You can add more at any time.',
      },
      {
        h3: 'Set the order',
        p: 'Move files up or down to arrange them, or remove any you don\'t need. Pages are combined in the order shown.',
      },
      {
        h3: 'Merge and download',
        p: 'Combine the files into one PDF and download it. Your original files are untouched.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Are my files uploaded anywhere?',
      a: 'No. The merge runs entirely in your browser. There is no server component, so your files have no path off your device. The source is open and you can confirm this in your browser\'s Network panel.',
    },
    {
      q: 'How do I choose the order pages appear in?',
      a: 'Each file you add appears in a list. Move files up or down to arrange them, and remove any you don\'t want. The pages are combined top to bottom in exactly that order.',
    },
    {
      q: 'Does merging change the original files?',
      a: 'No. Your input files are read on the device and left unchanged. The tool produces a new combined PDF for you to download; nothing is overwritten.',
    },
    {
      q: 'Does it reduce quality or compress the pages?',
      a: 'No. Pages are copied exactly as they are — there is no recompression, OCR, or re-rendering. The merged PDF keeps the same content and quality as the originals.',
    },
    {
      q: 'Can it merge password-protected PDFs?',
      a: 'No. Encrypted (password-protected) PDFs can\'t be opened, so they can\'t be merged. You\'ll see a clear message if a file is protected; remove the password first, then try again.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so merging works without a network connection. You can also install it to your home screen.',
    },
    {
      q: 'Is there a limit on file size or number of files?',
      a: 'There is no fixed limit. Because everything runs in your browser, the practical ceiling depends on your device\'s memory. Very large or numerous PDFs may be slower.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      'Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer\'s.',
    securityText: 'Security',
  },
};
