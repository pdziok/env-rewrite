'use strict';

module.exports = function() {
    if (process.env.REWRITE_ENV) {
        const newEnvs = (process.env.REWRITE_ENV || '').split(',').map(pair => {
                const keys = pair.split(':');
        if (keys.length !== 2) {
            return {};
        }

        let tmp = {};
        tmp[keys[0]] = keys[1];

        return tmp;
    }).reduce((previous, current) => {
            return Object.assign({}, previous, current);
    });

    Object.keys(newEnvs).forEach(newEnvName => {
        const oldEnvName = newEnvs[newEnvName];
        const envValue = process.env[oldEnvName];

        if (typeof envValue === 'undefined' && !process.env.REWRITE_ENV_SILENT) {
            throw new Error('Env ' + oldEnvName + ' was not defined');
        }
        process.env[newEnvName] = envValue;
    });
    }
};
