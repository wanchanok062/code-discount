import { table, getBorderCharacters } from 'table';
const config = {
    border: getBorderCharacters('norc'), // Simplified border style
};
export const logShowServerDetial = (port: number, mode: string) => {
    const tableData = [
        ['Host', 'Mode', 'Port'],
        [`http://localhost`, mode ?? 'development', port],
    ];
    const output = table(tableData, config);
    console.log(output);
};

export const logShowDatabaseStatus = () => {
    const tableData = [['Status', 'Database connected And synced Success']];

    const output = table(tableData, config);
    console.log(output);
};
