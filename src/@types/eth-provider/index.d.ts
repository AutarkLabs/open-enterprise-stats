declare module 'eth-provider' {
  export default function provider(
    name:
      'injected' |
      'frame' |
      'direct' |
      'infura' |
      'infuraRinkeby' |
      'infuraRopsten' |
      'infuraKovan'
  ): string
}
