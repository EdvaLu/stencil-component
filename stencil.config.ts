import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
    namespace: 'stencil-components',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'dist-custom-elements',
        },
        {
            type: 'docs-readme',
        },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
        angularOutputTarget({
            componentCorePackage: 'stencil-components',
            directivesProxyFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts',
            directivesArrayFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts',
        })
    ],
    plugins: [
        sass()
    ]
};
