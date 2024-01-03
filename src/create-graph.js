
import { $ } from "../jquery/src/jquery.js";

import moment from 'moment';

function getColor(contributionCount) {
    let hue = Math.max(120 - contributionCount * 10, 0);
    return 'hsl(' + hue + ', 50%, 50%)';
}

function create_graph(graph_selecter, contributions) {
    const graph_table = 
$(`<table class="contributionGraph">
    <thead>
        <tr class="monthHeader"></tr>
    </thead>
    <tbody class="graphBody"></tbody>
</table>`);

    //$(graph_selecter).html(graph_table);
    $(graph_selecter).empty().append(graph_table);

    let startDate = moment(Object.keys(contributions)[0]);

    const firstday = moment(startDate.clone()).startOf('year'),
        firstday_week = firstday.day(),
        endday = moment(startDate.clone()).endOf('year');

    console.log({
        startDate: startDate.format('YYYY-MM-DD'),
        firstday: firstday.format('YYYY-MM-DD'),
        endday: endday.format('YYYY-MM-DD')
    })

    let numDays = endday.diff(firstday, 'days') + 1;
    let numWeeks = Math.ceil((numDays + firstday_week) / 7);

    // Create the month headers
    let weekStart = firstday.clone(), lastMonth = '';

    const graph_table_header = $('.monthHeader', graph_table);
    $('.monthHeader', graph_table).append($('<th>').addClass('empty-header'));
    for (let w = 0; w < numWeeks; w++) {
        
        let monthName = weekStart.format('MMM');
        if (lastMonth !== monthName) {
            graph_table_header.append($('<th>').text(monthName));
            lastMonth = monthName;
        } else {
            graph_table_header.append($('<th>').addClass('empty-header'));
        }

        weekStart = weekStart.add(7, 'days').startOf('isoWeek');

    }

    // Create the contribution graph week lable and empty cell
    const graph_table_body = $('.graphBody', graph_table);
    for (let r = 0; r < 7; r++) {
        let row = $('<tr>'), rowhtml = '';
        for (let c = 0; c < 54; c++) {
            rowhtml += `<td class='cell cell-${r}-${c}' >${c === 0 && (r % 2) ? moment().day(r).format('ddd') : ''}</td>`
        }
        row.append(rowhtml)
        graph_table_body.append(row);
    }

    function update(date, value){
        const currentDate = moment(date);
        let col = Math.ceil((currentDate.dayOfYear() + firstday_week) / 7);
        let dateStr = currentDate.format('YYYY-MM-DD');
        let cell = $(`.cell-${currentDate.day()}-${col}`, graph_table_body).addClass('contribution-day');
        
        if (value) {
            console.log(col)
            cell.css('background-color', getColor(value));
        }
        cell.attr('title', dateStr + ': ' + (value || 0) );

    }


    // Create the contribution graph
    for (let i = 0, currentDate = firstday.clone(); i < numDays; i++) {
        
        const dateStr = currentDate.format('YYYY-MM-DD'), value = contributions[dateStr];
        update(currentDate, value)

        currentDate.add(1, 'days');
    }

    return {
        update
    }
}

export default create_graph;

