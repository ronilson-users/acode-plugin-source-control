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

const $input = tag('input', {
placeholder: 'Initial Commit'
});

$input.classList.add('input-commit');

$header.append($title, $input);

const $menuChanged = tag('div', { className: 'changed-area' });

const $toggle = tag('span', { className: 'toggle', textContent: 'Changed' });

const $changedCont = tag('span', { className: 'cont-title', textContent: '(1)' });

$menuChanged.append($toggle, $changedCont);

this.$sourceControlArea = tag('div', { className: 'container control-area hidden' });

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


const $stagedChanged = tag('span', { className: 'staged-title', textContent: 'Staged Changed' });
const $stagedCont = tag('span', { className: 'cont-title', textContent: '(1)' });




const $stagedList = tag('ul', { className: 'list' });

const stagedFiles = [
{ filename: 'stagedFile1.js' },
{ filename: 'stagedFile2.js' }
];

stagedFiles.forEach(file => {
const $listItem = createListItem(file, 'staged');
$stagedList.append($listItem);
});

const $commitButton = tag('button', {  className: 'commit-button', textContent: 'Commit ' });
const $iconCommit = tag('span', { className: 'commit-icon' });
$commitButton.prepend($iconCommit);
$iconCommit.style.backgroundImage = 'url(' + this.baseUrl + 'assets/icon.png)';
$commitButton.addEventListener('click', () => {
const inputText = $input.value;
console.log('Texto do Input:', inputText);
});

this.$sourceControlArea.append($list);


this.$sourceControlArea.append($stagedChanged, $stagedCont, $stagedList);

this.$sourceControlArea.append($commitButton);

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




$toggle.addEventListener('click', () => {
const changedList = document.querySelector('.container.control-area .list');
changedList.classList.toggle('hidden');
$toggle.textContent = changedList.classList.contains('hidden') ? ' ▼': '►';
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


