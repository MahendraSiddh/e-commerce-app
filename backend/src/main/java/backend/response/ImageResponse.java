package backend.response;

import backend.model.Image;

public class ImageResponse {

    private Long id;
    private String name;
    private String title;
    private String description;
    private String type;
    private byte[] data;

    public ImageResponse(Image image) {
        this.id = image.getId();
        this.name = image.getName();
        this.title = image.getTitle();
        this.description = image.getDescription();
        this.type = image.getType();
        this.data = image.getData();
    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
