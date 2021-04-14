console.log('I am connected');




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