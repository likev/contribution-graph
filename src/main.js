import create_graph from './create-graph'

let contributions_data = {
    '2022-03-01': 3,
    '2022-11-05': 7,
    // ... add more dates and contributions here
},

year2023 = 2023;

let graph1 = create_graph('#graph1', contributions_data),
graph2 = create_graph('#graph2', year2023);

setTimeout(function(){
    graph1.update('2022-06-01', 3);
    graph2.update('2023-08-01', 3);
}, 3000)