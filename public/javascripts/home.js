console.log('I am connected');

// newDate(foundTasks.task_date).toISOString().split('T')[0];


fetch('/api/events')
.then(res => res.json())
.then(results => {

    let events = results;
    
    let currentDate = new Date();
    results.forEach((event, index) => {
        let endDate = new Date(event.end_date || event.start_date);

        if(currentDate > endDate) {
            events.splice(index, 1);
        }
        
        console.log(currentDate, endDate, index, currentDate > endDate);

        // console.log(event.event, endDate);
        
    })

    console.log(events);

    let event1 = events[1] || '';
    let event2 = events[2] || '';

    let div = document.querySelector('#eventsList');
    let h41 = document.createElement('h4');
    let p1 = document.createElement('p');
    let h42 = document.createElement('h4');
    let p2 = document.createElement('p');
    if(event1 === '') {
        h41.innerText = event1;
        p1.innerHTML = event1;
    }
    else {
        h41.innerText = `${event1.event}`;
        let endDate = new Date(event1.end_date || event1.start_date);
        p1.innerHTML = `${new Date(event1.start_date).toDateString()}<b>--></b>${endDate.toDateString()}`
    }
    
    if(event2 === '') {
        h42.innerText = '';
        p2.innerHTML = '';
    }
    else {
        h42.innerText = `${event2.event}`;
        let endDate2 = new Date(event2.end_date || event2.start_date);
        p2.innerHTML = `${new Date(event2.start_date).toDateString()}<b>--></b>${endDate2.toDateString()}`
    }

    div.append(h41, p1, h42, p2);
});