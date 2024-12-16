package backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Item;
import backend.repository.ItemRepository;


@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public void saveItem(Item item) throws Exception{
        itemRepository.save(item);
    }

    public Item getItemById(Long id)
    {
        return itemRepository.findById(id).orElse(null);
    }
}
