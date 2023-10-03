class Contact {
    constructor(id, name, avatar, mobile, email) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.mobile = mobile;
        this.email = email;
    }
}
class Comment{
    constructor(id, content){
        this.id = id;
        this.content = content;s
    }

}
class Post{
    constructor(id, username, content, imagePost){
        this.id = id;
        this.username = username;
        this.content = content;
        this.imagePost = imagePost;
        this.comments = [];
    }
}
const post_key = "data-post";
const avatar_url = 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar';
var posts = [];

function init(){
    if(localStorage.getItem(post_key) == null){
        posts = [
            new Post(1, 'ngan98', 'Hom nay toi di bar', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar'),
            new Post(2, 'ngan20', 'Hom nay toi di bar', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar'),
            new Post(3, 'ngan99', 'Hom nay toi di bar', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar'),
        ];
        localStorage.getItem(post_key, JSON.stringify(posts));
    }
    else{
        posts = JSON.parse(localStorage.getItem(post_key));
    }
}