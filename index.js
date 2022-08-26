const CircuitBreaker = require('opossum');

// サーキットブレーカーの対象となる非同期関数を実装
const asyncFunction = (arg) => {
  return new Promise((resolve, reject) => {
    arg === 'OK' ? resolve(`Good: ${arg}`) : reject();
  });
};

// opossumに引数で実装した非同期関数を渡す
const circuit = new CircuitBreaker(asyncFunction);

// fallbackで非同期関数でエラーが発生した場合の処理を実装
circuit.fallback((arg) => {
  return `Bad:${arg}`
});

(async () => {
  const ret = await Promise.all([
    circuit.fire("OK"),
    circuit.fire("NG"),
    circuit.fire("OK")
  ]);
  console.log(ret);
})();
