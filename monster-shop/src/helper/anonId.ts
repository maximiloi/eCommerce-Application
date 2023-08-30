export default function getAnonId() {
  const arr = new Array(10);
  arr.fill(Math.floor(Math.random() * 100));
  return arr.join('');
}
