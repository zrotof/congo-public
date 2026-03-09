
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
    'index.csr.html': {size: 7368, hash: '13f383f7f480ac5a7f77f930de21b76126de166a1ebd70934f6ff4b392264894', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6842, hash: 'a6bb8951a01f52e3a35e90c14b43a99f1fe8cfe7a02837455fbda002850571e3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21594, hash: '32e1eefa0355ab16a82fa908fe926ffdddc87fe80f6423ac21fbf382fa9a6718', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21646, hash: '75adcfc09ddeea130f1cf85234ee1e15c08275aa01fac699242738ac4bfe1463', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21750, hash: '73906a02a1e3346b8178c3bdc6d0a43bcc8b6447da58e73944bc59799c932e60', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NIYXGJLQ.css': {size: 360522, hash: 'x0M9a7EBVBQ', text: () => import('./assets-chunks/styles-NIYXGJLQ_css.mjs').then(m => m.default)}
  },
};
