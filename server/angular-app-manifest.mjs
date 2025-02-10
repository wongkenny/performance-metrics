
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/performance-metrics/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/performance-metrics/dashboard",
    "route": "/performance-metrics"
  },
  {
    "renderMode": 2,
    "route": "/performance-metrics/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/performance-metrics/comparison"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 9325, hash: '0fb0a88014b65518fdf1fd97842e452d67e04fd04683902f229a39d333b87d05', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 9838, hash: '873cd59be635b54056aa3a62b0bd0eaba28327409259c2d49dcd74a6aaf789ee', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 18328, hash: '5d2b68443c5500cb5c60a5546cb303024bcfa39f070c5cbae7186b039033f646', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'comparison/index.html': {size: 24781, hash: 'b58a001844792c458629748419de6e7a064b2557f28bc9b5b231918ce368049d', text: () => import('./assets-chunks/comparison_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
