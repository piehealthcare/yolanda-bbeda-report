import Bem from 'easy-bem';
import { pascalCase } from '@huyk/utils/dist/esm/helper';

export default function createNamespace(namespace: string, { prefix = 'qn' }: { prefix?: string; } = {}) {
  let kebabName = `${namespace.toLocaleLowerCase()}`;
  if (prefix) {
    kebabName = `${prefix}-${kebabName}`;
  }
  const pascalName = pascalCase(kebabName);
  const bem = Bem(kebabName);

  return {
    name: pascalName,
    kebabName,
    pascalName,
    bem,
  };
}
