// Criação do botão 'M' (Modificado)
const $modifyButton = tag('button', {
 className: 'action-button', textContent: 'M'
});
$modifyButton.addEventListener('click', () => {
 window.toast('Modificado', 4000);
 // Adicione aqui o código para marcar o arquivo como modificado
});

// Criação do botão 'D' (Deletado)
const $deleteButton = tag('button', {
 className: 'action-button', textContent: 'D'
});
$deleteButton.addEventListener('click', () => {
 window.toast('Deletado', 4000);
 // Adicione aqui o código para marcar o arquivo como deletado
});

// Criação do botão 'U' (Não Rastreado)
const $untrackedButton = tag('button', {
 className: 'action-button', textContent: 'U'
});
$untrackedButton.addEventListener('click', () => {
 window.toast('Não Rastreado', 4000);
 // Adicione aqui o código para marcar o arquivo como não rastreado
});

// Criação do botão 'A' (Adicionado)
const $addButton = tag('button', {
 className: 'action-button', textContent: 'A'
});
$addButton.addEventListener('click', () => {
 window.toast('Adicionado', 4000);
 // Adicione aqui o código para marcar o arquivo como adicionado
});


this.$containerControl.append(
 $addButton, $deleteButton, $modifyButton, $untrackedButton
);


active() {
 const activeFile = editorManager.activeFile;
 const file = activeFile.uri;
 console.log('file: ', file);

 // Obter o diretório do arquivo ativo
 let directoryPath = file.substring(0, file.lastIndexOf('/'));
 console.log('directoryPath: ', directoryPath);

 // Remover a parte "src" do caminho do diretório
 directoryPath = directoryPath.replace(/\/src$/, '');
 console.log('directoryPath sem "src": ', directoryPath);

 const fs = acode.require('fs');

 (async () => {
  try {
   const allFiles = await fs(directoryPath).lsDir();
   console.log('Arquivos e diretórios encontrados:');
   allFiles.forEach(entry => {
    console.log(entry.name);
   });
  } catch (error) {
   console.error('Erro ao listar arquivos e diretórios:', error);
  }
 })();
}

convertPath(path) {
    if (path.startsWith("content://com.termux.documents/tree")) {
        let termuxPath = path
            .split("::")[1]  // Divide o caminho em duas partes: prefixo e caminho real
            .substring(0, path.split("::")[1].lastIndexOf("/"))  // Extrai o caminho real
            .replace(/^\/data\/data\/com\.termux\/files\/home/, "$HOME");  // Substitui o prefixo do diretório inicial do Termux pelo diretório inicial padrão do Termux
        return termuxPath;
    }
    // Retorna o próprio caminho se não começar com "content://com.termux.documents/tree"
    return path;
}


// Adicionar botões ao menu
const buttons = ['A', 'D', 'M', 'U'];
buttons.forEach(buttonText => {
const $button = document.createElement('button');
$button.className = 'action-button';
$button.textContent = buttonText;
$button.addEventListener('click', () => {
window.toast(buttonText, 4000);
// Adicione aqui o código para a ação do botão
});