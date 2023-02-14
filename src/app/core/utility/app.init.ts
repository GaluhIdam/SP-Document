import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'https://dev-auth.gmf-aeroasia.co.id/auth',
          realm: 'spdoc',
          clientId: 'spdoc'
        },
        initOptions: {
            checkLoginIframe: true,
            checkLoginIframeInterval: 25,
        },
        loadUserProfileAtStartUp: true,
      });
  }