import plugin from '../plugin.json';
import style from './style.scss';
import { logger } from './logger.js'

const sidebarApps = acode.require('sidebarApps');

class SourceControl {

 constructor() {
  this.editor = editorManager.editor;
  this.active();

 }

 async active() {
  const activeFile = editorManager.activeFile;
  const file = activeFile.uri;
  console.log('Active file: ', file);

  const fileList = acode.require('fileList');
  const list = await fileList();

  list.forEach(item => {
   console.log('File name:', item.name, 'File path:', item.path);
   // Verifique aqui se o diretório .git existe
   // Tome a decisão adequada com base nessa verificação
   if (item.name === '.git') {
    // Executar alguma ação se o diretório .git existir
    console.log('.git directory exists');
   }
  });
 }

 async init() {
  
  log("Este é um exemplo de mensagem de log.");
  try {
   acode.addIcon('detect-icon', this.baseUrl + 'assets/icon.png');
   this.globalStyles();

   this.sidebarContainerControl();
  } catch (error) {
   console.error('Erro ao inicializar o plugin de controle de origem:', error);
  }
 }

 globalStyles() {
  this.$style = tag('style', {
   textContent: style, id: 'source-control'
  });
  document.head.append(this.$style);
 }

 sidebarContainerControl() {
  // Create container for sidebar control
  this.$containerControl = tag('div', {
   className: 'container sidebar-control'
  });

  // Create header element
  const $header = tag('div', {
   className: 'header-sc'
  });

  // Criar o elemento do ícone de detecção com a classe detect-icon
  const $detectIcon = tag('div', {
   className: 'detect-icon detect-sidebar-app '
  });

  // Criar o elemento de notificações dentro do ícone de detecção
  const $notifications = tag('div', {
   className: 'notifications',
   textContent: '1' // Altere isso conforme necessário
   
   /* 
   criar lógica pra identificar alterações no control-area 
  */    
  
  });

  // Adicionar o elemento de notificações ao ícone de detecção
  $detectIcon.appendChild($notifications);

  // Obter as coordenadas do ícone de detecção
  const detectIconRect = $detectIcon.getBoundingClientRect();

  // Posicionar o ícone de notificações dentro do ícone de detecção
  $notifications.style.left =  detectIconRect.left + 8 + 'px';

  $notifications.style.top = (detectIconRect.top + detectIconRect.height + 13) + 'px'; // Posicione o ícone de notificações 12,50 pixels abaixo do ícone de detecção

  // Adicionar o ícone de detecção ao documento ou a outro elemento pai
  document.body.appendChild($detectIcon); 
  
  // Title for the source control
  const $title = tag('span', {
   className: 'title', textContent: 'SOURCE CONTROL'
  });

  const fileList = acode.require('fileList');

  const $initilizeRepo = tag('button', {
   className: 'button-init-repo', textContent: 'INITIALIZE REPOSITORY'
  });



  // Input field for committing changes
  const $inputCommit = tag('input', {
   className: 'commit-input',
   placeholder: 'First Commit..'
  });

  // Button for committing changes
  const $buttonCommit = tag('button', {
   className: 'commit-button ', textContent: 'Commit'
  });
  $buttonCommit.addEventListener('click', () => {
   const inputText = $inputCommit.value;
   log('Texto capturado:', inputText);
  });


  // Append title, input, and button to the header
  $header.append($title, $inputCommit, $buttonCommit, $initilizeRepo, $detectIcon);

  // Create container for control area
  this.$sourceControlArea = tag('div', {
   className: 'container control-area'
  });

// Crie os elementos
const $box = document.createElement('div');
$box.classList.add('box');

const $row = document.createElement('div');
$row.classList.add('row');

// Criar o elemento do ícone SVG
const $iconSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
$iconSVG.setAttribute("width", "25");
$iconSVG.setAttribute("height", "25");
$iconSVG.setAttribute("viewBox", "0 0 12 24 ");
$iconSVG.setAttribute("fill", "#08df17c0");
$iconSVG.innerHTML = `
  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#323232" stroke-width="2"/>
  <path d="M8 12L16 12" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11 9L8.08704 11.913V11.913C8.03897 11.961 8.03897 12.039 8.08704 12.087V12.087L11 15" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`;

const $iconFile = document.createElement('div');
$iconFile.classList.add('icon-file');
$iconFile.textContent = '>';
// Adicione o elemento do ícone SVG como filho de $iconFile

const $titleFilename = document.createElement('span');
$titleFilename.classList.add('title-filename', 'title');
$titleFilename.textContent = 'Título';

const $pathFilename = document.createElement('span');
$pathFilename.classList.add('row', 'path-filename', 'sub-title');
$pathFilename.textContent = 'path/file.js';

const $btnAdd = document.createElement('div');
$btnAdd.classList.add('btn-Add'); // Alteração aqui

$btnAdd.appendChild($iconSVG); 

const $btnView = document.createElement('div');
$btnView.classList.add('btn-view');
$btnView.textContent = 'View';

// Adicione os elementos como filhos uns dos outros
$row.appendChild($iconFile);
$row.appendChild($titleFilename);
$titleFilename.appendChild($pathFilename);
$row.appendChild($btnAdd);
$row.appendChild($btnView);

$box.appendChild($row);

// Criar a nova div dentro da .box
const $newDiv = document.createElement('div');

$newDiv.classList.add('box');

$row.classList.add('row');
// listar files aqui 

const $list = tag('ul', {
className: 'list'
});

// Create list element for staged changes
const StagedFiles = [{
filename: 'file1.json',
directory:'path/file.js '
}
];
const createListItem = (file, type) => {
const $listItem = tag('li', {
className: type
});


const iconClass = acode.require('helpers').getIconForFile(file.filename);


const $icon = tag('span', {
className: `file-icon ${iconClass}`
});
const $filename = tag('span', {
textContent: file.filename
});


const $addButton = tag('button', {
className: 'action-button', textContent: '+'
});

$addButton.addEventListener('click', () => {
window.toast('Click ️', 4000);
$list.removeChild($listItem);

const $stagedListItem = createListItem(file, 'staged');
$stagedList.append($stagedListItem);
});

const $action = tag('span', {
textContent: 'M'
});
$action.classList.add('action-M');
$icon.classList.add('list-item-content');
$filename.classList.add('list-item-content');
$addButton.classList.add('list-item-content', 'align-right');
$action.classList.add('list-item-content', 'align-right');
$listItem.append($icon, $filename, $addButton, $action);

return $listItem;
};


// Criar a lista de arquivos
StagedFiles.forEach(file => {
  const $listItem = createListItem(file, 'file-item');
  $list.appendChild($listItem);
});

// Adicionar a lista à nova div
$newDiv.appendChild($list);





$box.appendChild($newDiv);

// Adicione a box à área de controle de origem
this.$sourceControlArea.appendChild($box);





  // cria o menu CHANGES
  const $menuChanges = tag('div', {
   className: 'menu-control'
  });
  const $toggleMenuC = tag('span', {
   className: 'menu-toggle', textContent: '>'
  });
  $toggleMenuC.addEventListener('click', () => {
   $toggleMenuC.classList.toggle('active');
  });
  const $Changes = tag('span', {
   className: 'menu-text', textContent: 'CHANGES'
  });
  const $contFileC = tag('span', {
   className: 'menu-cont', textContent: '1'
  });
  const $btnAll = tag('button', {
   className: 'menu-btn-all', textContent: 'All'
  });
  $menuChanges.append($toggleMenuC, $Changes, $contFileC, $btnAll);

  // Insere o menu CHANGES na Source Área
  this.$sourceControlArea.append($menuChanges);
  // Fim menuChanges 
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
 acode.setPluginInit(plugin.id, async (baseUrl, $page, {
  cacheFileUrl, cacheFile
 }) => {
  if (!baseUrl.endsWith('/')) {
   baseUrl += '/';
  }
  acodePlugin.baseUrl = baseUrl;
  await acodePlugin.init($page, cacheFile, cacheFileUrl);
 });
 acode.setPluginUnmount(plugin.id,
  () => {
   acodePlugin.destroy();
  });
}