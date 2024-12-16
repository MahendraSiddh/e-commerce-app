package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.mapper.ItemMapper;
import backend.model.Item;
import backend.request.ItemData;
import backend.service.ItemService;

@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/item")
    public ResponseEntity<Object> saveItem(@RequestPart("itemImage") MultipartFile itemImage,
                                            @RequestPart("itemData") ItemData itemData){
        
        try {
            Item item = ItemMapper.toItem(itemImage, itemData);

            itemService.saveItem(item);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {

            System.err.println(e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("item/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable("id") Long id)
    {
        Item item = itemService.getItemById(id);

        if(item==null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(item,HttpStatus.OK);
        }
    }
}
