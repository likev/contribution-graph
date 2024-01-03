//by gpt4
//https://www.perplexity.ai/search/20230101-3-20231105-Xb.6nrmpS2mhpoVCCqPU6w?s=c

function createDictionary(counts, min_num, max_num, min_day, max_day) {
    let result = {};
    let start_date = new Date(min_day);
    let end_date = new Date(max_day);
    let date_range = [];

    for(let d = new Date(start_date); d <= end_date; d.setDate(d.getDate() + 1)) {
        date_range.push(new Date(d));
    }

    for(let i = 0; i < counts; i++) {
        let random_date = date_range[Math.floor(Math.random() * date_range.length)];
        let random_count = Math.floor(Math.random() * (max_num - min_num + 1)) + min_num;
        let date_string = random_date.toISOString().split('T')[0]; // format date as "YYYY-MM-DD"
        result[date_string] = random_count;
    }

    return result;
}

function sortDictionaryByDate(dict) {
    let sortedKeys = Object.keys(dict).sort((a, b) => new Date(a) - new Date(b));
    let result = {};
    sortedKeys.forEach(key => {
        result[key] = dict[key];
    });
    return result;
}

