const $ = (s) => document.querySelector(s);
const content = $('#content');
const search = $('#search');
const count = $('#count');
let groups = [];

const textOf = (link, category) =>
  `${category} ${link.title} ${link.url} ${link.tags || ''}`.toLowerCase();

function makeItem(link, category) {
  const item = document.createElement('div');
  item.className = 'item';
  item.dataset.search = textOf(link, category);

  const a = document.createElement('a');
  a.href = link.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = link.title;
  if (link.tags) a.title = link.tags;

  const copy = document.createElement('button');
  copy.className = 'copy';
  copy.textContent = '复制';
  copy.onclick = async () => {
    await navigator.clipboard.writeText(link.url);
    copy.textContent = '已复制';
    setTimeout(() => (copy.textContent = '复制'), 1200);
  };

  item.append(a, copy);
  return item;
}

function render() {
  content.innerHTML = '';

  groups.forEach((group) => {
    const box = document.createElement('details');
    const title = document.createElement('summary');
    title.innerHTML = `<span>${group.category}</span><span>${group.links.length}</span>`;
    box.append(title, ...group.links.map((link) => makeItem(link, group.category)));
    content.append(box);
  });

  filter();
}

function filter() {
  const words = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let total = 0;

  content.querySelectorAll('details').forEach((box) => {
    let matched = 0;
    box.querySelectorAll('.item').forEach((item) => {
      const ok = words.every((word) => item.dataset.search.includes(word));
      item.hidden = !ok;
      if (ok) matched++;
    });
    box.hidden = matched === 0;
    total += matched;
  });

  count.hidden = words.length === 0;
  count.textContent = total ? `找到 ${total} 个链接` : '未找到匹配结果';
}

async function init() {
  try {
    const res = await fetch('data.json');
    groups = await res.json();
    render();
  } catch {
    content.innerHTML = '<p>data.json 加载失败，请确认文件存在并通过网页服务器打开。</p>';
  }

  $('#time').textContent = `最后更新：${new Date(document.lastModified).toLocaleString('zh-CN')}`;
  search.addEventListener('input', filter);
  $('#openAll').onclick = () => content.querySelectorAll('details').forEach((d) => (d.open = true));
  $('#closeAll').onclick = () => content.querySelectorAll('details').forEach((d) => (d.open = false));
}

document.addEventListener('DOMContentLoaded', init);
