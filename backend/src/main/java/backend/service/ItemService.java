package backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;

import backend.model.Item;


public interface ItemService {

    void saveItem(Item item);

    Item getItemById(UUID id);

    List<Item> allItems();

    List<Item> itemsByColor(String color);

    List<Item> itemsByType(String type);

    Page<Item> getItems(int page, int size);

    Page<Item> getItemsByType(int page,int size, String type);
}
