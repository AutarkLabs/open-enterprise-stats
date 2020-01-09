import getSuccesses from './getSuccesses'

Array.prototype.toString = function() {
  return this.join('')
}

async function main() {
  const data = document.getElementById('data')
  if (!data) return

  const daosCreated = await getSuccesses()
  data.innerHTML = `
    <h1>
      ${daosCreated.length} Open Enterprise DAOs have been created on mainnet
    </h1>
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>address</th>
          <th>blockHash</th>
          <th>blockNumber</th>
          <th>logIndex</th>
          <th>transactionHash</th>
          <th>transactionIndex</th>
          <th>returnValues.dao</th>
          <th>event</th>
          <th>signature</th>
          <th>raw.data</th>
        </tr>
      </thead>
      <tbody>
        ${daosCreated.map((dao, index) => `
          <tr>
            <td>${index + 1}</td>
            <td><code>${dao.address}</code></td>
            <td><code>${dao.blockHash}</code></td>
            <td><code>${dao.blockNumber}</code></td>
            <td><code>${dao.logIndex}</code></td>
            <td><code>${dao.transactionHash}</code></td>
            <td><code>${dao.transactionIndex}</code></td>
            <td>
              <a target="_blank" href="https://mainnet.aragon.org/#/${dao.returnValues.dao}">
                <code>${dao.returnValues.dao}</code>
              </a>
            </td>
            <td><code>${dao.event}</code></td>
            <td><code>${dao.signature}</code></td>
            <td><code>${dao.raw.data}</code></td>
          </tr>
        `)}
      </tbody>
    </table>
  `
}

document.body.onload = main
