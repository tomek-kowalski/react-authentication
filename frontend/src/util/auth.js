import { redirect } from "react-router";

export function getAuthToken() {
    const token = localStorage.getItem('token');

    const tokenDuration = getTokenDuration();

    if(tokenDuration < 0 ) {
        return 'EXPIRED';
    }

    return token;
}

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    
    if (!storedExpirationDate) {
        return 0;
    }

    const expirationDate = new Date(storedExpirationDate);

    if (isNaN(expirationDate.getTime())) {
        return 0;
    }

    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();

    return duration;
}
export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {

    const token = getAuthToken();
    
    if (!token) {
      return redirect('/auth');
    }
   
    return null; 
  }