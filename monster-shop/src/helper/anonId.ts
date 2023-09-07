export default function getAnonId() {
  const arr = new Array(10).fill(0);
  return arr.map(() => Math.floor(Math.random() * 100)).join('');
}
