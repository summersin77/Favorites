# Favorites

个人网站导航收藏库。

主页地址：https://summersin77.github.io/Favorites/

## 使用

把本目录所有文件推送到 GitHub Pages 仓库即可。
链接数据在 `data.json` 里修改。

`data.json` 是一个**数组**，每个元素是一个分类：

```json
[
  {
    "category": "分类名",
    "links": [
      { "title": "网站名", "url": "https://...", "tags": "标签描述" }
    ]
  }
]
```

- `category`：分类标题，可带 emoji。
- `links`：该分类下的链接数组，可空。
- `title`、`url`：必填。
- `tags`：可选，内容会一起参与搜索。
- 分类之间用英文逗号分隔，最后一个分类后面不要加逗号。
