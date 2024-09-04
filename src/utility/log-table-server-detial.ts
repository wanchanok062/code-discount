import chalk from 'chalk';
export const logShowServerDetial = (port: number, mode: string) => {
    console.log(
        chalk.bgWhiteBright.black(
            ` ${mode} ${chalk.bgYellowBright.black(` Runing In `)}`,
        ),
        `http://localhost:${port}`,
    );
};

export const logShowDatabaseStatus = (mode: string) => {
    console.log(
        chalk.bgWhiteBright.black(
            ` ${mode} ${chalk.bgGreenBright.black(` Database `)}`,
        ),
        'Database connected And synced Success.',
    );
};
