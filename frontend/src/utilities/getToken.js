export const getToken = () => {
    const token = localStorage.getItem('greenitsToken'); // Replace 'token' with the actual key you used to store the token
    if(!token){alert('session expired login to continue');return;};
    try {
      const tokenParts = token.split(".");
      const decodedPayload = JSON.parse(atob(tokenParts[1]));
      return decodedPayload.user_id;
    } catch (error) {
      return ''
    }
}