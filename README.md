# SBTI 人格测试

27 种人格 · 15 个维度 · 找到真实的你

基于 [SBTI 测试](https://space.bilibili.com/417038183) 和 [SBTI Wiki](https://github.com/qsMFqMz9/sbti-wiki) 的重构学习版本，仅供娱乐目的。

## 技术栈

- Vue 3 + TypeScript
- Vite
- Tailwind CSS 3.4
- Vue Router 4

## 功能

- 30+2 道题目的完整人格测试（含隐藏饮酒态度题）
- 15 维度 Manhattan 距离匹配算法
- 27 种人格类型详解百科
- 明暗主题切换
- 移动端触摸滑动答题
- 微信分享支持

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 部署

构建产物在 `dist/` 目录。支持子路径部署（默认 `/sbti/`），可在 `vite.config.ts` 中修改 `base` 配置。

Nginx 配置示例：

```nginx
location /sbti {
    alias /path/to/dist;
    index index.html;
    try_files $uri $uri/ /sbti/index.html;
}
```

## 致谢

- 原作者：[B站@蛆肉儿串儿](https://space.bilibili.com/417038183)
- SBTI Wiki：[sbti-wiki](https://github.com/qsMFqMz9/sbti-wiki)
