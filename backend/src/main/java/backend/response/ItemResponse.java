package backend.response;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemResponse {

    private String name;
    private Long cost;
    private String type;
    private String color;
    private String description;

    @Lob
    private String base64Image;
}
