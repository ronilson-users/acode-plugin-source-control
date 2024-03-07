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
 
 
const $header = tag('div', { className: 'header' });

// title top
const $title = tag('span', { textContent: 'SOURCE CONTROL', className: 'title' });

//input-commit
const $input = tag('input', { className: 'input-commit', type: 'text', placeholder: 'Initial Commit' });

// Inicialização do Repository
const $initRepo = tag('button', { textContent: 'Initialize Repository ', className: 'commit-button' });

// button first Commit
const $buttonCommit = tag('button', { textContent: 'Commit ', className: 'commit-button' });

// event capturar input commit 
$buttonCommit.addEventListener('click', () => {
const inputValue = $input.value;


console.log('Conteúdo capturado:', inputValue);
});


// fim header 
$header.append($title, $input, $buttonCommit, $initRepo);

// Área de controle de arquivos 
const $sourceControlArea = tag('span', { className: 'control-area' });





//cria o menu CHANGES
const $menuChanges = tag('div', { className: 'menu-control' });

// Item do menu 
const $toggleMenuC = tag('span', { className : 'menu-toggle', textContent: '>' });

const $Changes = tag('span', { className : 'menu-text', textContent: 'CHANGES'});

const $contFileC = tag('span', { className : 'menu-cont', textContent: '(1)' });






$menuChanges.append($toggleMenuC, $Changes, $contFileC);


// cria menu STAGED CHANGES 
const $menuStaged = tag('span', { className: 'menu-control' });

const $toggleMenuSC = tag('span', { className: 'menu-toggle', textContent: '>' });
const $StagedChanges = tag('span', { className: 'menu-text', textContent: 'STAGED CHANGES'});

const $btnAll= tag('span', { className: 'menu-btn-all', textContent: '...' });


const $contFileSC = tag('span', { className: 'menu-cont', textContent: '(1)' });




$menuStaged.append($toggleMenuSC, $StagedChanges,$btnAll, $contFileSC);

const $list = tag('ul', { className: 'list' });

const changedFiles = [
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

changedFiles.forEach(file => {
const $listItem = createListItem(file, 'changed');
$list.append($listItem);
});

const $deletedItem = createListItem({ filename: 'deletedFile.js' }, 'deleted');
$deletedItem.classList.add('border-top');

const $addedItem = createListItem({ filename: 'addedFile.js' }, 'added');
$addedItem.classList.add('border-top');

$list.prepend($deletedItem, $addedItem);








$sourceControlArea.append($list) ;

$sourceControlArea.append($menuStaged, $menuChanges) ;

this.$containerControl = tag('div', { className: 'container sidebar-control' });
this.$containerControl.append($header, $sourceControlArea);

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