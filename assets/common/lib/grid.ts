export const gridConditions = [
    // where key is number of grid items
    { count:1, grid:'grid-cols-1 grid-flow-row-dense', items:[''] }, 
    { count:2, grid:'grid-cols-2 grid-flow-row-dense', items:[''] }, 
    { count:3, grid:'grid-cols-2 grid-rows-2 grid-flow-row-dense', items:['row-span-2','',''] },
    { count:4, grid:'grid-cols-5 grid-rows-2 grid-flow-row-dense', items:[
        'col-span-3 row-span-full',
        'col-span-2',
        'col-span-1'
    ] },
    { count:5, grid:'grid-cols-5 grid-rows-3 grid-flow-row-dense', items:[
        'col-span-3 row-span-2',
        'col-span-2 row-span-2',
        'col-span-3 row-span-1',
        'col-span-1 row-span-1'
    ] },
    { count:6, grid:'grid-cols-5 grid-rows-3 grid-flow-row-dense', items:[
        'col-span-3 row-span-2',
        'col-span-2 row-span-2',
        'col-span-1 row-span-1',
        'col-span-1 row-span-1',
        'col-span-1 row-span-1',
        'col-span-2 row-span-1',
    ] },
    { count:7, grid:'grid-cols-5 grid-rows-3 grid-flow-row-dense', items:[
        'col-span-3 row-span-2',
        'col-span-2 row-span-1',
        'col-span-2 row-span-1',
        'col-span-2 row-span-1',
        'col-span-1 row-span-1',
    ] },
    { count:8, grid:'grid-cols-5 grid-rows-3 grid-flow-row-dense', items:[
        'col-span-3 row-span-2',
        'col-span-2 row-span-1',
        'col-span-2 row-span-1',
        'col-span-1 row-span-1',
    ] },
    { count:9, grid:'grid-cols-5 grid-rows-3 grid-flow-row-dense', items:[
        'col-span-3 row-span-2',
        'col-span-2 row-span-1',
        'col-span-1 row-span-1',
    ] },
    { count:10, grid:'grid-cols-5 grid-rows-3 grid-flow-row-dense', items:[
        'col-span-3 row-span-2',
        'col-span-1 row-span-1',
    ] },
]