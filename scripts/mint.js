require("dotenv").config()
const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/6AggC5DqAidYCCq3LGxWhThDb7slFi8L"
const PRIVATE_KEY = "c1a6b32e00e2c3e57e6bd7c459de2dea0b0b063ee4956878e77178f16f96eb90"
const PUBLIC_KEY =  "0x4f8e182F499CE72321713daf3f59858A0AC80D8f"


console.log('API_URL',API_URL)
console.log('PUBLIC_KEY',PUBLIC_KEY)
console.log('PRIVATE_KEY',PRIVATE_KEY)

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/erc1155.sol/Marvel1155.json")
const contractAddress = "0x131Db19FE3fEF92eFbb9D0C6AD3ceD255418abAF"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mint("0x10666c3618a6B54e466e1d9B7a461652B45bdbB2",'0','1','0x00').encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}


mintNFT()

// const abiDecoder = require('abi-decoder') //引入包
// const ethers = require('ethers')
//
//
// const decodeInput = async  (input) => {
//     var result = {}
//     abiDecoder.addABI(contract.abi)
//     let decodedData = await abiDecoder.decodeMethod(input) //获得解析数据
//     if(!decodedData){
//         return
//     }
//     console.log('decodeData',decodedData)
//     console.log("name",decodedData.name)
//
//
//
//     // if(decodedData.name !== 'transfer' && decodedData.name !== 'transferFrom' ){
//     //     return
//     // }
//     // // console.log("decodedData",decodedData)
//     // if(decodedData.params.length === 2){
//     //     if(decodedData.params[0].name === '_to'){
//     //         let to = decodedData.params[0].value
//     //         // console.log(`to:${to}`)
//     //         result['to'] = to
//     //     }
//     //
//     //
//     //     if(decodedData.params[1].name === '_value'){
//     //         let value = decodedData.params[1].value
//     //         let amount = ethers.utils.formatEther(value)
//     //         // console.log("val",amount)
//     //         result['amount'] = amount
//     //     }
//     // }else if(decodedData.params.length === 3){
//     //     if(decodedData.params[0].name === '_from'){
//     //         let from = decodedData.params[0].value
//     //         // console.log(`from:${from}`)
//     //         result['from'] = from
//     //     }
//     //
//     //     if(decodedData.params[1].name === '_to'){
//     //         let to = decodedData.params[1].value
//     //         // console.log(`to:${to}`)
//     //         result['to'] = to
//     //     }
//     //
//     //     if(decodedData.params[2].name === '_value'){
//     //         let value = decodedData.params[2].value
//     //         let amount = ethers.utils.formatEther(value)
//     //         //console.log("val",amount)
//     //         result['amount'] = amount
//     //     }
//     // }
//     // return result
// }