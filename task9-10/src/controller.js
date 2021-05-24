let controller = (function () {
    let user="";
    let adList;
    let lastFilter;
    let pageNum=1;
    return {
        restore() {
            let user_posts = JSON.parse(localStorage.getItem('user_posts'));
            if (user_posts === null) {
                adList = new AdList ( [
                    {
                        id: '1',
                        description: 'Bag number 1, vintage, Italian quality',
                        createdAt: new Date('2021-03-17T23:00:00'),
                        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
                        vendor: 'Paseko Nadia',
                        validUntil:new Date('2021-10-17T23:00:00'),
                        discount:'20%',
                        hashTags: ['#bag', '#Dior']
                    },
                    {
                        id: '2',
                        description: 'Bag number 2, vintage, Italian quality',
                        createdAt: new Date('2021-03-17T23:00:00'),
                        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
                        vendor: 'Paseko Nadia',
                        validUntil:new Date('2021-10-17T23:00:00'),
                        discount:'30%',
                        hashTags: ['#bag', '#Dior']
                    },
                    {
                        id: '3',
                        description: 'Bag number 3, vintage, Italian quality',
                        createdAt: new Date('2021-03-17T23:00:00'),
                        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
                        vendor: 'Paseko Nadia',
                        validUntil:new Date('2021-10-17T23:00:00'),
                        rating:'15%',
                        hashTags: ['#bag', '#Dior']
                    }
                ]);
            } else {
                user_posts.forEach(item => item.createdAt = new Date(item.createdAt));
                adList = new AdList(user_posts);
            }

            user = localStorage.getItem('user');
            if(user == null) {
                user="";
            }
            console.log(user);
            controller.save();
        },
        save() {
            localStorage.removeItem('user_posts');
            localStorage.setItem('user_posts', JSON.stringify(adList.getAll()));
            localStorage.setItem('user', user);
        },

        openPage() {

            controller.restore();
            AdView.addVendor(adList);
            if (user== ""){
                controller.ifGuest();
            } else {
                controller.showUser();
            }
            document.getElementsByClassName('search_button')[0].addEventListener('click', (event) => {
                event.preventDefault();
                controller.showPosts();
            });
        },

        ifGuest(){
            controller.logOut();
            controller.showPosts();
        },

        showUser(){
            controller.showPosts();
            document.getElementsByClassName('hSp1')[0].innerHTML = ` Hello, <br> ${user}!`;
            document.getElementById('add-post').setAttribute('style', 'display: inline');
            document.getElementById('add-post').addEventListener('click', controller.addPost);
            document.getElementsByClassName('log_button')[0].setAttribute("style", "display:none");
            document.getElementsByClassName('logout_button')[0].setAttribute("style", "display:inline");
            document.getElementById('logout_button').addEventListener('click', controller.logOut);
        },
        logIn() {
            AdView.openLogInWindow();
            document.getElementById('log_form_button').addEventListener('click', (event) => {
                event.preventDefault();
                let login = controller.getLogin();
                if (login !== '') {
                    user = login;
                    AdView.closeLogInWindow();
                    controller.showUser();
                }

            });
        },

        logOut() {
            user = "";
            controller.showPosts();
            document.getElementsByClassName('hSp1')[0].innerHTML = ` Hello <br> log in, please!`;
            document.getElementById('add-post').setAttribute('style', 'display: none');
            document.getElementsByClassName('log_button')[0].setAttribute("style", "display:inline");
            document.getElementsByClassName('logout_button')[0].setAttribute("style", "display:none");
            document.getElementsByClassName('log_button')[0].addEventListener('click', controller.logIn);
            controller.save();
        },

        getPost(id){
            return adList.get(id);
        },


        addPost() {
            document.getElementById("Author").textContent=user;
            AdView.openAddWindow();
            document.getElementById('ok_button_add').addEventListener('click', controller.newPost);
        },

        newPost() {
            debugger;
            AdView.closeAddWindow();
            let item = controller.getPostForm();
            item.vendor = user;
            AdView.addPost(item, adList);
            controller.save();
            AdView.addVendor(adList);
            controller.showPosts();
        },

        edit(id, item) {
            debugger;
            AdView.closeEditWindow();
            item.id=id;
            item.vendor=user;
            item.createdAt = new Date(controller.getPost(id).createdAt);
            if (AdView.editPost(id, item, adList)) {
                controller.save();
                AdView.replacePost(item, user);
            }
        },

        setEditForm(id) {
            debugger;
            let item = adList.get(id);
            let editForm = document.getElementsByClassName('editForm')[0];
            editForm.elements.link.value = item.link;
            editForm.elements.description.value = item.description;
            let tags='';
            item.hashTags.forEach(item => tags=tags+ item + " ");
            editForm.elements.tag.value = tags;
        },

        getEditForm() {
            debugger;
            let item = {};
            let editForm = document.getElementsByClassName('editForm')[0];
            item.link = editForm.elements.link.value;
            item.description = editForm.elements.description.value;
            let tags = editForm.elements.tag.value;
            if(tags != "") {
                item.hashTags = tags.split( );
            }
            else {
                item.hashTags = [];
            }

            editForm.elements.description.value = "";
            editForm.elements.link.value = "";
            editForm.elements.tag.value = "";
            return item;
        },
        getPostForm() {
            let item = {};
            let AddForm = document.getElementById('addForm');

            if(AddForm.link.value!=='') {
                item.link = AddForm.link.value;
            }
            else {
                item.link = "";
            }
            item.description = AddForm.description.value;
            let Atags = AddForm.tag.value;
            if(Atags != "") {
                let tagsArr = Atags.split(' ');
                item.hashTags = tagsArr;
            }
            else {
                item.hashTags=[];
            }
            AddForm.elements.description.value = "";
            AddForm.elements.link.value = "";
            AddForm.elements.tag.value = "";
            return item;
        },
        Delete(id) {
            let result = confirm("Are you sure?");
            if(result===true) {
                AdView.removePost(id);
                adList.remove(id);
                controller.save();
                AdView.addVendor(AdList);
            }

        },

        showPosts(){
            debugger;
            pageNum=1;
            let filterConfig = controller.getFilters();
            let items = AdView.getPage(0, 10, adList, user, filterConfig);
            lastFilter=filterConfig;
            debugger;
            for (let i = items.length-1; i >=0 ; i--) {
                AdView.setPost(items[i], user);
            }
            controller.save();
            if (adList.length() > 10 && adList.getPage(10, 1, filterConfig).length == 1) {
                AdView.showLoadMoreButton();
            }
            else {
                document.getElementsByClassName('loadMore')[0].setAttribute("style", 'display: none');
            }
        },

        getLogin() {
            return document.getElementById('log_form_win').login.value;
        },

        getFilters() {
            let searchForm = document.getElementsByClassName('searchForm')[0];
            let vendor = searchForm.searchVendor;
            let selectedOption = vendor.options[vendor.selectedIndex].value;
            let tags = searchForm.elements.searchTags.value;
            let hash_tags=[];
            if(tags == "") {
                hash_tags=false;
            }
            else {
                hash_tags=tags.split( );
            }
            let dateDown = searchForm.elements.searchFrom.value;
            let dateDownLim;
            if(dateDown!= "") {
                dateDownLim = dateDown;
            }
            else {
                dateDownLim = "";
            }
            let dateUpLim;
            let dateUp = searchForm.elements.searchTo.value;
            if(dateUp!= "") {
                dateUpLim = dateUp;
            }
            else {
                dateUpLim="";
            }

            let filterConfig = {
                vendor: selectedOption,
                hashTagSearch: hash_tags,
                dateDownLim: dateDownLim,
                dateUpLim: dateUpLim,
            };
            return filterConfig;
        },

        loadMore() {
            debugger;
            document.getElementsByClassName('loadMore')[0].setAttribute("style",'display:none');
            let items = adList.getPage(pageNum * 10, 10, lastFilter);
            for(let i=items.length-1; i>=0; i--) {
                AdView.setPost(items[i], user);
            }
            pageNum++;
            if(adList.length() > pageNum*10) {
                AdView.showLoadMoreButton();
            }
        },
    }

}());
window.addEventListener('load', () => {
    controller.openPage();
});