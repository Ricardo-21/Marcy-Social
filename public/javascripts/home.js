console.log('I am connected');

// newDate(foundTasks.task_date).toISOString().split('T')[0];

// document.addEventListener( "click", (e) => {
//     console.log(e.target.innerText)
//     if(e.target.innerText == 'viewpost'){
//         console.log('yes view')
//     }
//     else {
//         console.log('no view')
//     }
// })

// fetch('/api/posts/:id')
// .then(res.json())
// .then(results => {debugger;})

window.addEventListener('DOMContentLoaded', () =>{
    let commentForms = document.querySelectorAll('.commentForm');
    commentForms.forEach(form => {
        form.addEventListener('submit', commentMade);
    })
    let hearts = document.querySelectorAll('.fa-heart-circle');
    hearts.forEach(heart => {
        heart.addEventListener('click', heartClick);
    })

    let deleteComments = document.querySelectorAll('.delete-comment');
    deleteComments.forEach(deleteButton => {
        deleteButton.addEventListener('click', deleteButtonClick);
    })
})

function deleteButtonClick(e) {
    console.log(e.target.parentElement.parentElement);
    deleteComment(e.target.id.substring(6), e.target.attributes.alt.value.substring(4), e.target.parentElement.innerText.substring(0, e.target.parentElement.innerText.length - 7));
    e.target.parentElement.parentElement.remove();

}

function deleteComment(user_id, post_id, comment) {
    // console.log(user_id, post_id, comment);
    fetch('/api/comments/userComment', {
        headers: {
            'user_id': user_id,
            'postId': post_id,
            'comment': comment
        }
    })
    .then(res => res.json())
    .then(results => {
        // console.log(results)
        fetch(`/api/comments/${results.id}`, {
            method: 'DELETE',
            headers: {
                'user_id': user_id
            }
        })
    });
}


function commentMade(e) {
    e.preventDefault();
    let body = e.target.parentElement.parentElement.children[1];
    let commentTxt = e.target.children[0].children[0].value;
    let username = document.querySelector('h6').innerText.split('@')[1];
    let div = document.createElement('div');

    let p = document.createElement('p');
    let button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-outline-primary')
    button.classList.add('btn-sm')
    button.classList.add('delete-comment')
    button.setAttribute("alt",`post${e.target.id.substring(4)}`);
    button.id = `button${e.target.attributes.alt.value.substring(4)}`;
    button.innerText = 'delete';
    button.addEventListener('click', deleteButtonClick)
    let comment = document.createElement('h6');
    comment.classList.add('card-subtitle'); 
    comment.classList.add('mb-2');
    comment.classList.add('text-muted');
    // console.log(e.target.id, commentTxt)
    addCommentFetch(e.target.attributes.alt.value.substring(4), e.target.id.substring(4), commentTxt);
    comment.innerText = username;
    p.innerHTML = `<b>${commentTxt}<b> `;
    p.append(button);

    div.append(comment, p);
    body.append(div);
    e.target.reset();
}

function addCommentFetch(user_id, post_id, comment) {
    // console.log(user_id, post_id, comment);
    fetch(`/api/posts/${post_id}/comment`, {
        method: 'POST',
        headers: {
            "user_id": user_id,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment: comment}) 
    })
}


function heartClick(e) {
    // console.log(e.target.id, e.target.attributes.alt.value);
    if(e.target.style.color){
        e.target.style.color = '';
        let num = parseInt(e.target.parentNode.children[1].innerText)
        num -= 1;
        e.target.parentNode.children[1].innerText = num.toString();
        likeUnlike(e.target.attributes.alt.value, e.target.id);
    }
    else {
        e.target.style.color = 'blue';
        let num = parseInt(e.target.parentNode.children[1].innerText)
        num += 1;
        e.target.parentNode.children[1].innerText = num.toString();
        likeUnlike(e.target.attributes.alt.value, e.target.id);
    }
}

function likeUnlike(user_id, post_id) {
    fetch(`/api/posts/${post_id}/like`, {
        method: 'PATCH',
        headers: {
            "user_id": user_id
        }
    })
}


fetch('/api/events')
.then(res => res.json())
.then(results => {

    let events = results;
    
    let currentDate = new Date();
    results.forEach((event, index) => {
        let endDate = new Date(event.end_date || event.start_date);
        // console.log(event.event, endDate);
        if(currentDate > endDate) {
            events.splice(index, 1);
        }
        
        // console.log(currentDate, endDate, index, currentDate > endDate);

        // console.log(event.event, endDate);
        
    })

    // console.log(events);

    let event1 = events[0] || '';
    let event2 = events[1] || '';

    let div = document.querySelector('#eventsList');
    if(div){
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
    }

});