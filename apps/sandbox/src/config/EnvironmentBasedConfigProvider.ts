import { ConfigProvider } from "@sandbox/shared/core";
import { environment } from "../environments/environment";

export class EnvironmentBasedConfigProvider implements ConfigProvider {
    getApiUrl(): string {
        return environment.apiUrl;
    }

    isProduction(): boolean {
        return environment.production;
    }
}
