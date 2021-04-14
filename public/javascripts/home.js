console.log('I am connected');

// newDate(foundTasks.task_date).toISOString().split('T')[0];


fetch('/api/events')
.then(res => res.json())
.then(results => {

    let events = results;
    
    let currentDate = new Date();
    events.forEach(event => {
        let endDate = new Date(event.end_date || event.start_date);


        console.log(currentDate, endDate);

        // console.log(event.event, endDate);
        
    })
});