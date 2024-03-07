async active() {
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

    try {
        const allFiles = await fs(directoryPath).lsDir();
        console.log('Arquivos e diretórios encontrados:');
        allFiles.forEach(entry => {
            console.log(entry.name);
        });
        return allFiles; // Retornar a lista de arquivos
    } catch (error) {
        console.error('Erro ao listar arquivos e diretórios:', error);
        return []; // Retornar uma lista vazia em caso de erro
    }
}

$initilizeRepo.addEventListener('click', async () => {
    window.toast('INITIALIZE', 4000);
   
    // Adicione aqui o código para ocultar a área
    // Por exemplo:
    // $containerControl.style.display = 'none';
   
    // Chame a função active para obter a lista de arquivos no diretório do plugin
    const allFiles = await active();

    // Verificar se o diretório .git existe
    const gitDirectoryExists = allFiles.some(item => item.name === '.git');

    if (gitDirectoryExists) {
        window.toast('.git directory already exists', 4000);
    } else {
        window.toast('.git directory does not exist', 4000);
    }
});