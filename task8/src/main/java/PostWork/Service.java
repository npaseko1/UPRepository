package PostWork;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

public class Service {
    private List<Post> PList = new ArrayList<Post>(Arrays.asList(
            new Post(1,
                    "Bag number 1, vintage, Italian quality",
                    "2021-03-17T23:00:00",
                    "2021-10-17T23:00:00",
                    "Paseko Nadia",
                    "https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery",
                    "30%",
                    new ArrayList<String>(Arrays.asList("#bag", "#Dior")),

            new Post(2,
                    "Bag number 2, vintage, Italian quality",
                    "2021-03-17T23:00:00",
                    "2021-10-17T23:00:00",
                    "Paseko Nadia",
                    "https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery",
                    "20%",
                    new ArrayList<String>(Arrays.asList("#bag")),

            new Post(3,
                    "Bag number 3, vintage, Italian quality",
                    "2021-03-17T23:00:00",
                    "2021-10-17T23:00:00",
                    "Paseko Nadia",
                    "https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery",
                    "10%",
                    new ArrayList<String>(Arrays.asList("#bag", "#Dior")),

            new Post(4,
                    "Bag number 4, vintage, Italian quality",
                    "2021-03-17T23:00:00",
                    "2021-10-17T23:00:00",
                    "Paseko Nadia",
                    "https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery",
                    "15%",
                     new ArrayList<String>(Arrays.asList("#bag", "#Dior")),

            new Post(5,
                    "Bag number 5, vintage, Italian quality",
                    "2021-03-17T23:00:00",
                    "2021-10-17T23:00:00",
                    "Paseko Nadia",
                    "https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery",
                    "10%",
                    new ArrayList<String>(Arrays.asList("#bag", "#Dior")),

            new Post(12,
                    "Bag number 12, vintage, Italian quality",
                    "2021-03-17T23:00:00",
                    "2021-10-17T23:00:00",
                    "Paseko Nadia",
                    "https://www.dior.com/en_int/products/couture-M0565OJAP_M885-medium-lady-d-lite-bag-yellow-multicolor-dior-paisley-embroidery",
                    "15%",
                    new ArrayList<String>(Arrays.asList("#bag", "#Dior")));


    public static Service INSTANCE = null;

    public static Service getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new Service();
        }
        return INSTANCE;
    }


    public List<Post> getPage(int skip, int top, Map<String, String> filterConfig) {
        List<Post> filteredPosts = new ArrayList<Post>();

        for (Map.Entry pair : filterConfig.entrySet()) {
            if (pair.getKey().equals("vendor")) {
                PList.stream()
                        .filter(post -> post.getVendor().toLowerCase().contains(pair.getValue().toString().toLowerCase()))
                        .forEach(filteredPosts::add);

            } else if (pair.getKey().equals("creationDate")) {
                PList.stream()
                        .filter(post -> post.getCreatedAt().equals(pair.getValue()))
                        .forEach(filteredPosts::add);
            }
        }
        if (filterConfig.size() == 0) {
            filteredPosts = new ArrayList<Post>(PList);
        }
        if (top > filteredPosts.size()) {
            top = filteredPosts.size();
        }
        if (skip >= filteredPosts.size()) {
            skip = 0;
        }
        if (skip + top > filteredPosts.size()) {
            return filteredPosts.subList(skip, filteredPosts.size());
        } else {
            return filteredPosts.subList(skip, skip + top);
        }

    }

    public Post getPost(int id) {
        for (Post post : PList) {
            if (post.getId() == id) {
                return post;
            }
        }
        return null;
    }

    public boolean validatePost(Post post) {
        for (Post posts : PList) {
            if (post.getId() == post.getId()) {
                return false;
            }
        }
        if (post.getDescription() == null || post.getDescription().length() > 200)
            return false;

        if (post.getVendor() == null)
            return false;

        if (post.getCreatedAt() == null)
            return false;

        if (post.getValidUntil() == null)
            return false;

        if (post.getLink() == null)
            return false;

        if (post.getDiscount() == null)
            return false;

        return true;
    }

    public boolean addPost(Post post) {
        if (validatePost(post)) {
            PList.add(post);
            return true;
        } else
            return false;
    }

    public boolean editPost(int id, Post filterConfig) {
        Post post = getPost(id);
        if (post == null) {
            return false;
        }
        if (filterConfig.getDescription() != null && filterConfig.getDescription().length() <= 200) {
            post.setDescription(filterConfig.getDescription());
        }
        if (filterConfig.getVendor() != null) {
            post.setVendor(filterConfig.getVendor());
        }
        if (filterConfig.getLink() != null) {
            post.setLink(filterConfig.getLink());
        }
        if (filterConfig.getDiscount() != null) {
            post.setDiscount(filterConfig.getDiscount());
        }
        if (filterConfig.getHashTags() != null) {
            post.setHashTags(filterConfig.getHashTags());
        }
        if (filterConfig.getCreatedAt() != null) {
            post.setCreatedAt(filterConfig.getCreatedAt());
        }
        if (filterConfig.getValidUntil() != null) {
            post.setValidUntil(filterConfig.getValidUntil());
        }
        return true;
    }

    public boolean removePost(int id) {
        Post post = getPost(id);
        if (post != null) {
            PList.remove(post);
            return true;
        } else {
            return false;
        }
    }

    public String toJsonString(List<Post> list) {
        if (list.size() > 0) {
            Gson gson = new Gson();
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Post post : list) {
                sb.append(gson.toJson(post)).append(",");
            }
            sb.append("]");
            return sb.toString().replace(",]", "]");
        }
        return "";
    }

}