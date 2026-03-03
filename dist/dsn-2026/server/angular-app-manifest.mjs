
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-QZPQLEA3.js",
      "chunk-2IGEVF4P.js",
      "chunk-TD4DC6IM.js",
      "chunk-7XN3NRXD.js",
      "chunk-JREVMSHC.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VHYJ2FQI.js",
      "chunk-QTKY4V7F.js",
      "chunk-RVA7YD3C.js"
    ],
    "route": "/biographie"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7TA5OBDW.js",
      "chunk-3YURJR2P.js"
    ],
    "route": "/grands-dossiers"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7355, hash: '44f181bac89c2dc0ef2f77d10052d592fd54f2432f486d30296da69f4abb3a88', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6829, hash: '2684d9687b29ab05ac7896c0270b3502a9c81b059a261f7378ab1a0d103d6bb2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21633, hash: '014a0cc055741d7c31d71bcff6ea61c36b6c3938da39d51707e1805cab901eed', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21737, hash: '5bf26b0e9083b710bf5841c7ca09b300246c1b3966c2ea00365f0424ade57ca0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21581, hash: '2545dc6127e2c77a4bb7107099404df690d547e19f0264b0dbca383e4c12af95', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'styles-NIYXGJLQ.css': {size: 360522, hash: 'x0M9a7EBVBQ', text: () => import('./assets-chunks/styles-NIYXGJLQ_css.mjs').then(m => m.default)}
  },
};
