package backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.mapper.ItemMapper;
import backend.model.Item;
import backend.model.Users;
import backend.request.ItemRequest;
import backend.service.ItemService;
import backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private UserService userService;

    @PostMapping("/itemupload")
    public ResponseEntity<Object> saveItem(@RequestBody ItemRequest itemRequest) {
        
        System.out.println("Item upload request ");
        try{
            Users seller = userService.findByEmail(itemRequest.getOwnerEmail());
            Item item = ItemMapper.toItem(itemRequest,seller);

            userService.addIem(item,itemRequest.getOwnerEmail());
            itemService.saveItem(item);
            System.out.println("item uploaded");
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e)
        {
            System.err.println(e);
            System.out.println("failed to upload");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
     }
    @GetMapping("/items")
    public ResponseEntity<List<Item> > getAllItems()
    {
        List<Item> items = itemService.allItems();

        System.out.println("No of items are: "+items.size());
        return new ResponseEntity<List<Item> >(items,HttpStatus.OK);
    }

    @PostMapping("/addtocart")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> addToCart(@RequestParam("id") UUID id, @RequestParam("username") String username){
        Item item = itemService.getItemById(id);
        userService.addToCart(item,username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cart/{username}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> getCart(@PathVariable("username") String username){
        List<Item> cart = userService.getCart(username);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PostMapping("/cart/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> removeItemFromCart(@RequestParam("id") UUID id, String username){
        Item item = itemService.getItemById(id);
        userService.removeItemFromCart(item, username);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
