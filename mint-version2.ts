import {
  Keypair,
  Connection,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

import {
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  mintTo,
  getOrCreateAssociatedTokenAccount,
  createAccount,
  createMint,
} from "@solana/spl-token";
import "dotenv/config";

import bs58 from "bs58";

const keypair = Keypair.fromSecretKey(
  bs58.decode(process.env.SECRET || "")
);

const connection = new Connection(process.env.RPC_ENDPOINT || "", "confirmed");

async function main() {
  try {
    const mintRent = await getMinimumBalanceForRentExemptMint(connection);

    const mint = await createMint(
      connection, // connection
      keypair, // payer
      keypair.publicKey, // mint authority
      null, // freeze authority
      6 // decimals
    );

    const destination = Keypair.generate();

    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      destination.publicKey
    );

    console.log(`This is your ATA: ${ata.address}!`)

    let tx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      1e6,
    );

    console.log(`Succesfully Minted!. Transaction Here: https://explorer.solana.com/tx/${tx}?cluster=devnet`)
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
}

main();