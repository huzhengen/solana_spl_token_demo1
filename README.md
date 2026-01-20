# Solana SPL Token Demo 1

Mac 查看私钥

```js
node -e "const fs = require('fs'); const key = JSON.parse(fs.readFileSync(require('os').homedir() + '/.config/solana/id.json')); const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'; let n = BigInt('0x' + Buffer.from(key).toString('hex')); let res = ''; while (n > 0n) { let r = n % 58n; res = alphabet[Number(r)] + res; n = n / 58n; } console.log(res);"
```

结果

```
Mint Address: 2Vf4neUytVGASHmSAxMKDRtpceSTuZzFD49ebL4u64FF
ATA Address: Ep97WCD93CyxVPpNqgAToAKe1x8MDssSeNCy6KMk8VhV
Transaction Signature: 5U5A6gP27RdSYwR94GmDJRibxYua5wUswug9zeEjdkuUBTsHF3FWpboWjK7vUgS9M1Q4DDMVNBThAwaNE7jvVgez
```