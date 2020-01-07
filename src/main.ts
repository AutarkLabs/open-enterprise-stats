export {}

declare global {
  interface Window {
    ethereum: any; // No available typedefs for MetaMask?
  }
}

function signIn() {
  const web3off = document.getElementById('web3-off')
  const web3on = document.getElementById('web3-on')
  web3off.style.display = 'none'
  web3on.style.display = ''
}

async function enableWeb3() {
  await window.ethereum.enable()
  signIn()
}

function main() {
  if (!window.ethereum) return

  if (window.ethereum.selectedAddress) return signIn()

  const button = document.createElement('button')
  const text = document.createTextNode('Enable web3')
  button.appendChild(text)
  button.className = "link"
  button.onclick = enableWeb3

  const explainer = document.getElementById('web3-explainer')
  explainer.parentNode.replaceChild(button, explainer)
}

document.body.onload = main
