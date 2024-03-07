import plugin from '../plugin.json';
import style from './style.scss';



const sidebarApps = acode.require('sidebarApps');

const { editor } = editorManager;

class SourceControl  {

  async init() {
    try {
      acode.addIcon('detect-icon', this.baseUrl + 'assets/icon.png');

      this.setupGlobalStyle();
      this.setupSourceControlContainer();
      this.setupEventListeners();

    } catch (error) {}
  }

  /**
   * Global Style
   */
  setupGlobalStyle() {
    this.$style = tag('style', { textContent: style, id: 'function-locator' });
    document.head.append(this.$style);
  }

  /**
   * Setup sidebar function locator
   */
  setupFunctionLocatorContainer() {
   
    this.$funcLocatorContainer = tag('div', { className: 'container sidebar-func-locator' });

    const $header = <div className='header'>
      <span className='title'>Function Locator</span>
    </div>
    
    

    this.$locatorArea = tag('div', { className: 'container locator-area' });

    this.$funcLocatorContainer.append($header, this.$locatorArea);

    sidebarApps.add('detect-icon', 'detect-sidebar-app', 'Detect', (app) => {
      app.append(this.$funcLocatorContainer);
    });
  }


  async destroy() {
    this.$funcLocatorContainer.remove();
  }
}

if (window.acode) {
  const acodePlugin = new FunctionLocator();
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