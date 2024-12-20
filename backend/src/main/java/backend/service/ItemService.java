package backend.service;

import java.util.List;

import backend.model.Item;


public interface ItemService {

    void saveItem(Item item);

    Item getItemById(Long id);

    List<Item> allItems();

    List<Item> itemsByColor(String color);

    List<Item> itemsByType(String type);
}
