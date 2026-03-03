
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
    'index.csr.html': {size: 7355, hash: '21cc024ed633fe89cc9ec5d5f8184303a2f192d556b145f7585087da361ca76e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6829, hash: 'eb3d88035bbd5ecf326dc256f81c0c5790f8f78e9cda32aa1d23f7730682fdf8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21633, hash: '27ffd96da64f943caac082deec4c22af64ef19b6a51bc15360177a5ad3eafcd0', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21581, hash: 'f1ffe9aa348d64cd3e84b60b1a393e5740d8bfc29e7e5a6b0728623856a06567', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21737, hash: 'f529c68a1efc941d077c37b361af211e18e537f2f32d8619f75027c407b7a735', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NIYXGJLQ.css': {size: 360522, hash: 'x0M9a7EBVBQ', text: () => import('./assets-chunks/styles-NIYXGJLQ_css.mjs').then(m => m.default)}
  },
};
