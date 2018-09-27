export function parseParams(data) {
  return Object.keys(data).map((key) => {
    if (typeof data[key] === 'object') {
      return Object.keys(data[key]).map((key1) => {
        return `${key}[${key1}]=${encodeURIComponent(data[key][key1])}`;
      }).join('&');
    }
    return `${key}=${encodeURIComponent(data[key])}`;
  }).join('&');
}
