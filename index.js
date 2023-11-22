const ethers = require('ethers');
const address = ''
const privateKey = ''

//这里修改tick和gas price 还有数量
const amt = '1000'
const tick = 'ierc-m4'
const gas = '60'


const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth');
const wallet = new ethers.Wallet(privateKey);
const walletWithProvider = wallet.connect(provider);
async function main() {
    let nonce = await provider.getTransactionCount(address);

    let result = await run(nonce, address)
    while (result == false) {
        result = await run(nonce, address)
    }
    console.log(`执行完毕`)

}

function generateRandomDigits(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); 
    }
    return result;
}

async function run(nonce,address) {
    let time = Math.round(new Date().getTime() / 1000) + generateRandomDigits(5)
    const dataString = `data:application/json,{"p":"ierc-20","op":"mint","tick":"${tick}","amt":"${amt}","nonce":"${time}"}`;
    const dataHex = Buffer.from(dataString, "utf8").toString("hex");
    const tx = {
        from: address,
        gasLimit: 28000,
        chainId: 1,
        type: 2,
        maxPriorityFeePerGas: ethers.utils.parseUnits(gas, 'gwei'), 
        maxFeePerGas: ethers.utils.parseUnits(gas, 'gwei'), 
        to: `0x0000000000000000000000000000000000000000`,
        data: "0x" + dataHex,
        nonce: nonce,
    };

    const signedTx = await walletWithProvider.signTransaction(tx);
    const parsedTx = ethers.utils.parseTransaction(signedTx);
    console.log(parsedTx.hash)
    if (parsedTx.hash.substring(0, 6) == '0x0000') {
        console.log('\x1b[32m', nonce+"---->https://etherscan.io/tx/"+parsedTx.hash, '\x1b[0m');
        try {
            const txResponse = await walletWithProvider.sendTransaction(tx);
            console.log('\x1b[32m', txResponse.hash, '\x1b[0m');
        } catch (error) {
        }

        return true
    } else {
        return false
    }


}
main()