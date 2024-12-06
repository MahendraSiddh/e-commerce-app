package backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.model.Image;
import backend.response.ImageResponse;
import backend.service.ImageService;
import io.jsonwebtoken.io.IOException;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImageWithData(@RequestParam("file") MultipartFile file,
                                                      @RequestParam("title") String title,
                                                      @RequestParam("description") String description) throws Exception {
        try {

            Image image = imageService.saveImageWithMetadata(file, title, description);
            return ResponseEntity.ok("Image uploaded successfully with ID: " + image.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<ImageResponse> getImageWithMetadata(@PathVariable Long id) {
        Image image = imageService.getImageById(id);

        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        
        ImageResponse response = new ImageResponse(image);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}


