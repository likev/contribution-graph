import create_graph from './create-graph'

let contributions_data1 = {
    '2022-03-01': 3,
    '2022-11-05': 7,
    // ... add more dates and contributions here
},

contributions_data2 = {
    '2023-03-01': 3,
    '2023-11-05': 7,
    // ... add more dates and contributions here
};

let graph1 = create_graph('#graph1', contributions_data1),
graph2 = create_graph('#graph2', contributions_data2);

setTimeout(function(){
    graph1.update('2022-06-01', 3);
    graph2.update('2023-08-01', 3);
}, 3000)