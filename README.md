# ERC20 代币铸造步骤

以下是在 Node.js 环境下部署和铸造 ERC20 代币的步骤：

1. **安装 Node.js 环境**
   访问 [Node.js 官网](https://nodejs.org/en) 并下载安装适合你操作系统的 Node.js 版本。

2. **克隆仓库**
   打开命令行工具并执行以下命令以克隆仓库：
   git clone https://github.com/zfy666ci/ierc20_mint.git
3. **安装依赖**
   进入克隆的仓库目录，然后运行以下命令安装必要的依赖：
   cd ierc20_mint
   npm install
4. **配置并运行脚本**
   打开 `index.js` 文件，并设置你的 `address`、`private`、`gas`、代币的 `名称` 和 `数量`。
   完成配置后，在命令行中运行以下命令来执行脚本：
