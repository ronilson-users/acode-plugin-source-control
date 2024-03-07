import '@fortawesome/fontawesome-free/css/all.css';

import plugin from '../plugin.json';
import style from './style.scss';
import {logger} from './logger.js'
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

const $header = tag('div', { className: 'header-sc' });
const $title = tag('span', { className: 'title-h', textContent: 'SOURCE CONTROL' });

const $initilizeRepo = tag('button', {
className: 'button-init-repo', textContent: 'INITIALIZE REPOSITORY'
});




$header.append($title, $initilizeRepo);



// Criação do menu
const $menucontrol = document.createElement('div');
$menucontrol.className = 'menu-bar';

const $buttonIcon = tag('button', {
  className: 'icon-button fas fa-plus-circle'
});


$buttonIcon.addEventListener('click', () => {
window.toast('Botão personalizado clicado', 4000);
// Adicione aqui o código para a ação do botão personalizado
});

$menucontrol.appendChild($buttonIcon); // Adicionando o botão ao menu

// Adicionar o menu ao control-area
this.$sourceControlArea = tag('div', { className: 'control-area' });
this.$sourceControlArea.appendChild($menucontrol);
// Criar um botão dentro da control-area
const $customButton = document.createElement('button');
$customButton.textContent = 'Custom Button';
$customButton.addEventListener('click', () => {
window.toast('Botão personalizado clicado', 4000);
// Adicione aqui o código para a ação do botão personalizado
});
this.$sourceControlArea.appendChild($customButton);

let currentBranch = 'main';
const $branchButton = tag('button', { textContent: `Branch: ${currentBranch}`, id: 'branchButton' });
$branchButton.classList.add('branch-button');
$branchButton.addEventListener('click', async () => {
const multiPrompt = acode.require('multiPrompt');

const inputs = [
{ type: 'text', id: 'branchName', placeholder: 'Nome da Branch' },
{ type: 'text', id: 'commitMessage', placeholder: 'Mensagem do Commit' }
];

try {
const promptResult = await multiPrompt('Criar Nova Branch', inputs);
const newBranchName = promptResult['newBranchName'];
$branchButton.textContent = `Branch: ${newBranchName}`;

const branchName = promptResult['branchName'];
const commitMessage = promptResult['commitMessage'];

console.log('Nova Branch:', branchName);
console.log('Mensagem do Commit:', commitMessage);
} catch (error) {
console.error('Erro ao exibir o multiPrompt:', error);
}
});

this.$sourceControlArea.append($branchButton);

this.$containerControl.append($header, this.$sourceControlArea);

sidebarApps.add('detect-icon', 'detect-sidebar-app', 'Detect', (app) => {
app.append(this.$containerControl);
});
}

async destroy() {
this.$containerControl.remove()
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