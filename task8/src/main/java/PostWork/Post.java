package PostWork;

import org.json.simple.JSONObject;

import java.util.List;

public class Post {
    private int id;
    private String description;
    private String createdAt;
    private String validUntil;
    private String vendor;
    private String link;
    private String discount;
    private List<String> hashTags;


    public Post(int id, String description, String Date, String validUntil, String vendor, String link,String discount, List<String> hashTags) {
        this.id = id;
        this.description = description;
        this.createdAt = Date;
        this.validUntil = validUntil;
        this.vendor = vendor;
        this.link = link;
        this.discount = discount;
        this.hashTags = hashTags;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(String validUntil) {
        this.validUntil = validUntil;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }


    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }


    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags;
    }
    
    public String printPost() {
        String str = "id " + getId() + "description " + getDescription();
        return str;
    }

    @Override
    public String toString() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("description", description);
        json.put("Date", createdAt);
        json.put("validUntil", validUntil);
        json.put("vendor", vendor);
        json.put("link", link);
        json.put("discount", discount);
        json.put("hashTags", hashTags.toString());
        return json.toString();
    }
}