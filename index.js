const [startEncButton, startDecButton] = document.querySelectorAll("button");
const [encPasswordInput, decPasswordInput] =
  document.querySelectorAll("input[type=text]");
const [encFileInput, decFileInput] =
  document.querySelectorAll("input[type=file]");

function toggleByteAlgorithm(value = 0, key = 0) {
  for (let index = 0; index < 8; index++) {
    if ((key >> index) & 1) {
      value ^= 1 << index;
    }
  }
  return value;
}

function encryptData(data, password) {
  if (password.length === 0) throw alert("Please input a password");
  if (data.length === 0) return data;

  for (let i = 0; i < data.length; i++) {
    data[i] = toggleByteAlgorithm(data[i], password[i % password.length]);
  }

  return data;
}

function decryptData(data, password) {
  if (password.length === 0) throw alert("Please input a password");
  if (data.length === 0) return data;

  for (let i = 0; i < data.length; i++) {
    data[i] = toggleByteAlgorithm(data[i], password[i % password.length]);
  }

  return data;
}

function processFile(fileInput, passwordInput, isEncryption) {
  const dataFile = fileInput.files[0];
  if (!dataFile) return alert("Please select a File");

  const reader = new FileReader();

  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    const password = Uint8Array.from(
      passwordInput.value.split("").map((char) => char.charCodeAt(0))
    );

    const processedData = isEncryption
      ? encryptData(data, password)
      : decryptData(data, password);

    const blob = new Blob([processedData], {
      type: "application/octet-stream",
    });
    const outputFileName =
      prompt(
        "Enter the output file name:",
        isEncryption ? "encrypted_file.bin" : "decrypted_file.bin"
      ) || (isEncryption ? "encrypted_file.bin" : "decrypted_file.bin");

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = outputFileName;
    downloadLink.click();
  };

  reader.readAsArrayBuffer(dataFile);
}

startEncButton.onclick = () => {
  processFile(encFileInput, encPasswordInput, true);
};

startDecButton.onclick = () => {
  processFile(decFileInput, decPasswordInput, false);
};
