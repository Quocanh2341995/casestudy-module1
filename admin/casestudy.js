
class Player {
    constructor(id, name, avatar, mobile, email, club, position) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.mobile = mobile;
        this.email = email;
        this.club = club;
        this.position = position;
    }
}

const player_key = "data-player";
const avatar_url = 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar';
var players = []

function init() {
    if (localStorage.getItem(player_key) == null) {
        players = [
            new Player(1, "Ronaldo", `${avatar_url}/1.jpg`, '0935123123', 'ronaldo@gmail.com', 'Real Madrid', 'tiền đạo'),
            new Player(2, "Kaka", `${avatar_url}/2.jpg`, '0935123123', 'kaka@gmail.com', 'Real Madrid', 'tiền đạo'),
            new Player(3, "Messi", `${avatar_url}/3.jpg`, '0935123123', 'messi@gmail.com', 'Real Madrid', 'tiền đạo'),
            new Player(4, "Neymar", `${avatar_url}/4.jpg`, '0935123123', 'neymar@gmail.com', 'Real Madrid', 'tiền đạo'),
            new Player(5, "Kroos", `${avatar_url}/5.jpg`, '0935123123', 'kroos@gmail.com', 'Real Madrid', 'tiền đạo'),
            new Player(6, "Luka Modric", `${avatar_url}/6.jpg`, '0935123123', 'modric@gmail.com', 'Real Madrid', 'tiền đạo')
        ];

        localStorage.setItem(player_key, JSON.stringify(players));
    }
    else {
        players = JSON.parse(localStorage.getItem(player_key));
    }
}

function renderPlayer() {
    let htmls = players.map(function (player, index) {
        return `
            <tr>
                <td class="text-center">
                    <input type="checkbox">
                </td>
                <td class="text-center">${player.name}</td>
                <td class="text-center">
                    <img class="avatar-sm" src="${player.avatar}" alt="">
                </td>
                <td class="text-center">
                    ${player.mobile}
                </td>
                <td class="text-center">
                    ${player.email}
                </td>
                <td class="text-center">
                    ${player.club}
                </td>
                <td class="text-center">
                    ${player.position}
                </td>
                <td class="text-center">
                    <i class="fa-solid fa-pencil" onclick="getPlayer(${player.id})"></i>
                    <i class="fa fa-trash" onclick='removePlayer(${index})'></i>
                </td>
            </tr>
        `
    });
    document.querySelector('.table>tbody').innerHTML = htmls.join("");
}


function openModal() {
    document.querySelector('.modal-container').classList.add('show');
}
function closeModal() {
    document.querySelector('.modal-container').classList.remove('show');
    resetModal();
}

function changeAvatar() {
    document.querySelector('.avatar-lg').src = document.querySelector('#avatar').value || 'images/noavatar.jpg';
}

function addPlayer() {
    let name = document.querySelector('#name').value;
    let avatar = document.querySelector('#avatar').value;
    let mobile = document.querySelector('#mobile').value;
    let email = document.querySelector('#email').value;
    let club = document.querySelector('#club').value;
    let position = document.querySelector('#position').value;
    let id = findMaxId() + 1;
    let player = new Player(id, name, avatar, mobile, email, club, position);
    players.push(player);
    localStorage.setItem(player_key, JSON.stringify(players));
    closeModal();
    renderPlayer();
}


function resetModal() {
    document.querySelector('#playerId').value = "0";
    document.querySelector('#name').value = "";
    document.querySelector('#avatar').value = "";
    document.querySelector('#mobile').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('#club').value = "";
    document.querySelector('#position').value = "";
    document.querySelector('.avatar-lg').src = "images/noavatar.jpg";

    document.querySelector('#btnUpdate').classList.add('d-none');
    document.querySelector('#btnAdd').classList.remove('d-none');

    document.querySelector('.modal-title').innerText = "Add Player";
}
function findMaxId() {
    let max = 0;
    for (let player of players) {
        if (player.id > max) {
            max = player.id;
        }
    }

    return max;
}


function removePlayer(index) {

    let confirm = window.confirm('Are you sure to remove this player?');
    if (confirm) {
        players.splice(index, 1);
        localStorage.setItem(player_key, JSON.stringify(players));
        renderPlayer();
    }
}

function getPlayer(playerId) {
    let player = players.find(function (pl) {
        return pl.id === playerId;
    })

    document.querySelector('#playerId').value = player.id;
    document.querySelector('#name').value = player.name;
    document.querySelector('#avatar').value = player.avatar;
    document.querySelector('#mobile').value = player.mobile;
    document.querySelector('#email').value = player.email;
    document.querySelector('#club').value = player.club;
    document.querySelector('#position').value = player.position;
    document.querySelector('.avatar-lg').src = player.avatar;

    document.querySelector('#btnUpdate').classList.remove('d-none');
    document.querySelector('#btnAdd').classList.add('d-none');

    document.querySelector('.modal-title').innerText = "Update Player";
    openModal();
}

function updatePlayer() {
    let id = document.querySelector('#playerId').value;

    let player = players.find(function (pl) {
        return pl.id == id;
    })

    player.name = document.querySelector('#name').value;
    player.avatar = document.querySelector('#avatar').value;
    player.mobile = document.querySelector('#mobile').value;
    player.email = document.querySelector('#email').value;
    player.club = document.querySelector('#club').value;
    player.position = document.querySelector('#position').value;

    localStorage.setItem(player_key, JSON.stringify(players));

    closeModal();
    renderContact();
}

function main() {
    init();
    renderPlayer();
}

main();