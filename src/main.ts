import getSuccesses from './getSuccesses'

declare global {
  interface Window {
    ethereum: any; // No available typedefs for MetaMask?
  }
}

async function showData() {
  const data = document.getElementById('data')
  if (!data) return

  const daosCreated = await getSuccesses()
  data.innerHTML = `
    <strong>${daosCreated.length}</strong> Open Enterprise DAOs have been
    created on mainnet
  `
}

function signIn() {
  const web3off = document.getElementById('web3-off') as HTMLElement
  const web3on = document.getElementById('web3-on') as HTMLElement
  web3off.style.display = 'none'
  web3on.style.display = ''
  showData()
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
  const explainer = document.getElementById('web3-explainer') as HTMLElement
  if (explainer.parentNode) explainer.parentNode.replaceChild(button, explainer)
}

document.body.onload = main
