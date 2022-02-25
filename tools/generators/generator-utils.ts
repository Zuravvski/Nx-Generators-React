import { DependencyConstraint, EsLintRc, NxEnforceBoundriesRule } from "./eslintrc";

export const ES_LINT_RC_FILE_NAME = '.eslintrc.json';

export function isNxBoundryRule(obj: string | NxEnforceBoundriesRule): boolean {
    return typeof(obj) === 'object' && Object.keys(obj).some(key => key === 'depConstraints');
}

export function assertIsNxBoundryRule(obj: string | NxEnforceBoundriesRule): obj is NxEnforceBoundriesRule {
    return isNxBoundryRule(obj);
}

export function getDependencyConstraints(esLintRc: EsLintRc): DependencyConstraint[] | null {
    const nxRuleIndex = esLintRc.overrides.findIndex(override => override.rules['@nrwl/nx/enforce-module-boundaries']);
      
    if (nxRuleIndex === -1) {
      return null;
    }

    const nxBoundryRule = esLintRc
      .overrides[nxRuleIndex]
      .rules['@nrwl/nx/enforce-module-boundaries']
      .find(rule => isNxBoundryRule(rule));

    if (!nxBoundryRule || !assertIsNxBoundryRule(nxBoundryRule)) {
      return null;
    }

    return nxBoundryRule.depConstraints;
}
