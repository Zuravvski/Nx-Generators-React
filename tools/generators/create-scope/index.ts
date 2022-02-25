import { Tree, updateJson } from '@nrwl/devkit';
import { componentGenerator, libraryGenerator } from '@nrwl/react';
import { Linter } from '@nrwl/linter';
import { produce } from 'immer';
import { Schema } from './schema';
import { EsLintRc } from '../eslintrc';
import {
  assertIsNxBoundryRule,
  ES_LINT_RC_FILE_NAME,
  isNxBoundryRule,
} from '../generator-utils';

export default async function (tree: Tree, schema: Schema) {
  schema = normalizeSchema(schema);
  updateDependencyConstraints(tree, schema);

  if (schema.layout) {
    await generateLayout(tree, schema);
  }
}

function normalizeSchema(schema: Schema): Schema {
  return {
    ...schema,
    name: schema.name.toLowerCase(),
  };
}

function updateDependencyConstraints(tree: Tree, schema: Schema) {
  updateJson(tree, ES_LINT_RC_FILE_NAME, (json: EsLintRc) => {
    return produce(json, (draft) => {
      const nxRuleIndex = draft.overrides.findIndex(
        (override) => override.rules['@nrwl/nx/enforce-module-boundaries']
      );

      if (nxRuleIndex === -1) {
        return;
      }

      const nxBoundryRule = draft.overrides[nxRuleIndex].rules[
        '@nrwl/nx/enforce-module-boundaries'
      ].find((rule) => isNxBoundryRule(rule));

      if (!nxBoundryRule || !assertIsNxBoundryRule(nxBoundryRule)) {
        return;
      }

      const scopeTag = `scope:${schema.name}`;

      if (
        nxBoundryRule.depConstraints.some(
          (constraint) => constraint.sourceTag === scopeTag
        )
      ) {
        throw new Error(`Scope '${schema.name}' already exists`);
      }

      nxBoundryRule.depConstraints.push({
        sourceTag: scopeTag,
        onlyDependOnLibsWithTags: [scopeTag, 'scope:shared'],
      });
    });
  });
}

async function generateLayout(tree: Tree, schema: Schema): Promise<void> {
  await libraryGenerator(tree, {
    name: 'layout',
    directory: schema.name,
    linter: Linter.EsLint,
    skipFormat: true,
    skipTsConfig: false,
    style: 'scss',
    unitTestRunner: 'jest',
    tags: `scope: ${schema.name}, type:layout`,
    pascalCaseFiles: true,
  });

  await componentGenerator(tree, {
    name: `${schema.name}Layout`,
    project: `${schema.name}-layout`,
    flat: true,
    style: 'scss',
    export: true,
    pascalCaseFiles: true,
  });
}
