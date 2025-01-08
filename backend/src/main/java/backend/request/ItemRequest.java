package backend.request;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class ItemRequest {
    private String name;
    private String ownerEmail;
    private int cost;
    private String type;
    private String color;
    private String description;

    @Lob
    private String base64Image;
    
}
