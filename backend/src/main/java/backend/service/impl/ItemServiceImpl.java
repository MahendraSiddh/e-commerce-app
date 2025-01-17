package backend.service.impl;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import backend.model.Item;
import backend.repository.ItemRepository;
import backend.service.ItemService;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;


    @Override
    public void saveItem(Item item) {
        itemRepository.save(item);
    }

    @Override
    public Item getItemById(UUID id) {
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
    @SuppressWarnings("unchecked")
    @Override
    public Page<Item> getItems(int page, int size) {
        String redisKey = "item:list" + ":" + page + ":" + size;

        // Attempt to fetch from Redis
        List<Item> cachedItems = (List<Item>) redisTemplate.opsForValue().get(redisKey);
        if (cachedItems != null) {
            return new PageImpl<>(cachedItems, PageRequest.of(page, size), cachedItems.size());
        }

        // Fallback to MySQL
        Pageable pageable = PageRequest.of(page, size);
        Page<Item> itemsPage = itemRepository.findAll(pageable);

        // Cache the results in Redis
        redisTemplate.opsForValue().set(redisKey, itemsPage.getContent(), Duration.ofMinutes(10));

        return itemsPage;
    }
    @SuppressWarnings("unchecked")
    @Override
    public Page<Item> getItemsByType( int page, int size,String type) {
        String redisKey = "item:list" + ":" + type + ":" + page + ":" + size;

        // Check Redis cache
        List<Item> cachedItems = (List<Item>) redisTemplate.opsForValue().get(redisKey);
        if (cachedItems != null) {
            return new PageImpl<>(cachedItems, PageRequest.of(page, size), cachedItems.size());
        }

        // Fetch from MySQL
        Pageable pageable = PageRequest.of(page, size);
        Page<Item> itemsPage = itemRepository.findByType(type, pageable);

        // Cache the results
        redisTemplate.opsForValue().set(redisKey, itemsPage.getContent(), Duration.ofMinutes(10));

        return itemsPage;
    }
}
