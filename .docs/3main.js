import plugin from '../plugin.json';
import style from './style.scss';

const sidebarApps = acode.require('sidebarApps');

class SourceControl {
constructor(){
this.editor = editorManager.editor;
this.active()
}

active(){
 const activeFile = editorManager.activeFile;
const file = activeFile.filename; // Nome do arquivo atual




console.log('file: ', file);
 
 
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

// Create container for sidebar control
this.$containerControl = tag('div', { className: 'container sidebar-control' });

// Create header element 
const $header = tag('div', { className: 'header flex-container' });

// Title for the source control 
const $title = tag('span', { className: 'title', textContent: 'SOURCE CONTROL' });

// Input field for committing changes
const $inputCommit = tag('input', {className: 'commit-input',
placeholder: 'First Commit..'
});

// Button for committing changes 
const $buttonCommit = tag('button', { className: 'commit-button ', textContent: 'Commit'});
$buttonCommit.addEventListener('click', () => {
const inputText = $inputCommit .value;
console.log('Texto capturado:', inputText);
});


// Append title, input, and button to the header 
$header.append($title, $inputCommit, $buttonCommit );

// Create container for control area 
this.$sourceControlArea = tag('div', { className: 'container control-area' });


// Create menu for staged changes 
const $menuStagedChanges = tag('div', { className: 'menu-staged-changes' });

// Add elements to the menu for staged changes 
const $toggleMenuSC = tag('span', { className: 'menu-toggle', textContent: '>' });
const $StagedChanges = tag('span', { className: 'menu-text', textContent: 'STAGED CHANGES'});

const $contFileSC = tag('span', { className: 'menu-cont', textContent: '1' });

const $btnAllSC = tag('span', { className: 'menu-btn-all ', textContent: '...' });

$menuStagedChanges.append($toggleMenuSC, $StagedChanges, $contFileSC, $btnAllSC);



const $list = tag('ul', { className: 'list' });


// Create list element for staged changes  
const StagedFiles  = [
{ filename: 'file1.json' },
{ filename: 'file2.js' },
{ filename: 'index.html' },
{ filename: 'App.jsx' },
{ filename: '.env' },
{ filename: 'App.ts' },
];

const createListItem = (file, type) => {
const $listItem = tag('li', { className: type });
const iconClass = acode.require('helpers').getIconForFile(file.filename);
const $icon = tag('span', { className: `file-icon ${iconClass}` });
const $filename = tag('span', { textContent: file.filename });
const $addButton = tag('button', { className: 'action-button', textContent: '+' });

$addButton.addEventListener('click', () => {
window.toast('Click ️', 4000);
$list.removeChild($listItem);

const $stagedListItem = createListItem(file, 'staged');
$stagedList.append($stagedListItem);
});

const $action = tag('span', { textContent: 'M' });
$action.classList.add('action-M');

$icon.classList.add('list-item-content');
$filename.classList.add('list-item-content');
$addButton.classList.add('list-item-content', 'align-right');
$action.classList.add('list-item-content', 'align-right');

$listItem.append($icon, $filename, $addButton, $action);

return $listItem;
};

StagedFiles .forEach(file => {
const $listItem = createListItem(file, 'changed');
$list.append($listItem);
});

const $deletedItem = createListItem({ filename: 'deletedFile.js' }, 'deleted');
$deletedItem.classList.add('border-top');

const $addedItem = createListItem({ filename: 'addedFile.js' }, 'added');
$addedItem.classList.add('border-top');

$list.prepend($deletedItem, $addedItem);


// Insere o menu STAGED na Source Área 
this.$sourceControlArea.append($menuStagedChanges);

//Insere a lista STAGED na Source Área
this.$sourceControlArea.append($list);



//cria o menu CHANGES
const $menuChanges = tag('div', { className: 'menu-changes' });

// toggle do menu
const $toggleMenuC = tag('span', { className: 'menu-toggle', textContent: '>' });

const $Changes = tag('span', { className: 'menu-text', textContent: 'CHANGES'});

const $contFileC = tag('span', { className: 'menu-cont', textContent: '1' });


const $btnAll = tag('span', { className: 'menu-btn-all ', textContent: '...' });







$menuChanges.append($toggleMenuC, $Changes, $contFileC, $btnAll);


// Insere o menu CHANGES na Source Área
this.$sourceControlArea.append($menuChanges);

// Insere a lista CHANGES na Source Área this.$sourceControlArea.append($list);


// Criação do botão 'M' (Modificado)
const $modifyButton = tag('button', { className: 'action-button', textContent: 'M' });
$modifyButton.addEventListener('click', () => {
    window.toast('Modificado', 4000);
    // Adicione aqui o código para marcar o arquivo como modificado
});

// Criação do botão 'D' (Deletado)
const $deleteButton = tag('button', { className: 'action-button', textContent: 'D' });
$deleteButton.addEventListener('click', () => {
    window.toast('Deletado', 4000);
    // Adicione aqui o código para marcar o arquivo como deletado
});

// Criação do botão 'U' (Não Rastreado)
const $untrackedButton = tag('button', { className: 'action-button', textContent: 'U' });
$untrackedButton.addEventListener('click', () => {
    window.toast('Não Rastreado', 4000);
    // Adicione aqui o código para marcar o arquivo como não rastreado
});

// Criação do botão 'A' (Adicionado)
const $addButton = tag('button', { className: 'action-button', textContent: 'A' });
$addButton.addEventListener('click', () => {
    window.toast('Adicionado', 4000);
    // Adicione aqui o código para marcar o arquivo como adicionado
});


this.$containerControl.append(
 $addButton, $deleteButton,  $modifyButton,  $untrackedButton
 )

this.$containerControl.append($header, this.$sourceControlArea);
sidebarApps.add('detect-icon', 'detect-sidebar-app', 'Detect', (app) => {
app.append(this.$containerControl);
});
}

async destroy() {
this.$containerControl.remove();
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