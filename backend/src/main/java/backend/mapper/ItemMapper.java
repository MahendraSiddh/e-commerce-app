package backend.mapper;


import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import backend.model.Item;
import backend.request.ItemData;

@Component
public class ItemMapper {
    
    public static Item toItem (MultipartFile itemImage, ItemData itemData) throws Exception
    {
        Item item = new Item();
        item.setName(itemData.getName());
        item.setType(itemData.getType());
        item.setCost(itemData.getCost());
        item.setColor(itemData.getColor());
        item.setDescription(itemData.getDescription());

        item.setData(itemImage.getBytes());

        return item;
    }
}
