// constants.js

export const colors = [
    '#006400', // Темно-зеленый
    '#197319', // Зеленовато-темный
    '#328232', // Зеленоватый
    '#4C914C', // Светло-зеленый
    '#65A065', // Желто-зеленый
    '#FFFF99', // Бледно-желтый
    '#FFC266', // Оранжевый
    '#FF8C33', // Светло-красный
    '#FF5600',
    '#FF0000' // Красный
];

export const getRandomLevelInRange = (range) => {
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
};

export const initialScenarios = [
    {
        image: 'https://via.placeholder.com/100',
        title: 'Сценарий 1',
        description: 'Описание сценария 1',
        range: [0, 4],
        level: getRandomLevelInRange([0, 4])
    },
    {
        image: 'https://via.placeholder.com/100',
        title: 'Сценарий 2',
        description: 'Описание сценария 2',
        range: [4, 8],
        level: getRandomLevelInRange([4, 8])
    },
    {
        image: 'https://via.placeholder.com/100',
        title: 'Сценарий 3',
        description: 'Описание сценария 3',
        range: [2, 6],
        level: getRandomLevelInRange([2, 6])
    },
    {
        image: 'https://via.placeholder.com/100',
        title: 'Сценарий 4',
        description: 'Описание сценария 4',
        range: [1, 5],
        level: getRandomLevelInRange([1, 5])
    },
    {
        image: 'https://via.placeholder.com/100',
        title: 'Сценарий 5',
        description: 'Описание сценария 5',
        range: [3, 7],
        level: getRandomLevelInRange([3, 7])
    },
    {
        image: 'https://via.placeholder.com/100',
        title: 'Сценарий 6',
        description: 'Описание сценария 6',
        range: [5, 9],
        level: getRandomLevelInRange([5, 9])
    },
];

export const STORAGE_KEY = '@scenarios';
export const SAVED_SETTINGS_KEY = '@savedSettings';

