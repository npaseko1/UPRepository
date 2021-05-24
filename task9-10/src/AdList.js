"use strict"
class AdList {
    _items = [];
    constructor(items) {
        this._items = items;
    }


    static validateAd(item) {
        if (!item) {
            return false;
        }
        if (item.id === "" || typeof item.id !== "string")
            return false;
        if (item.description === "" || typeof item.description !== "string" || item.description.length > 200)
            return false;
        if (item.link === "" || typeof item.link !== "string")
            return false;
        if (item.discount === "" || typeof item.discount !== "string")
            return false;
        if (item.vendor === "" || typeof item.vendor !== "string")
            return false;
        if (item.createdAt instanceof Date || item.createdAt !== "")
            return true;
        if (item.validUntil instanceof Date || item.validUntil !== "")
            return true;
        if (item.hashTags.length == 0) {
            return true;
        } else
            for (let i = 0; i < item.hashTags.length; i++) {
                if (!(item.hashTags[i].substring(0, 1) === '#')) {
                    return false;
                }
            }
        return true;
    }


    vendorName() {
        let name = [];
        this._items.forEach(function (item) {
            if (!item.isDelete) {
                name.push(item.vendor);
            }
        });
        let unique = AdList.unique(name);
        return unique;
    }


    get(id) {
        if (typeof id == "string" && id.valueOf() > 0) {
            return this._items.find((item) => item.id == id);
        }
        return false;
    }


    getPage(skip, top, filterConfig) {
        let result;
        if (!filterConfig) {
            result = this._items;
        }

        if (filterConfig) {

            if (filterConfig.vendor) {
                result = this._items.filter(function (item) {
                        return item.vendor.toLowerCase().indexOf(filterConfig.vendor.toLowerCase()) + 1;
                    }
                );
            }

            if (filterConfig.createdAt) {
                result = this._items.filter(function (item) {
                    return item.createdAt >= filterConfig.createdAt;
                });
            }

            if (filterConfig.validUntil) {
                result = this._items.filter(function (item) {
                    return item.validUntil.getTime() <= filterConfig.validUntil.getTime();
                });
            }


            if (filterConfig.hashTagSearch && filterConfig.hashTagSearch.length!=0) {
                result = this._items.filter(function (post) {
                    if(typeof post.hashTags!== "undefined") {
                        return filterConfig.hashTagSearch.every(function (tag) {
                            return post.hashTags.includes(tag);
                        });
                    }

                });
            }
        }
        return result.sort((function(a, b) {
                return a.createdAt-b.createdAt
            }
        )).slice(skip, skip+top);
    }


    add(item) {
        const date = new Date();
        item.id=+date;
        item.createdAt = new Date();
        if (AdList.validateAd(item)) {
            this._items.push(item);
            return true;
        }
        return false;
    }


    edit(id, adItem) {
        let num = this._items.findIndex(item => item.id === id);

        if (adItem.description) {
            this._items[num].description = adItem.description;
        }
        if (adItem.link) {
            this._items[num].link = adItem.link;
        }
        if (adItem.discount) {
            this._items[num].discount = adItem.discount;
        }
        if (adItem.validUntil) {
            this._items[num].validUntil = adItem.validUntil;
        }
        if (adItem.hashTags) {
            this._items[num].hashTags = adItem.hashTags;
        }
        if (AdList.validateAd(this._items[num]) === false){
            return false;
        }
        else
            return true;
    }


    remove(id) {
        let tmp = this._items.slice();
        tmp.splice(tmp.findIndex(item => item.id === id), 1);
        this._items=tmp.slice();
        return true;

    }


    addAll(mass) {
        let result = [];
        for (let item of this._items) {
            if (AdList.validateAd(item)) {
                mass.push(item);
            }
            else {
                result.push(item);
            }
        }
        return result;
    }


    clear(item){
        item = [];
        return item;
    }
}


let listA=[
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
    },
    {
        id: '4',
        description: 'Bag number 4, vintage, Italian quality',
        createdAt: new Date('2021-03-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-10-17T23:00:00'),
        discount:'20%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '5',
        description: 'Bag number 5, vintage, Italian quality',
        createdAt: new Date('2021-03-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-10-17T23:00:00'),
        discount:'30%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '6',
        description: 'Bag number 6, vintage, Italian quality',
        createdAt: new Date('2021-03-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-10-17T23:00:00'),
        discount:'10%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '7',
        description: 'Bag number 7, vintage, Italian quality',
        createdAt: new Date('2021-03-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: '',
        validUntil:new Date('2021-10-17T23:00:00'),
        discount:'20%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '8',
        description: 'Bag number 8, vintage, Italian quality',
        createdAt: new Date('2021-03-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-10-17T23:00:00'),
        discount:'10%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '9',
        description: 'Bag number 9, vintage, Italian quality',
        createdAt: new Date('2021-03-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-10-17T23:00:00'),
        discount:'15%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '10',
        description: 'Bag number 10, vintage, Italian quality',
        createdAt: new Date('2021-03-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-10-17T23:00:00'),
        discount:'30%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '11',
        description: 'Bag number 11, vintage, Italian quality',
        createdAt: new Date('2021-03-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-10-17T23:00:00'),
        discount:'10%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '12',
        description: 'Bag number 12, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'20%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '13',
        description: 'Bag number 13, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'30%',
        hashTags: []
    },
    {
        id: '14',
        description: 'Bag number 14, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'40%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '15',
        description: 'Bag number 15, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'20%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '16',
        description: 'Bag number 16, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'10%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '17',
        description: 'Bag number 17, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'20%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '18',
        description: 'Bag number 18, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'10%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '19',
        description: 'Bag number 19, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'30%',
        hashTags: ['#bag', '#Dior']
    },
    {
        id: '20',
        description: 'Bag number 20, vintage, Italian quality',
        createdAt: new Date('2021-01-17T23:00:00'),
        link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
        vendor: 'Paseko Nadia',
        validUntil:new Date('2021-11-17T23:00:00'),
        discount:'15%',
        hashTags: ['#bag', '#Dior']
    }
];
let adCollection = new AdList(listA);
let listB = [];
console.log(adCollection.addAll(listB));
console.log(adCollection.clear(listB));
console.log(adCollection.validateAd(1));//false
console.log(adCollection.get('5'));
console.log(adCollection.get('22'));//не найдет пост с таким id, потому что его нет
console.log(adCollection.getPage(0, 10));
console.log(adCollection.getPage(10,10,));
console.log(adCollection.getPage(0, 10, { vendor: 'Paseko Nadia'}));
console.log(adCollection.edit('5', { link: 'https://www.dior.com/en_int/products/couture-M1286ZRFQ_M928-dior-book-tote-blue-d-stripes-embroidery' } ));
console.log(adCollection.add({
    id: '1',
    description: 'Bag number 1, vintage, Italian quality',
    createdAt: new Date('2021-03-17T23:00:00'),
    link: '',
    vendor: '',
    validUntil:new Date('2021-10-17T23:00:00'),
    discount:'',
    hashTags: ['']

})); //вернет false, потому что в объявлении нет имени вендора
console.log(adCollection.add({
    id: '1',
    description: 'Bag number 1, vintage, Italian quality',
    createdAt: new Date('2021-03-17T23:00:00'),
    link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
    vendor: 'Paseko Nadia',
    validUntil:new Date('2021-10-17T23:00:00'),
    discount:'20%',
    hashTags: ['#bag', '#Dior']

})); //вернет true, объявление добавилось
console.log(adCollection.get('7'));//вернет объявление
console.log(adCollection.remove('7'));//удаляется объявление, вернет true
console.log(adCollection.get('7'));//не вернет, потому что удалили
console.log(adCollection.get('11'));
console.log(adCollection.add({
    id: '7',
    description: 'Bag number 7, vintage, Italian quality',
    createdAt: new Date('2021-03-17T23:00:00'),
    link: 'https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery',
    vendor: 'Paseko Nadia',
    validUntil:new Date('2021-10-17T23:00:00'),
    discount:'20%',
    hashTags: ['']

}));
console.log(adCollection.getPage(0, 25));