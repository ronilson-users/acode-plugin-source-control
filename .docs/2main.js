 import plugin from '../plugin.json';
 import style from './style.scss';
 
 const sidebarApps = acode.require('sidebarApps');
 
 class SourceControl {
 constructor(){
 this.editor = editorManager.editor;
 }
 
 async init() {
 try {
 acode.addIcon('detect-icon', this.baseUrl + 'assets/icon.png');
 this.globalStyles();
 this.container();
 } catch (error) {
 console.error('Erro ao inicializar o plugin de controle de origem:', error);
 }
 }
 
 /*
 Style global
 */
 
 globalStyles() {
 this.$style = tag('style', { textContent: style, id: 'source-control' });
 document.head.append(this.$style);
 }
 
 
 
 /*
    container
 */
 container() {
 this.$containerControl = tag('div', { className: 'container sidebar-control' });
 
 const $header = tag('div', { className: 'header flex-container' });
 
 const $title = tag('span', { className: 'title', textContent: 'SOURCE CONTROL' });
 
 
 
 $header.append($title);
 
 this.$sourceControlArea = tag('div', { className: 'container control-area' });
 
  
 this.$containerControl.append($header, this.$sourceControlArea);
 sidebarApps.add('detect-icon', 'detect-sidebar-app', 'Detect', (app) => {
 app.append(this.$containerControl);
 });
 
 
 }
 
 async destroy() {
 // Método de limpeza ou remoção de event listeners
 }
 }
 
 if (window.acode) {
 const acodePlugin = new SourceControl();
 acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
 if (!baseUrl.endsWith('/')) {
 baseUrl += '/';
 }
 acodePlugin.baseUrl = baseUrl;
 await acodePlugin.init($page, cacheFile, cacheFileUrl);
 });
 acode.setPluginUnmount(plugin.id, () => {
 acodePlugin.destroy();
 });
 }