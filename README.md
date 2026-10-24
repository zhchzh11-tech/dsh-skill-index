# DSH Skill Index

一个可直接被 DSH 的 Skills Manager 添加为「技能仓库」的公开技能集合。

- **技能数量**：25 个（全部为本地已有、可直接安装的技能）
- **附带清单**：`index.json` 汇总每个技能的 `name` / `description`，并每天从 [skills.sh](https://skills.sh) 抓取安装量最高的 200 个技能作为 `recommended` 清单（只做索引，不复制上游文件）。

## 在 DSH 中使用

1. 打开 DSH 的 **Skills Manager** 面板
2. 进入「技能仓库」→「添加仓库」
3. 填入本仓库地址：

   ```
   https://github.com/zhchzh11-tech/dsh-skill-index
   ```

4. 扫描后即可浏览、搜索、逐个安装；安装位置可选用户目录（`~/.dsh/skills`）或指定工作区（`<项目>/.dsh/skills`）

## 技能清单

| 技能 | 说明 |
| --- | --- |
| article-writing | 长文写作：博客、教程、newsletter，强调语气一致 |
| ask-matt | 按当前处境推荐该用哪个技能的路由器 |
| book-to-skill | 把书籍/文档转成结构化 Agent 技能 |
| codebase-onboarding | 为陌生代码库生成上手指南（架构图、入口、约定） |
| diagnosing-bugs | 疑难 bug 与性能回归的诊断循环 |
| find-skills | 发现并从技能生态安装技能 |
| frontend-slides | 生成动画丰富的 HTML 演示，或把 PPT 转网页 |
| grill-me | 拷问式打磨方案/设计 |
| grill-with-docs | 拷问式打磨，同时产出 ADR 与术语表 |
| implement | 按 spec 或工单实现功能 |
| improve-codebase-architecture | 扫描代码库的架构深化机会并输出报告 |
| jailbreakscope-mechanism | LLM 越狱机制（表示+电路）知识库 |
| literature-review | 系统性文献综述工作流 |
| outsource-manager | 把任务外包给本机豆包/千问并验收 |
| ponytail | 最懒但真能跑的最小实现（反过度设计） |
| scholar-evaluation | 学术工作（论文/提案/方法）结构化评估 |
| security-review | 安全审查清单与模式 |
| setup-matt-pocock-skills | 配置 engineering skills 的 issue tracker 等 |
| tdd-workflow | TDD 工作流，要求 80%+ 覆盖率 |
| to-spec | 把当前对话整理成 spec 并发布 |
| to-tickets | 把方案拆成带依赖关系的 tracer-bullet 工单 |
| triage | issue / 外部 PR 的分诊状态机 |
| verification-loop | 会话完成前的综合验证系统 |
| wait-what | 上一条消息没讲清楚，重新解释 |
| wizard | 生成交互式 bash 向导，走只有人能做的步骤 |

完整描述见 [`index.json`](./index.json)。

## 目录结构

```
skills/<name>/SKILL.md   # 每个技能一个目录，含 frontmatter（name / description）
scripts/build-index.mjs  # 重建 index.json
index.json               # 技能清单 + 每日更新的 skills.sh 推荐榜
```

## 自动更新

`.github/workflows/refresh-skill-index.yml` 每天 03:00（Asia/Shanghai）运行一次：

- 重新扫描 `skills/*/SKILL.md`，刷新本地技能清单
- 拉取 skills.sh 各分类的高安装量技能，写入 `index.json` 的 `recommended`
- 无变化则不提交

## 许可

各技能版权归原作者所有；本仓库仅做汇总托管。
