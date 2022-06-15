const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const menuData = [];
function createHtmlFile(dir) {
  fs.readdirSync(dir).map(ele => {
    const curPath = path.join(dir, ele);
    const targetPath = curPath.replace('docs', 'views');
    let stat = fs.statSync(curPath, { encoding: 'utf-8' });
    console.log('ele', ele)
    if (stat.isFile()) {
      const data = fs.readFileSync(curPath, { encoding: 'utf-8' })
      const htmlData = marked(data);
      const htmlPath = targetPath.replace('.md', '.html');
      const { name } = path.parse(targetPath)
      menuData.push({ label: name, url: '/' + path.parse(dir).name + '/' + name })
      // fs.writeFileSync(htmlPath, htmlData, { encoding: 'utf-8' })
    }
    if (stat.isDirectory()) {
      console.log('curPath', targetPath)
      menuData.push({ label: ele })
      // fs.mkdirSync(targetPath);
      createHtmlFile(curPath)
    }
  })
}
createHtmlFile(path.join(__dirname + '/docs'))
console.log('menuData', menuData)
fs.writeFileSync(path.join(__dirname, '/data/menuData.json'), JSON.stringify({ menuData }), { encoding: 'utf-8' })