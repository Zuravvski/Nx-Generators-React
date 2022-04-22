import { createContext, useContext } from "react";
import { ConfigProvider } from "./ConfigProvider";

export const ConfigContext = createContext<ConfigProvider | undefined>(undefined);

export const useConfigProvider = () => {
    const context = useContext(ConfigContext);

    if (!context) {
        throw new Error('Config provider has to be used within ConfigProviderContext');
    }

    return context;
}
