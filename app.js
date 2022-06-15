const Koa = require('koa');
const path = require('path');
const render = require('koa-ejs');
const static = require('koa-static');
const fs = require('fs');
const { getMenuListData } = require('./common/util');
const app = new Koa();

app.use(static(__dirname + '/public'));

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

const menuData = getMenuListData();

app.use(async (ctx, next) => {
  await ctx.render(ctx.request.url, {
    name: ctx.request.url,
    linkList: menuData
  });
  next();
});

//处理404信息
app.use((ctx, next) => {
  const { url } = ctx.request;
  const isExist = menuData.find(ele => ele.url === url);
  if (isExist) {
    next();
  } else {
    ctx.set('Content-Type', 'text/html');
    ctx.body = fs.readFileSync(path.join(__dirname, './error/404.html'))
  }
})

app.on('error', (err) => {
  console.log(err.stack);
});
app.listen(3333);