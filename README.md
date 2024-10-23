# !secure Encryption

[View Web Page (https://manuelwestermeier.github.io/basic-encryption/)](https://manuelwestermeier.github.io/basic-encryption/)

## how its working:

### toggleByteAlgorithm:

```
data     = 10101010
password = 11110000
>>         01011010
password: 1 meand toggle bit in data | use bit in data
```

javascript implementation:

```js
function toggleByteAlgorithm(value = 0, key = 0) {
  for (let index = 0; index < 8; index++) {
    if ((key >> index) & 1) {
      value ^= 1 << index;
    }
  }
  return value;
}
```

if the password is to short => repeat it with the values of the encyrpted data bevore

javascript implementation:

```js
function toggleEncryption(data, password) {
  for (let i = 0; i < data.length; i++) {
    data[i] = toggleByteAlgorithm(data[i], password[i % password.length]);
  }

  return data;
}
```