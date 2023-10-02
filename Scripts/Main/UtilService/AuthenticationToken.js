const refreshEndpoint = "http://localhost:5223/api/pharmacy/User/refresh-token";
function getTokenFromCookies() {
  const tokenCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token="));
  if (tokenCookie) {
    const tokenValue = tokenCookie.split("=")[1];
    const decodeToken = decodeURIComponent(tokenValue);
    return decodeToken;
  }
  return null;
}

function getRefreshTokenFromCookies() {
  const refreshTokenCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("refreshToken="));
  if (refreshTokenCookie) {
    const refreshTokenValue = refreshTokenCookie.split("=")[1];
    const decodeRefreshToken = decodeURIComponent(refreshTokenValue);
    return decodeRefreshToken;
  }
  return null;
}

function getTokenExpirationDate() {
  const expirationCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("ExpirationDate="));

  if (!expirationCookie) {
    return null;
  }
  const expirationString = decodeURIComponent(expirationCookie.split("=")[1]);
  return new Date(expirationString);
}

function isTokenExpiringSoon() {
  const expirationDate = getTokenExpirationDate();
  if (!expirationDate) {
    return false;
  }
  const currentTimestamp = new Date().getTime();
  const expirationTimestamp = expirationDate.getTime();
  const timeUntilExpiration = expirationTimestamp - currentTimestamp;
  console.log(timeUntilExpiration);
    return timeUntilExpiration; //si falta para expirar
}
async function refreshAccessToken() {
  const refreshToken = getRefreshTokenFromCookies();
  console.log("tokenrefresh", refreshToken);
  if (refreshToken) {
    try {
      const response = await fetch(refreshEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const result = await response.json();
        const token = encodeURIComponent(result.token);
        const refreshToken = encodeURIComponent(result.refreshToken);
        const expirationDate = encodeURIComponent(
          result.refreshTokenExpiration
        );
        // Actualizar el token en las cookies
        document.cookie = `token=${token}; path=/`;
        document.cookie = `refreshToken=${refreshToken}; path=/`;
        document.cookie = `ExpirationDate=${expirationDate}; path=/`;

        return true; // Refresco exitoso
      }
    } catch (error) {
      console.error("Error al refrescar el token:", error);
    }
  }
  return false; // Refresco fallido
}

// Función para manejar una respuesta no autorizada
async function handleUnauthorizedResponse() {
  if (isTokenExpiringSoon()) {
    if (isTokenExpiringSoon() <= 18770000) {
      const refreshToken = confirm(
        "El token está próximo a expirar. ¿Desea continuar la sesión?"
      );

      if (refreshToken) {
        console.log("here");
        const tokenRefreshed = await refreshAccessToken();
        if (!tokenRefreshed) {
          logout();
        }
      } else {
        logout();
      }
    }
    else{
      console.log("continúa tranqui");
    }
  } else {
    // El token ha expirado
    redirectToLoginPage();
  }
}

function redirectToLoginPage() {
  const index = "../../../../Login/login.html";
  window.location.assign(index);
}

function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie =
    "ExpirationDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  redirectToLoginPage();
}

//handleUnauthorizedResponse();

export { getTokenFromCookies, handleUnauthorizedResponse };
