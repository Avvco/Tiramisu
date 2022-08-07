import 'dotenv/config';

export function node_url(networkName: string): string {
  if (networkName) {
    const uri = process.env['ETH_NODE_URI_' + networkName.toUpperCase()];
    if (uri && uri !== '') {
      return uri;
    }
  }

  let uri = process.env.ETH_NODE_URI;
  if (uri) {
    uri = uri.replace('{{networkName}}', networkName);
  }
  if (!uri || uri === '') {
    if (networkName === 'localhost') {
      return 'http://localhost:8545';
    }
    return '';
  }
  if (uri.indexOf('{{') >= 0) {
    throw new Error(
      `invalid uri or network not supported by node provider : ${uri}`
    );
  }
  return uri;
}

export function getPrivateKey(networkName?: string): string {
  const privateKey = process.env.MNEMONIC;
  if (!privateKey || privateKey === '') {
    return 'test test test test test test test test test test test junk';
  }
  return privateKey;
}

export function accounts(networkName?: string): {mnemonic: string} {
  return {mnemonic: getPrivateKey(networkName)};
}