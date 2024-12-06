package backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import backend.model.Image;
import backend.repository.ImageRepository;

import java.io.IOException;

@Service
public class ImageService {

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image saveImageWithMetadata(MultipartFile file, String title, String description) throws IOException {
        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setType(file.getContentType());
        image.setData(file.getBytes());
        image.setTitle(title);
        image.setDescription(description);

        return imageRepository.save(image);
    }

    public Image getImageById(Long id) 
    {
        Image image = imageRepository.findById(id).orElse(null);
        return image;
    }
}
