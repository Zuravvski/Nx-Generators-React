export interface EsLintRc {
    root: boolean;
    ignorePatterns: string[];
    plugins: string[];
    overrides: OverrideItem[];
}

export interface OverrideItem {
    files: string[];
    extends?: string[];
    rules: {
        [key: string]: any;
        ['@nrwl/nx/enforce-module-boundaries']?: Array<string | NxEnforceBoundriesRule>;
    }
}

export interface NxEnforceBoundriesRule {
    enforceBuildableLibDependency: boolean;
    allow: string[];
    depConstraints: DependencyConstraint[]
}

export interface DependencyConstraint {
    sourceTag: string;
    onlyDependOnLibsWithTags: string[];
}
