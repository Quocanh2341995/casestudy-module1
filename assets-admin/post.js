
    



function renderPost() {
    let htmls = posts.map(function (post, index) {
        return `
        <tr>
                        <td class="text-center">
                            <input type="checkbox">
                        </td>
                        <td>${post.username}</td>
                        <td class="text-center">
                        <img class="avatar-sm" src="${post.content}" alt="">
                                
                        </td>
                        <td class="text-center">
                            ${post.content}
                        </td>
                        <td>
                            ${post.email}
                        </td>
                        <td class="text-center">
                            <i class="fa-solid fa-pencil" ></i>
                            <i class="fa-solid fa-trash" ></i>
                        </td>
                    </tr>
        `

    });
    document.querySelector('table>tbody').innerHTML = htmls.join("");
}

function openModal(){
    document.querySelector('.modal-container').classList.add('show');
    
}
function closeModal(){
    document.querySelector('.modal-container').classList.remove('show');
    resetModal();
}

function changeAvatar(){
    document.querySelector('.avatar-lg').src = document.querySelector('#avatar').value || './image/noavatar.jpg';
}

function addContact(){
    let name = document.querySelector('#name').value;
    let avatar = document.querySelector('#avatar').value;
    let mobile = document.querySelector('#mobile').value;
    let email = document.querySelector('#email').value;
    let id = findMaxId() + 1;

    let contact = new Contact(id, name, avatar, mobile, email);
    contacts.push(contact);
    localStorage.getItem(contact_key, JSON.stringify(contacts));
    closeModal();
    renderContact();
}

function findMaxId(){
    let max = 0;
    for(let contact of contacts){
        if(contact.id > max){
            max = contact.id;
        }
    }
    return max;
}

function resetModal(){
    document.querySelector('#name').value = "0";
    document.querySelector('#avatar').value = "";
    document.querySelector('#mobile').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('.avatar-lg').src = "image/noavatar.jpg";

    document.querySelector('#btnUpdate').classList.add('d-none');
    document.querySelector('#btnAdd').classList.remove('d-none');

    document.querySelector('.modal-title').innerTEXT = "Add Contact";
}

function removeContact(index){
    let confirm = window.confirm('Are you sure ?');
    if (confirm){
        contacts.splice(index, 1);
        localStorage.getItem(contact_key, JSON.stringify(contacts));
        renderContact();
    }
    
}

function main(){
    init();
    renderPost();
}

function getContact(contactId){
    let contact = contacts.find(function(ct){
        return ct.id === contactId;
    })

    document.querySelector('#contactId').value = contact.id;
    document.querySelector('#name').value = contact.name;
    document.querySelector('#avatar').value = contact.avatar;
    document.querySelector('#mobile').value = contact.mobile;
    document.querySelector('#email').value = contact.email;
    document.querySelector('.avatar-lg').src = contact.avatar;

    document.querySelector('#btnUpdate').classList.remove('d-none');
    document.querySelector('#btnAdd').classList.add('d-none');

    document.querySelector('.modal-title').innerText = "Update Contact";
    openModal();
} 

function updateContact(){
    let id = document.querySelector('#contactId').value;

    let contact = contacts.find(function(ct){
        return ct.id == id;
    })
    
    contact.name = document.querySelector('#name').value;
    contact.avatar = document.querySelector('#avatar').value;
    contact.mobile = document.querySelector('#mobile').value;
    contact.email = document.querySelector('#email').value;

    localStorage.setItem(contact_key, JSON.stringify(contacts));

    closeModal();
    renderContact();
}

main();