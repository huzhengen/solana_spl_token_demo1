# Solana SPL Token Demo 1

Mac 查看私钥

```js
node -e "const fs = require('fs'); const key = JSON.parse(fs.readFileSync(require('os').homedir() + '/.config/solana/id.json')); const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'; let n = BigInt('0x' + Buffer.from(key).toString('hex')); let res = ''; while (n > 0n) { let r = n % 58n; res = alphabet[Number(r)] + res; n = n / 58n; } console.log(res);"
```

第一版结果

```
Mint Address: 2Vf4neUytVGASHmSAxMKDRtpceSTuZzFD49ebL4u64FF
ATA Address: Ep97WCD93CyxVPpNqgAToAKe1x8MDssSeNCy6KMk8VhV
Transaction Signature: 5U5A6gP27RdSYwR94GmDJRibxYua5wUswug9zeEjdkuUBTsHF3FWpboWjK7vUgS9M1Q4DDMVNBThAwaNE7jvVgez
```

第二版结果

```
This is your ATA: 2doSzE6hVpJMr6nVavLo7p3uCSSVcG1zRanTKNvZZxtk!
Succesfully Minted!. Transaction Here: https://explorer.solana.com/tx/5UG5YfT1EuXhdhjDgfjpZez2DZq4o9EbynvMgAqz7hofTPZWaH46UuLs1ssJ6V8xPgaCFuUNdk2aJBYPX52MYvyo?cluster=devnet
```

第三版结果

```
正在使用地址: GD4yy8VnJHgEUQLVi5kzEJe9BJfJ51XiEA3ZdxpE1FGh 创建代币...
代币创建成功! Mint 地址: 347Ja1oyng4j8y8XX3dbdu9xrm7bUFLSWQpQppRCvJge
ATA 账户地址: D8VLa8deRRqkYETh9nRSLE7VY1sWQgYhbqrs2AtGaK9C
铸造成功! 交易哈希: 3gt9x5XuGJ7fwW1fERitQf6ZY7wWw2SSxoKdgZTEkVayhV9mN4sUWNK38bp2TEfzp2GYxVEJccP1yVemKFuKfMU3
检查地址: https://explorer.solana.com/address/347Ja1oyng4j8y8XX3dbdu9xrm7bUFLSWQpQppRCvJge?cluster=devnet
```