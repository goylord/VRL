declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'codemirror/lib/codemirror'

declare module 'codemirror/mode/javascript/javascript'

declare module 'vue/dist/vue.esm-bundler.js'