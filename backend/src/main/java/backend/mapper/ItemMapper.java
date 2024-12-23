package backend.mapper;


import org.springframework.stereotype.Component;

import backend.model.Item;
import backend.model.Users;
import backend.request.ItemRequest;

@Component
public class ItemMapper {
    
    public static Item toItem (ItemRequest itemRequest, Users user) throws Exception
    {
        Item item = Item.builder()
           .name(itemRequest.getName())
           .type(itemRequest.getType())
           .cost(itemRequest.getCost())
           .color(itemRequest.getColor())
           .description(itemRequest.getDescription())
           .base64Image(itemRequest.getBase64Image())
           .owner(user)
           .build();

           System.out.println("Owner is "+item.getOwner());
        return item;
    }
}
