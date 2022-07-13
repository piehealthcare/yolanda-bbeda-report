/**
 * 通过git tags生成 CHANGELOG
 * @author huyongkang<huyongkang@yolanda.hk>
 */
const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');
const dayjs = require('dayjs');

console.log(chalk.yellow('请添加对应version的 GIT TAG 来生成CHANGELOG.md\n'));

function gen() {
  const tags = execSync('git tag -l').toString().split('\n').filter((v) => !!v).reverse();
  let changelog = `updated at ${dayjs().format('YYYY-MM-DD')}\n\n`;

  tags.forEach((tag) => {
    changelog += `## ${tag}`;
    const tagContent = execSync(`git cat-file -p ${tag}`).toString();
    console.log(tagContent);
    // 提取时间
    const tagDateResult = tagContent.match(/\ntagger\s.+\s\b([0-9]+)\b/);
    if (tagDateResult) {
      const tagDate = Number(tagDateResult[1]) * 1000;
      changelog += ` (${dayjs(tagDate).format('YYYY-MM-DD')})`;
    }
    // 简单地提取tag内容
    const tagCommitResult = /\n\n(.+)\n/.exec(tagContent);
    if (tagCommitResult) {
      changelog += '\n';
      const tagCommit = tagCommitResult[1];
      // 通过中英文分号来分割变更项
      changelog += tagCommit.split(/;|；/g).map((item) => `+ ${item}`).join('\n');
      changelog += '\n';
    }
  });

  fs.writeFileSync('CHANGELOG.md', changelog);
}

gen();
