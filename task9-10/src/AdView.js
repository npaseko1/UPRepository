class AdView {

    static createPost(item, username) {
        let post = document.createElement('article');
        post.className = 'A-class';
        post.setAttribute('id', item.id);

        let editButtonDiv = document.createElement('div');
        if(username===item.vendor) {
            let editButton = document.createElement('button');
            editButton.className = 'edit_button';
            editButton.textContent = 'Edit';
            editButton.onclick = function () {
                AdView.openEditWindow(post.id);
            };

            let delButton = document.createElement('button');
            delButton.className = 'delete_button';
            delButton.textContent = 'Delete';
            delButton.onclick = function () {
                controller.Delete(post.id);
            };
            editButtonDiv.appendChild(editButton);
            editButtonDiv.appendChild(delButton);
        }
        else  {editButtonDiv.innerHTML=`<p>  </p>`;}
        post.appendChild(editButtonDiv);

        let userN=document.createElement('p');
        userN.className = 'name';
        let userName=document.createElement('b');
        userName.textContent = item.vendor;
        userN.appendChild(userName);
        post.appendChild(userN);

        let date=document.createElement('p');
        date.textContent = item.createdAt;
        post.appendChild(date);

        let line=document.createElement('hr');
        post.appendChild(line);


        let description=document.createElement('p');
        description.textContent = item.description;
        post.appendChild(description);

        if(item.hashTags.length!=0) {
            let Tag="";
            for (let i = 0; i < item.hashTags.length; i++) {
                Tag = Tag + item.hashTags[i] + " ";
            }
            let tags = document.createElement('p');
            tags.className = 'Tags';
            tags.textContent = Tag;
            post.appendChild(tags);
        }
        let page = document.getElementById('posts');
        page.appendChild(post);
        return post;
    }


    static addVendor(AdList) {
        let vendor=AdList.vendorName();
        console.log(vendor);
        let element = document.getElementById("searchName");
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
        let opt = document.createElement("option");
        opt.textContent="name";
        opt.value ="name";
        opt.selected="selected";
        element.appendChild(opt);
        for(let i=0; i<vendor.length; i++) {
            let newOption = new Option(vendor[i], vendor[i]);
            element.options[element.options.length]=newOption;
        }

    }

    static addPost(item, AdList) {
        if(AdList.add(item)) {
        }
        else {
            alert("BAD!");
        }

    }


    static removePost(id) {
        let item = document.getElementById(id);
        let main = document.getElementById('items');
        if (item !== null) {
            main.removeChild(item);
        }
    }

    static replacePost(item, userName) {
        debugger;
        let page = document.getElementById('items');
        let node = document.getElementById(item.id);
        if (node !== null) {
            page.replaceChild(AdView.createPost(item, userName), node);
        }
    }

    static setPost(item, username) {
        document.getElementById('items').appendChild(this.createPost(item, username));
    }

    static editPost (id, post, AdList) {
        if(AdList.edit(id, post)) {
            return true;
        }
        return false;
    }

    static clear() {
        let arr = document.getElementById('items');
        while (arr.firstChild) {
            arr.removeChild(arr.firstChild);
        }
    }

    static getPage(skip, top, AdList, username, filterConfig) {
        AdView.clear();
        let items = AdList.getPage(skip, top, filterConfig);
        if(filterConfig) {

            if (filterConfig.hashTagSearch) {
                let tags="";
                for(let i=0; i<filterConfig.hashTagSearch.length; i++) {
                    tags=tags+filterConfig.hashTagSearch[i]+" ";
                }
                document.getElementById('searchTags').placeholder = tags;
            }
            if (filterConfig.dateDownLim!="") {
                document.getElementById('dateDownLim').placeholder = filterConfig.dateDownLim;
            }
            if (filterConfig.dateUpLim!="") {
                document.getElementById('dateUpLim').placeholder = filterConfig.dateUpLim;
            }
        }
        return items;
    }

    static showLoadMoreButton() {
        document.getElementsByClassName('loadMore')[0].setAttribute("style", 'display: inline');
        document.getElementsByClassName('loadMore')[0].addEventListener('click', controller.loadMore);
    }


    static openAddWindow() {

        document.getElementsByClassName('main')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('addForm')[0].setAttribute('style', 'display: block');

    }
    static closeAddWindow() {
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('addForm')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: block');
    }

    static openLogInWindow() {
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('logInForm')[0].setAttribute('style', 'display: block');

    }
    static closeLogInWindow() {
        document.getElementsByClassName('logInForm')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: block');

    }
    static openEditWindow(id) {
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('editForm')[0].setAttribute('style', 'display: block');
        controller.setEditForm(id);
        document.getElementById('edit_button').addEventListener('click', (event) => {
            event.preventDefault();
            controller.edit(id, controller.getEditForm());
        });
    }
    static closeEditWindow() {
        document.getElementsByClassName('editForm')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('forms')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('main')[0].setAttribute('style', 'display: block');

    }
}
  AdList = new AdList([
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

 A = new AdView();
console.log(A.addPost({
    id: '1',
    description: 'Bag number 1, vintage, Italian quality',
    createdAt: new Date('2021-03-17T23:00:00'),
    link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
    vendor: 'Paseko Nadia',
    validUntil:new Date('2021-10-17T23:00:00'),
    discount:'20%',
    hashTags: ['#bag', '#Dior']

 }, AdList)); //вернет true, пост добавился
console.log(A.getPage(0, 10, AdList, "Ivan Ivanov"));
console.log(A.editPost('2', { description: 'This post has been changed!'}, AdList ) );
console.log(A.getPage(0, 10, AdList, "Ivan Ivanov", {vendor:'Paseko Nadia'}));
console.log(A.getPage(0, 10, AdList, "Ivan Ivanov", {hashTagSearch:["#Dior"]}));
console.log(A.addVendor(AdList));