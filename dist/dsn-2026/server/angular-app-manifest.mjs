
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-SIAJT2XA.js",
      "chunk-CX2ZLCRV.js",
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
    'index.csr.html': {size: 7355, hash: '683b50cf30f91b29cda745b1aef2fac6b314b7339fe6f34fe05e588c9ded23ad', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6829, hash: '65c7e0bf02b455c49aff3f8602ef6bc1159c178b3518b76abdbbdde5462f26da', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21633, hash: '8495197ecdeda4eb0c3c59c7152bf6801100677aaa59cea49d47550ad6b5b61d', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21737, hash: 'd2f5b114a1b928399cf88dcd0ac23635ab909a7a48d6dad99ca27576412d33fb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21581, hash: '8e9940ec289b17727272aa31992c8a3cd0d3113802743c08bc96960ad4a9a8d9', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'styles-NIYXGJLQ.css': {size: 360522, hash: 'x0M9a7EBVBQ', text: () => import('./assets-chunks/styles-NIYXGJLQ_css.mjs').then(m => m.default)}
  },
};
