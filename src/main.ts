import getSuccesses from './getSuccesses'

async function main() {
  const data = document.getElementById('data')
  if (!data) return

  const daosCreated = await getSuccesses()
  data.innerHTML = `
    <strong>${daosCreated.length}</strong> Open Enterprise DAOs have been
    created on mainnet
  `
}

document.body.onload = main
