class Post {
    constructor(id, avatar, name, content) {
        this.id = id;
        this.avatar = avatar;
        this.name = name;
        this.content = content;
    }
}

const post_key = "data-post";
let posts = [];

function init() {
    if (localStorage.getItem(post_key) == null) {
        posts = [
            new Post(1,"https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2022-12/Cristiano%20Ronaldo%20Portugal.jpg?itok=sdnK_7DP", "Cristiano Ronaldo", "That winning feeling!💪🏼⚽️ "),
            new Post(2,"https://vcdn-vnexpress.vnecdn.net/2022/10/26/-4635-1666749557.jpg", "Toni Kroos", "Long season. 3 trophies! Thanks for your support."),
            new Post(3,"https://vtv1.mediacdn.vn/zoom/640_400/562122370168008704/2023/8/24/photo1692873763608-169287376372578456859.jpg", "Luka Modric", "La Champions y el Bernabéu… 😍💪 #HalaMadrid")
        ];

        localStorage.setItem(post_key, JSON.stringify(posts));
    }
    else {
        posts = JSON.parse(localStorage.getItem(post_key));
    }
}

function renderPost() {
    let htmls = posts.map(function (post, index) {
        return `
            <div class="friends-post">

                <div class="friend-post-top">

                    <div class="img-and-name">

                        <img src="${post.avatar}">

                        <div class="friends-name">
                            <p class="friends-name">
                                ${post.name}
                            </p>
                            <p class="time">3 giờ.<i class="fa-solid fa-earth-americas"></i></p>
                        </div>

                    </div>

                    <div class="menu">

                        <i class="fa-solid fa-ellipsis" onclick='removePost(${index})'></i>

                    </div>

                </div>

                <p>${post.content}</p>
                <img src="image/crpost.jpeg">

                <div class="info">

                    <div class="emoji-img">
                        <img src="image/like.png">
                        <img src="image/haha.png">
                        <img src="image/heart.png">
                        <p>Bạn, Kaká và 8,9k người khác</p>
                    </div>

                    <div class="comment">
                        <p>234 Comments</p>
                        <p>1.5k Shares</p>
                    </div>
                </div>

                <hr>

                <div class="like">
                    <div class="like-icon">
                        <i class="fa-solid fa-thumbs-up activi"></i>
                        <p>Thích</p>
                    </div>

                    <div class="like-icon">
                        <i class="fa-solid fa-comment"></i>
                        <p>Bình luận</p>
                    </div>

                    <div class="like-icon">
                        <i class="fa-solid fa-share"></i>
                        <p>Chia sẻ</p>
                    </div>
                </div>

                <hr>

                <div class="comment-warpper">
                    <img src="./image/avataruser.jpg">
                    <div class="circle"></div>

                    <div class="comment-search">
                        <input type="text" placeholder="Viết bình luận ...">
                        <i class="fa-regular fa-face-grin-squint-tears"></i>
                        <i class="fa-regular fa-face-smile"></i>
                        <i class="fa-solid fa-camera"></i>

                    </div>
                </div>
            </div>
        `
    });
    document.querySelector('#posts').innerHTML = htmls.join("");
}
init();
renderPost();

function handleFocusCreatePost() {
    document.getElementById('phCreatePost').style.display = "none";
}



var modal = document.getElementById("modal");

function handleBtnModalClose() {
    modal.style.display = "none";
}

function findMaxId() {
    let max = 0;
    for (let post of posts) {
        if (post.id > max) {
            max = post.id;
        }
    }

    return max;
}


function handleBtnCreatePost() {
    let content = document.getElementById('input-content').innerText;
    let avatar = document.getElementById('img-clone').src;
    let name = document.getElementById('info-post-content').innerText;
    let id = findMaxId() + 1;
    let post = new Post(id, avatar, name, content);
    posts.unshift(post);

    localStorage.setItem(post_key, JSON.stringify(posts));
    handleBtnModalClose();
    
    renderPost();
}

function removePost(index) {

    let confirm = window.confirm('Are you sure to remove this post?');
    if (confirm) {
        posts.splice(index, 1);
        localStorage.setItem(post_key, JSON.stringify(posts));
        renderPost();
    }
}

window.onclick = function (evt) {
    if (evt.target == modal) {
        modal.style.display = "none";
    }
}

function handleBtnModalOpen() {
    modal.style.display = "flex";
}

function openModal(modal) {
    modal.style.display = "flex";
}

function main() {
    init();
    renderPost();
}

main();