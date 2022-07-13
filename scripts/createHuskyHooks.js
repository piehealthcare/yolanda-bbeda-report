/**
 * 添加git hooks
 * 请确保已安装 husky, commitlint和linst-staged
 */
const { execSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');

// SECTION 添加 pre-commit
if (fs.existsSync('.husky/pre-commit')) {
  console.log(chalk.yellow('.husky/pre-commit 已存在'));
} else {
  execSync('npx husky add .husky/pre-commit ""');

  const preCommitBashes = [
    'echo "如果git commit不成功，请检查是否是以下问题："',
    'echo "1、提交格式不规范"',
    'echo "2、eslint没通过"',
    'echo "3、单元测试没通过"',
    '\n',
    '# 使用lint-staged校验',
    'echo "执行lint-staged"',
    'npx --no-install lint-staged',
  ].join('\n');

  fs.appendFileSync('.husky/pre-commit', preCommitBashes);
}

// !SECTION

// SECTION 添加commit-msg
// 注意不能将commilint放在pre-commit钩子里，这样会拿不到当前的提交信息
if (fs.existsSync('.husky/commit-msg')) {
  console.log(chalk.yellow('.husky/commit-msg 已存在'));
} else {
  execSync('npx husky add .husky/commit-msg ""');

  const commitMsgBashes = [
    '# 使用commitlint校验提交格式',
    'echo "执行commitlint"',
    'npx --no-install commitlint --edit "$1"',
  ].join('\n');

  fs.appendFileSync('.husky/commit-msg', commitMsgBashes);
}
// !SECTION

console.log(chalk.green('已添加 git hooks'));
