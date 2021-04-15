console.log('I am connecter');
let cont = document.querySelectorAll('.container')[1];

fetch('/api/users')
.then(res => res.json())
.then(usersArr => {
    let rowCount = Math.ceil(usersArr.length/3)
    let rows = [];
    let rowInd = 0;

    for(let i = 0; i < rowCount; i ++) {
        rows.push(row());
    }



    for(let i = 0; i < usersArr.length; i ++) {
        if((i + 1) % 3 === 0) {
            
            let user = userCard(usersArr[i]);
            rows[rowInd].append(user);
            rowInd += 1;
            
        }
        else {
            let user = userCard(usersArr[i]);
            rows[rowInd].append(user);
        }
    }

    for(let i = 0; i < rows.length; i ++) {
        cont.append(rows[i]);
    }


    // console.log(rows);
})

function row() {
    let row = document.createElement('div');
    row.className = 'row';

    return row;
}

function userCard(user_obj) {
    let card = document.createElement('div');
    card.className ='col-lg-4';

    card.innerHTML = `
    <div class="text-center card-box" id = '${user_obj.username.toLowerCase()}'>
        <div class="member-card pt-2 pb-2">
            <div class="thumb-lg member-thumb mx-auto"><img src="${user_obj.photo_src || 'https://st.depositphotos.com/1915171/5109/v/600/depositphotos_51091665-stock-illustration-coder-sign-icon-programmer-symbol.jpg'}" class="rounded-circle img-thumbnail" alt="profile-image"></div>
            <div class="">
                <h4>${user_obj.firstname} ${user_obj.lastname}</h4>
                <p class="text-muted">@${user_obj.username}
            </div>
            <a href="/users/${user_obj.username}"type="button" class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">View Profile</a>
        </div>
    </div>`;

    return card;
}


const form = document.querySelectorAll('.container-fluid')[1];
form.addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault();
    const inputText = document.querySelectorAll('.form-control')[0].value.toLowerCase();
    const div = document.querySelector(`#${inputText}`);
    if(div) {
        div.scrollIntoView();
    }
    else {
        alert('User does not exist');
    }
}