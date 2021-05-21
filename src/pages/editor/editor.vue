<template>
    <div id="editor-container">
        <section class="left-code-container">
            <div class="editor-module-card">
                <div class="editor-moudle-card-head">Template</div>
                <div class="editor-moudle-card-content">
                    <textarea ref="html" />
                </div>
            </div>
            <div class="editor-module-card">
                <div class="editor-moudle-card-head">Script</div>
                <div class="editor-moudle-card-content">
                    <textarea ref="js" />
                </div>
            </div>
            <div class="editor-module-card">
                <div class="editor-moudle-card-head">Style</div>
                <div class="editor-moudle-card-content"></div>
            </div>
        </section>
        <section class="right-render-container">
            <div><button @click="renderVue">渲染</button></div>
            <div id="render"></div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, createApp } from 'vue'
import { compile } from 'vue/dist/vue.esm-bundler.js'
import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/monokai.css'

import 'codemirror/lib/codemirror.css'

export default defineComponent({
    setup() {
        const html = ref('htmlmixed')
        const js = ref('javascript')

        const htmlContent = ref('')
        const jsContent = ref('')

        const baseOptions = {
            tabSize: 4,
            styleActiveLine: true,
            lineNumbers: true,
            styleSelectedText: true,
            line: true,
            foldGutter: true,
            highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
            hintOptions: {
                completeSingle: true,
            },
            matchBrackets: true,
            showCursorWhenSelecting: true,
            theme: "monokai",
            extraKeys: { Ctrl: "autocomplete" }
        }
        const htmlOption = {...baseOptions, ...{
            mode: {
                name: "htmlmixed",
                json: true,
            },
        }}
        const jsOption = {...baseOptions, ...{
            mode: {
                name: "javascript",
                json: true,
            },
        }}
        const renderVue = () => {
            const app = createApp({
                ...{
                    ...window.eval(`(function(){return {${jsContent.value}}}())`)
                },
                ...{
                    render: compile(`${htmlContent.value}`)
                }
            })
            var divEle = document.createElement("div")
            document.body.appendChild(divEle)
            app.mount(divEle)
            console.log(document.getElementById('render'), divEle)
            document.getElementById('render')?.appendChild(divEle)
        }
        onMounted(() => { 
            const htmlCode = CodeMirror.fromTextArea(html.value, htmlOption)
            const jsCode = CodeMirror.fromTextArea(js.value, jsOption)
            htmlCode.on('change', (instance: any) => {
                console.log(instance.getValue())
                htmlContent.value = instance.getValue()
            })
            jsCode.on('change', (instance: any) => {
                console.log(instance.getValue())
                jsContent.value = instance.getValue()
            })
            
        })
        return {
            html,
            js,
            renderVue,
        }
    },
    created() {

    }
})
</script>
<style lang="less">
#editor-container {
    display:flex;
    flex-direction: row;
}
.left-code-container {
    width: 50vw;
    .editor-module-card {
        border: 1px solid #eee;
        .editor-moudle-card-head {
            height: 30px;
            line-height: 30px;
            background-color: #ccc;
        }
        .editor-moudle-card-content {
            min-height: 100px;
        }
    }
}
.right-render-container {
    width: 50vw;
    padding: 10px;
}
</style>
