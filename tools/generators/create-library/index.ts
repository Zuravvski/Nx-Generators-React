import { readJsonFile, Tree } from '@nrwl/devkit';
import { libraryGenerator, reduxGenerator } from '@nrwl/react';
import { Linter } from '@nrwl/linter';
import { EsLintRc } from '../eslintrc';
import { ES_LINT_RC_FILE_NAME, getDependencyConstraints } from '../generator-utils';
import { Schema } from './schema';

export default async function(tree: Tree, schema: Schema) {
  schema = normalizeSchema(schema);

  validateScope(schema);

  if (schema.type !== 'data-access' && schema.redux) {
    throw new Error("Only 'data-access' libraries can have Redux intgration");
  }

  const moduleName = getModuleName(schema).toLowerCase();

  await libraryGenerator(tree, {
    ...schema,
    name: moduleName,
    directory: schema.scope,
    tags: `scope:${schema.scope}, type: ${schema.type}`,
    style: 'scss',
    linter: Linter.EsLint,
    skipFormat: true,
    skipTsConfig: false,
    unitTestRunner: 'jest',
    pascalCaseFiles: true
  });

  if (schema.redux) {
    await reduxGenerator(tree, {
      name: moduleName,
      project: `${schema.scope}-${moduleName}`,
      directory: 'state'
    });
  }
}

function normalizeSchema(schema: Schema): Schema {
  return {
    ...schema,
    name: schema.name.toLowerCase()
  }
}

function validateScope(schema: Schema) {
  const eslint: EsLintRc = readJsonFile(ES_LINT_RC_FILE_NAME);
  const constraints = getDependencyConstraints(eslint);
  
  if (!constraints) {
    throw new Error(`Missing dependency constraints in '${ES_LINT_RC_FILE_NAME}'`);
  }

  const scopeExists = constraints.some(constraint => constraint.sourceTag === `scope:${schema.scope}`);

  if (!scopeExists) {
    throw new Error(`No scope called '${schema.scope}'`);
  }
}

function getModuleName(schema: Schema): string {
  return schema.type === 'feature' ? schema.name : `${schema.name}-${schema.type}`;
}
