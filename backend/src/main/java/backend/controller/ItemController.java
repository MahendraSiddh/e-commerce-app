package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.mapper.ItemMapper;
import backend.model.Item;
import backend.request.ItemRequest;
import backend.service.ItemService;

@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/itemupload")
    public ResponseEntity<Object> saveItem(@RequestBody ItemRequest itemRequest) {
        
        System.out.println("Item upload request ");
        try{
            Item item = ItemMapper.toItem(itemRequest);

            itemService.saveItem(item);
        }catch(Exception e)
        {
            System.err.println(e);
        }
        return new ResponseEntity<>(HttpStatus.OK);
     }
    @GetMapping("/items")
    public ResponseEntity<List<Item> > getAllItems()
    {
        List<Item> items = itemService.allItems();

        System.out.println("No of items are: "+items.size());
        return new ResponseEntity<List<Item> >(items,HttpStatus.OK);
    }
    
}
