import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo
} from "@solana/spl-token";
import "dotenv/config";
import bs58 from "bs58";

// 建议增加空值检查
const secretKeyString = process.env.SECRET;
if (!secretKeyString) throw new Error("SECRET not found in .env");

const keypair = Keypair.fromSecretKey(bs58.decode(secretKeyString));
const connection = new Connection(process.env.RPC_ENDPOINT || clusterApiUrl("devnet"), "confirmed");

async function main() {
  try {
    console.log(`正在使用地址: ${keypair.publicKey.toBase58()} 创建代币...`);

    // 1. 创建代币的 Mint (代币定义)
    const mint = await createMint(
      connection,
      keypair,           // 付费者
      keypair.publicKey, // 铸币权限
      keypair.publicKey, // 冻结权限 (建议先保留，除非确定要丢弃)
      6                  // 小数位
    );
    console.log(`代币创建成功! Mint 地址: ${mint.toBase58()}`);

    // 2. 为目标地址创建/获取关联代币账户 (ATA)
    // 即使 destination 是新生成的，ATA 也需要通过 payer 支付租金创建
    const destination = Keypair.generate();
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,               // 付费者
      mint,                  // 代币 Mint 地址
      destination.publicKey  // 接收者的钱包地址
    );
    console.log(`ATA 账户地址: ${ata.address.toBase58()}`);

    // 3. 铸造代币
    // 注意：1e6 在 6 位小数下代表 1 个代币
    const amount = 21000000 * Math.pow(10, 6); // 铸造 21000000 个

    const tx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey, // 必须拥有 mint authority 的签名
      amount
    );

    console.log(`铸造成功! 交易哈希: ${tx}`);
    console.log(`检查地址: https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet`);

  } catch (error) {
    console.error(`发生错误:`, error);
  }
}

main();