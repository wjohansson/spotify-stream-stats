import path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import liveReload from 'vite-plugin-live-reload'

// IMPORTANT image urls in CSS works fine
// BUT you need to create a symlink on dev server to map this folder during dev
// ln -s {path_to_project}/resources/ {path_to_project}/resources
// on production everything will work just fine
export default {
     base: '/',
    resolve: {
        alias: {
          vue: 'vue/dist/vue.esm-bundler.js',
          "@": path.resolve(__dirname),
          "@assets": path.join(__dirname, 'assets'),
        }
    },
    server: {
        // required to load scripts from custom host
        cors: true,

        // we need a strict port to match on PHP side
        // change freely, but update on PHP to match the same port
        strictPort: true,
        port: 3000
    },
    build: {
        outDir: 'web/build',
        emptyOutDir: true,
        // generate manifest.json in outDir
        manifest: true,
        target: 'es2018',
        rollupOptions: {
          // overwrite default .html entry
          input: {
            app: '/resources/js/app.js'

          }
        }
    },
    plugins: [
        vue(),
        legacy({
          targets: ['defaults', 'not IE 11']
        }),
        liveReload('resources/views/**/*.php')
    ]
}
