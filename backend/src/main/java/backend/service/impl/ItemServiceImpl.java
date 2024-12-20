package backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Item;
import backend.repository.ItemRepository;
import backend.service.ItemService;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;
    @Override
    public void saveItem(Item item) {
        itemRepository.save(item);
    }

    @Override
    public Item getItemById(Long id) {
       Item item = itemRepository.findById(id).orElse(null);

       return item;
    }
    
    @Override
    public List<Item> allItems()
    {
        return itemRepository.findAll();
    }

    @Override
    public List<Item> itemsByColor(String color)
    {
        List<Item> items = allItems();

        List<Item> resItems = new ArrayList<>();
        for(Item item:items){
            if(item.getColor()==color)
            {
                resItems.add(item);
            }
        }
        return resItems;
    }

    @Override
    public List<Item> itemsByType(String type)
    {
        List<Item> items = allItems();

        List<Item> resItems = new ArrayList<>();

        for(Item item:items)
        {
            if(item.getType()==type)
            {
                resItems.add(item);
            }
        }
        return resItems;
    }
}
