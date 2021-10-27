export default function decodeToken(token) {
  const [, encodedPayload] = token.split('.');
  const jsonPayload = atob(encodedPayload);
  const payload = JSON.parse(jsonPayload);
  console.log('decodeToken decodeToken:', payload);
  //  payload contains the folloiwing object: {userId: 47, username: 'yoX3', iat: 1634686780}
  return payload;
}
