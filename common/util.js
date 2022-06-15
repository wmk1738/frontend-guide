const fs = require('fs');
const path = require('path');

function getMenuListData() {
  const listData = fs.readFileSync(path.join(__dirname, '../data/menuData.json'), { encoding: 'utf-8' })
  const menuList = JSON.parse(listData).menuData;
  return menuList;
}

module.exports = {
  getMenuListData
}
// <% url?:<span><%= label %></span> %>