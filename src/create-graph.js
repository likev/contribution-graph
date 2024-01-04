
import { $ } from "../jquery/src/jquery.js";

import moment from 'moment';

function getColor(contributionCount) {
    let hue = Math.max(120 - contributionCount * 10, 0);
    return 'hsl(' + hue + ', 50%, 50%)';
}

function create_graph_header(graph_table, firstday, numWeeks) {
    // Create the month headers
    const graph_table_header = $('.monthHeader', graph_table);

    graph_table_header
        .append($('<th>').addClass('empty-header'))
        .append($('<th>').text('Jan'));

    //Saturday as 6
    let weekStart = firstday.clone().day(6), lastMonth = 'Jan';

    for (let w = 1; w < numWeeks; w++) {

        weekStart.add(7, 'days');
        let monthName = weekStart.format('MMM');

        if (lastMonth !== monthName) {
            graph_table_header.append($('<th>').text(monthName));
            lastMonth = monthName;
        } else {
            graph_table_header.append($('<th>').addClass('empty-header'));
        }

    }
}

function create_graph_cell(graph_table, numWeeks) {
    // Create the contribution graph week lable and empty cell
    const graph_table_body = $('.graphBody', graph_table);
    for (let r = 0; r < 7; r++) {
        let row = $('<tr>'), rowhtml = '';
        for (let c = 0; c < numWeeks + 1; c++) { //the first col is week label
            rowhtml += `<td class='cell cell-${r}-${c}' >${c === 0 && (r % 2) ? moment().day(r).format('ddd') : ''}</td>`
        }
        row.append(rowhtml)
        graph_table_body.append(row);
    }
    return graph_table_body;
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

    let graph_year;

    if (Number.isInteger(contributions)) {
        graph_year = contributions;
        contributions = {}
    } else if (typeof contributions === 'object' && contributions !== null && Object.keys(contributions).length > 0) {
        graph_year = moment(Object.keys(contributions)[0]).year();
    } else {
        graph_year = moment().year();
        contributions = {};
    }

    const firstday = moment({ year: graph_year }).startOf('year'),
        firstday_week = firstday.day(),
        endday = moment({ year: graph_year }).endOf('year');

    console.log({
        firstday: firstday.format('YYYY-MM-DD'),
        endday: endday.format('YYYY-MM-DD')
    })

    let numDays = endday.diff(firstday, 'days') + 1;
    let numWeeks = Math.ceil((numDays + firstday_week) / 7);

    create_graph_header(graph_table, firstday, numWeeks);

    create_graph_cell(graph_table, numWeeks);

    function update(date, value) {
        const currentDate = moment(date);

        if(currentDate.year() !== graph_year) return false;

        let col = Math.ceil((currentDate.dayOfYear() + firstday_week) / 7);
        let dateStr = currentDate.format('YYYY-MM-DD');
        let cell = $(`.cell-${currentDate.day()}-${col}`, graph_table).addClass('contribution-day');

        if (typeof value === 'number') {
            console.log(col)
            cell.css('background-color', getColor(value))
                .attr('title', dateStr + ': ' + (value || 0));
        }
        
        return true;
    }

    // Create the contribution graph
    for (let i = 0, currentDate = firstday.clone(); i < numDays; i++) {

        const dateStr = currentDate.format('YYYY-MM-DD'), value = contributions[dateStr];
        update(currentDate, value);

        currentDate.add(1, 'days');
    }

    return {
        update
    }
}

export default create_graph;

